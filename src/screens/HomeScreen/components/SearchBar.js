import { useContext } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { themecolor } from '../../../constant';
import ThemeContext from '../../../context/ThemeContext';

const styles = StyleSheet.create({
    outerContainer: {
        borderColor: themecolor.black,
        borderWidth: 1,
        borderRadius: 8,
        height: 32,
        justifyContent: 'flex-start',
        marginLeft: 16,
        paddingHorizontal: 16,
        marginTop: 24,
        width: '170%',
    }
});

const SearchBar = () => {
    const {themeColorScheme} = useContext(ThemeContext); 
    return(
        <View>
            <TextInput style={[styles.outerContainer, {borderColor: themeColorScheme.secondary}]} placeholder='Search gif' placeholderTextColor={themeColorScheme.secondary} value='' onChangeText={(k) => {
                console.log(k);
            } }></TextInput>
        </View>
    );
}


export default SearchBar;