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

    useEffect(() => {
        getTrendingGifs({
            api_key: API_KEY,
            limit: 25
        })
        .then(
            (res) => {
                const data  = res.data;
                setTrendingData(data.data);
        }) 
        .catch((e) => {
            console.log(e);
        });
    }, []);

    const fetchSearchGifs = (query) => {
        getSearchGifs({
            api_key: API_KEY,
            q: query,
            limit: 10,
        })
        .then((res) => {
            const data = res.data;
            setFilterData(data.data);
            //to check if we are calling api repeatedly or not
            console.log('=====>');
        })
        .catch((e) => {
            console.log(e);
        });
    }

    useEffect(() => {
        const totalTimeOut = setTimeout(() => {
            fetchSearchGifs(searchValue);
        }, 1000);

        return () => clearTimeout(totalTimeOut);
    }, [searchValue]);

    const handleSearch = (query) => {
        setSearchValue(query);
    }

    const showTrendingData = searchValue.length === 0;

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
            {showTrendingData ? <Grid gifData={trendingData}/> : <Grid gifData={filterData}/>}
        </SafeAreaView>
        </ThemeContext.Provider>
    );
}


export default HomeScreen;