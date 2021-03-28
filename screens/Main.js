import React, { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import PeopleScreen from './PeopleScreen'
import SplashScreen from './SplashScreen'

const Main = () => {

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);

    const [routes] = useState([
        { key: 'first', title: 'CHAT' },
        { key: 'second', title: 'PEOPLE' },
    ]);


    const renderScene = SceneMap({
        first: SplashScreen,
        second: PeopleScreen,
    });

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={(number) => {
                setIndex(number)
            }}
            initialLayout={{ width: layout.width }}
        />
    );

}

export default Main;