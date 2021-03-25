import React from 'react';
import { Text, View } from 'react-native';

const SplashScreen = () => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
        }} >
            <Text>Loading...</Text>
        </View>
    )
}

export default SplashScreen;