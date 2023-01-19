import { Image, SafeAreaView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { themecolor, themeFont } from '../../constant';
import ThemeContext from '../../context/ThemeContext';
import { useThemeContext } from '../../useThemeContext';
import SearchBar from './components/SearchBar';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 16,
        width: '100%',
        flexDirection: 'column',
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

    return(
        <ThemeContext.Provider value={{themeColorScheme, isDark, handleTheme}}>
        <SafeAreaView style={[styles.mainContainer, {backgroundColor: themeColorScheme.primary}]}>
            <Text style={[styles.heading, {color: themeColorScheme.secondary}]}>Giphy store</Text>
            <View style={styles.navBar}>
            <SearchBar />
            <View style={styles.toggleButton}>
            <Text style={{color: themeColorScheme.secondary, marginRight: 8}}>Toggle{'\n'}Theme</Text>
            <Switch value={isDark} onValueChange={handleTheme}/>
            </View>
            </View>
        </SafeAreaView>
        </ThemeContext.Provider>
    );
}


export default HomeScreen;