import React, { useContext } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import ThemeContext from "../../../context/ThemeContext";

const styles = StyleSheet.create({
    loaderStyle: {
        alignSelf: 'center',
        marginTop: 24,
    }
});

const Loader = () => {
    const {themeColorScheme} = useContext(ThemeContext);
    return(
        <ActivityIndicator style={styles.loaderStyle} size={'large'} color={themeColorScheme.secondary}/>
    );
};

export default Loader;