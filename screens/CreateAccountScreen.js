import React from 'react';
import { View, TextInput, Text, TouchableOpacity, Image  } from 'react-native';


let CreateAccountScreen = () => {
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
                top: '40%',
                height: 400,
                width: '95%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                alignContent: 'space-around'
            }} >
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
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    height: 50,
                    width: '100%',
                    flexWrap: 'wrap'
                }} >
                    <Text style={{
                        width: '100%',
                        height: 30,
                        textAlign: 'center',
                        fontSize: 15,
                        fontWeight: 'bold'
                    }} >OR CREATE ACCOUNT WITH</Text>
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly'
                    }} >
                        <TouchableOpacity activeOpacity={0.5} >
                            <Image source={
                                { uri: 'https://cdn3.iconfinder.com/data/icons/popular-services-brands/512/facebook-512.png' }}
                                style={{
                                    width: 60,
                                    height: 60,
                                }} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} >
                            <Image source={
                                { uri: 'https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA' }}
                                style={{
                                    width: 60,
                                    height: 60,
                                }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CreateAccountScreen;
