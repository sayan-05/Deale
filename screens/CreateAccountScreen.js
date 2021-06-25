import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, } from 'react-native';
import { Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'
import * as ImagePicker from 'expo-image-picker'

let CreateAccountScreen = () => {

    const [pfp, setPfp] = useState(null)

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [2, 2],
            quality: 1,
            base64: 'true'
        })
        setPfp(result.uri)
    }

    return (
        <View
            style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'white',
            }}
        >
            <Text
                style={{
                    justifyContent: 'center',
                    textAlign: 'left',
                    fontSize: 40,
                    top: 50,
                    left: '5%',
                    color: 'red',
                    fontWeight: 'bold'
                }}>
                Sign Up
            </Text>
            <View style={{
                backgroundColor: 'white',
                alignSelf: 'center',
                top: '20%',
                height: 450,
                width: '95%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                alignContent: 'space-around'
            }} >
                <View style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {
                        pfp !== null ? <Avatar
                            rounded
                            icon={{ name: 'user', type: 'font-awesome' }}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                            size={70}
                            containerStyle={{
                                backgroundColor: 'grey'
                            }}
                            source={{
                                uri: pfp
                            }} /> :
                            <Avatar
                                rounded
                                icon={{ name: 'user', type: 'font-awesome' }}
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.7}
                                size={70}
                                containerStyle={{
                                    backgroundColor: 'grey'
                                }}
                            />
                    }

                    <TouchableOpacity style={{
                        backgroundColor: 'rgb(50,205,50)',
                        position: 'absolute',
                        left: 205,
                        top: 55,
                        width: 35,
                        height: 35,
                        borderRadius: 25
                    }}
                        activeOpacity={0.7}
                        onPress={pickImage} >
                        <Icon name='camera' size={28} style={{
                            color: 'white',
                            left: 3.5,
                            top: 2
                        }}
                        />
                    </TouchableOpacity>
                </View>
                <TextInput style={{
                    position: 'relative',
                    backgroundColor: 'rgb(232,232,232)',
                    width: '49%',
                    height: 50,
                    borderRadius: 7,
                    borderWidth: 2,
                    borderColor: 'white',
                    textAlign: 'center',
                    fontSize: 20
                }}
                    placeholder='First Name' />
                <TextInput style={{
                    position: 'relative',
                    backgroundColor: 'rgb(232,232,232)',
                    width: '49%',
                    height: 50,
                    borderRadius: 7,
                    borderWidth: 2,
                    borderColor: 'white',
                    textAlign: 'center',
                    fontSize: 20
                }}
                    placeholder='Last Name' />
                <TextInput style={{
                    position: 'relative',
                    backgroundColor: 'rgb(232,232,232)',
                    width: '100%',
                    height: 50,
                    borderRadius: 7,
                    borderWidth: 2,
                    borderColor: 'white',
                    textAlign: 'center',
                    fontSize: 20,
                }}
                    placeholder='Mobile Number or Email Address' />
                <TextInput style={{
                    position: 'relative',
                    backgroundColor: 'rgb(232,232,232)',
                    width: '100%',
                    height: 50,
                    borderRadius: 7,
                    borderWidth: 2,
                    borderColor: 'white',
                    textAlign: 'center',
                    fontSize: 20,
                }}
                    placeholder='New Password' />
                <TouchableOpacity
                    style={{
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgb(50,205,50)',
                        elevation: 5,
                        borderRadius: 10,
                    }}
                    activeOpacity={0.8}>
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 15,
                            fontWeight: 'bold',
                        }} >
                        SIGN UP
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default CreateAccountScreen;
