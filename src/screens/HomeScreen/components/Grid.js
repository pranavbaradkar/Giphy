import React from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import DisplayGif from "./DisplayGif";
import Loader from "./Loader";

const styles = StyleSheet.create({
    scrollViewContainer: {
        alignItems: 'center',
        paddingHorizontal: 16},
});

const Grid = ({gifData, onReachEnd = () => {}, isLoading = false}) => {
    return(
        <FlatList 
        ListFooterComponent={isLoading ? <Loader/> : null}
        initialNumToRender={1}
        onEndReached={onReachEnd}
        contentContainerStyle={styles.scrollViewContainer}
        data={gifData}
        renderItem={({item, index}) => <DisplayGif item={item}></DisplayGif>}
        keyExtractor={(item,index) => `${item.id}${index}`}
        numColumns={3}
        />
    );
}

export default Grid;