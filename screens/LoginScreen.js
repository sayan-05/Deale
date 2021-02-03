import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';


export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={
        {
          uri: "https://i.ibb.co/4JK4T3P/deale-logo.jpg",
        }} />
      <StatusBar style="auto" />
      <View style={styles.inputContainer} >
        <TextInput style={{
          backgroundColor: 'rgb(232,232,232)',
          width: '90%',
          height: 45,
          textAlign: 'center',
          borderRadius: 5
        }}
          placeholder="Email or Mobile Number" />
        <TextInput style={{
          backgroundColor: 'rgb(232,232,232)',
          width: '90%',
          height: 45,
          textAlign: 'center',
          borderRadius: 5,
          top: 20
        }}
          placeholder="Password" />
        <TouchableOpacity
          style={{
            width: '90%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(255, 77, 77)',
            elevation: 5,
            borderRadius: 10,
            top: 60
          }}
          activeOpacity={0.8}>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              fontWeight: 'bold',
            }} >
            LOG IN
            </Text>
        </TouchableOpacity>
        <Text
          onPress={() => console.log('g')}
          style={{
            position: 'relative',
            top: '60%',
            fontWeight: 'bold',
          }} >
          OR LOGIN WITH SOCIAL MEDIA ACCOUNT?
          </Text>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          bottom: 30,
          justifyContent: 'space-evenly',
          top: 150,
          width: 300
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
      </View >
      <View style={styles.loginButtonView} >
        <TouchableOpacity
          onPress={
            () => navigation.navigate('Create')
          }
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(145, 157, 230)',
            top: 10,
            elevation: 5,
            borderRadius: 5
          }}
          activeOpacity={0.8}>
          <Text
            style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }} >
            CREATE ACCOUNT
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            top: '40%'
          }}
          activeOpacity={0.1}>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              top: 5
            }} >
            FORGOT PASSWORD
            </Text>
        </TouchableOpacity>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  logo: {
    position: 'absolute',
    height: 130,
    width: 250,
    resizeMode: "contain",
    top: 40
  },
  loginInput: {
    position: 'relative',
    height: 50,
    borderColor: 'black',
    backgroundColor: 'rgb(240, 240, 242)',
    borderRadius: 10,
    width: 280,
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
  },
  inputContainer: {
    position: 'absolute',
    top: 220,
    alignItems: 'center',
    width: '100%'
  },
  passwordInput: {
    position: 'relative',
    height: 50,
    borderColor: 'black',
    backgroundColor: 'rgb(240, 240, 242)',
    borderRadius: 10,
    width: 280,
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    top: 10
  },
  loginButtonView: {
    position: 'absolute',
    height: 46,
    width: '90%',
    top: 650
  }
});
