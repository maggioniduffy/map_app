import React, { useCallback, useEffect, useState } from 'react'
import { Image, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { MAP, COLORS } from '../../constants'
import { useSelector } from 'react-redux';

const MapPreview = ({ additionalStyles={}, buttonTitle, children, onPress }) => {
    const location = useSelector(state => state.location);
    const [mapPreviewUrl, setMapPreviewUrl] = useState();

    useEffect(()=> {
        console.log('location en preview', location);
        setUrl()
        return;
    }, [location] );

    const setUrl = useCallback(() => {
        if (location) {
        setMapPreviewUrl(
            `https://maps.googleapis.com/maps/api/staticmap?
            &center=${location.latitude},${location.longitude}
            &zoom=10
            &size=600x300
            &maptype=roadmap
            &markers=color:blue%7Clabel:S%7C${location.latitude},${location.longitude}
            &key=${MAP.API_MAP_KEY}`
            );
        };
    }, [location])

    return (
      <TouchableOpacity onPress={onPress} style={[styles.container, additionalStyles]}>
          {mapPreviewUrl ? (
              <Image style={styles.image} source={{uri: mapPreviewUrl}} />
          ) : (children )
          }
      </TouchableOpacity>  
    );
}



const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        borderRadius: 10,
        justifyContent: "center",
        margin: 5,
    },
    image:{
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    text: {
        color: COLORS.WHITE,
        fontSize: 20,
        textAlign: "center",
        padding: 10,
    },
})
export default MapPreview
 