import { Video } from "expo-av";
import React, { useRef } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
    tileStyle: {
        alignSelf: 'center', 
        marginTop: 4,
    }
});


const DisplayGif = ({item}) => {
    const mp4_url = item.images.original.mp4;
    const height = item.images.original.height;
    const width = item.images.original.width;

    const videoRef = useRef(null);

    const handlePause = () => {
        videoRef.current.pauseAsync();
    }

    const handlePlay = () => {
        videoRef.current.playAsync();
    }
    return(
        <TouchableOpacity style={{alignSelf: 'center'}} onPressIn={handlePause} onPressOut={handlePlay}>
        <Video
        ref = {videoRef}
        style={[styles.tileStyle ,{width: +width / 5 ,height: +height / 5}]}
        source={{
          uri: mp4_url,
        }}
        shouldPlay
        resizeMode= "stretch"
        isLooping/>
        </TouchableOpacity>
);}

export default DisplayGif;