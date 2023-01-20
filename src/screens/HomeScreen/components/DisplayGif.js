import { Video } from "expo-av";
import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Loader from "./Loader";

const styles = StyleSheet.create({
    tileStyle: {
        alignSelf: 'center', 
        margin: 2,
    }
});


const DisplayGif = ({item}) => {
    const mp4_url = item.images.original.mp4;
    const height = 150;
    const width = item.images.original.width;

    const [isVideoLoaded, setIsVideoLoaded] = useState(true);

    const videoRef = useRef(null);

    const handlePause = () => {
        videoRef.current.pauseAsync();
    }

    const handlePlay = () => {
        videoRef.current.playAsync();
    }

    const handleOnLoad = () => {
        setIsVideoLoaded((prevState) => !prevState);
    }
    return(
        <TouchableOpacity style={{alignSelf: 'center'}} onPressIn={handlePause} onPressOut={handlePlay}>
        {isVideoLoaded && <Loader/>}
        <Video
        ref = {videoRef}
        style={[styles.tileStyle ,{width: +width / 4 ,height: height}]}
        source={{
          uri: mp4_url,
        }}
        shouldPlay
        resizeMode= "stretch"
        onLoad={handleOnLoad}
        isLooping/>
        </TouchableOpacity>
);}

export default DisplayGif;