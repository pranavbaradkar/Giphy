import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import DisplayGif from "./DisplayGif";

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between',
        paddingHorizontal: 16},
});

const Grid = ({gifData}) => {
    return(
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {gifData.map((item) =>  <DisplayGif key={item.id} item={item}/>)}
        </ScrollView>
    );
}

export default Grid;