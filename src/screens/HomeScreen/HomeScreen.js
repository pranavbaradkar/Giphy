import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';
import { getSearchGifs, getTrendingGifs } from '../../api/api';
import { themecolor, themeFont } from '../../constant';
import ThemeContext from '../../context/ThemeContext';
import { useThemeContext } from '../../useThemeContext';
import SearchBar from './components/SearchBar';
import { API_KEY } from './../../constant';
import Grid from './components/Grid';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 16,
        width: '100%',
        flexDirection: 'column',
        marginTop: 36,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    heading: {
        fontSize: themeFont.font18,
        color: themecolor.black,
        textAlign: 'center',
        marginTop: 24,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    toggleButton: {
        marginTop: 24,
        marginRight: 16,
        flexDirection: 'row',
    }
});

const HomeScreen = () => {
    const {themeColorScheme, isDark,handleTheme} = useThemeContext();

    const [trendingData, setTrendingData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [filterData, setFilterData] = useState([]);
    const [loadCount, setLoadCount] = useState(0);
    const [filterLoadCount, setFilterLoadCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const gif_render_limit = 10;

    const fetchTrendingGifs = () => {
        setIsLoading(true);
        getTrendingGifs({
            api_key: API_KEY,
            limit: gif_render_limit,
            offset: loadCount * gif_render_limit,
        })
        .then(
            (res) => {
                const data  = res.data.data;
                const newUpdatedData = [...trendingData,...data];

                setTrendingData(newUpdatedData);
        })
        .finally(() => {
            setIsLoading(false);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    const fetchSearchGifs = (isLoadCountChange = false) => {
        setIsLoading(true);
        getSearchGifs({
            api_key: API_KEY,
            q: searchValue,
            limit: gif_render_limit,
            offset: gif_render_limit * filterLoadCount,
        })
        .then((res) => {
            const data = res.data.data;
            const newUpdatedData = isLoadCountChange ? [...filterData,...data] : data;

            setFilterData(newUpdatedData);

            //to check calling API due to count change
            console.log(filterLoadCount);

            //to check if we are calling api repeatedly or not
            console.log('=====>');
        })
        .finally(() => {
            setIsLoading(false);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    const handleSearch = (query) => {
        setSearchValue(query);
    }

    const handleOnReachEndTrending = () => {
        setLoadCount((count) => count + 1);
    }

    const handleOnReachEndFilter = () => {
        setFilterLoadCount((count) => count + 1);
    }

    const showTrendingData = searchValue.length === 0;

    useEffect(() => {
        fetchTrendingGifs();
    }, [loadCount]);

    useEffect(() => {
        fetchSearchGifs(true)
    }, [filterLoadCount]);

    useEffect(() => {
        //debouncing
        const totalTimeOut = setTimeout(() => {
            fetchSearchGifs();
            // to make load count of infinite scroll to zero for every new search
            setFilterLoadCount(0);
        }, 1000);

        return () => clearTimeout(totalTimeOut);
    }, [searchValue]);

    return(
        <ThemeContext.Provider value={{themeColorScheme, isDark, handleTheme}}>
        <SafeAreaView style={[styles.mainContainer, {backgroundColor: themeColorScheme.primary}]}>
            <Text style={[styles.heading, {color: themeColorScheme.secondary}]}>Giphy store</Text>
            <View style={styles.navBar}>
            <SearchBar handleSearch={handleSearch} searchValue={searchValue} />
            <View style={styles.toggleButton}>
            <Text style={{color: themeColorScheme.secondary, marginRight: 8}}>Toggle{'\n'}Theme</Text>
            <Switch value={isDark} onValueChange={handleTheme}/>
            </View>
            </View>
            <Text style={[styles.heading, {color: themeColorScheme.secondary}]}>
                {showTrendingData ? 'Trending Gifs' : 'Searched Gifs'}
            </Text>
            {showTrendingData ? <Grid gifData={trendingData} onReachEnd={handleOnReachEndTrending} isLoading={isLoading}/> : <Grid gifData={filterData} onReachEnd={handleOnReachEndFilter} isLoading={isLoading}/>}
        </SafeAreaView>
        </ThemeContext.Provider>
    );
}


export default HomeScreen;