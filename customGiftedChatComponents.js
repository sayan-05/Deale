import React from 'react'
import { InputToolbar, Send, Bubble, Message } from 'react-native-gifted-chat'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const customtInputToolbar = (props) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: "#f2f2f2",
        padding: 1,
        width: '98%',
        borderRadius: 25,
        borderTopWidth: 0,
        bottom: 5,
        left: 5,
      }}
      textInputStyle={{
        fontSize: 15,
        color: '#4d4d4d',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      textInputProps={{
        selectionColor: 'grey',
        underlineColorAndroid: 'transparent'
      }}
    />
  )
}

const customSendButton = (props) => {
  return (
    <TouchableOpacity>
      <Send {...props} containerStyle={{}}>
        <Icon name="send-circle" size={45} color="#999999" />
      </Send>
    </TouchableOpacity>
  )
}

const customBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: "#6666ff",
          borderRadius: 4,
          left: -42,    
        },
        right: {
          backgroundColor: 'red',
          borderRadius: 4,
          right: 1
        }
      }}
      textStyle={{
        left: {
          color: 'white',
          flexDirection : 'row'
        }
      }}
      timeTextStyle={
        {
          left: {
            color: 'white',
          },
          right: {
            color: 'white'
          }
        }
      }

    />)
}


export { customtInputToolbar, customSendButton, customBubble }
