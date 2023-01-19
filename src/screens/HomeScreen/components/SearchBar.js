import { useContext } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
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
        width: 200,
    }
});

const SearchBar = ({handleSearch, searchValue}) => {
    const {themeColorScheme} = useContext(ThemeContext); 
    return(
        <View>
            <TextInput 
            style={[styles.outerContainer, {borderColor: themeColorScheme.secondary, color: themeColorScheme.secondary}]} 
            placeholder='Search gif' 
            placeholderTextColor={themeColorScheme.secondary} 
            value={searchValue}
            onChangeText={handleSearch}/>
        </View>
    );
}


export default SearchBar;