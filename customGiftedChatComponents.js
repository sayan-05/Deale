import React from 'react'
import { InputToolbar, Send, Bubble, Message } from 'react-native-gifted-chat'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const customtInputToolbar = (props) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: "white",
        width: '98%',
        borderRadius: 25,
        borderWidth: 1,
        bottom: 5,
        left: 5,
        borderColor : 'grey',
        borderTopWidth : 1,
        borderTopColor : 'grey'
      }}
      textInputStyle={{
        fontSize: 15,
        color: 'rgb(29, 53, 87)',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      textInputProps={{
        selectionColor: 'rgb(29, 53, 87)',
        underlineColorAndroid: 'transparent'
      }}
    />
  )
}

const customSendButton = (props) => {
  return (
    <TouchableOpacity>
      <Send {...props} containerStyle={{}}>
        <Icon name="send-circle" size={45} color='rgb(29, 53, 87)' />
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
          backgroundColor: "rgb(69, 123, 157)",
          borderRadius: 13,
          left: -42,
          borderTopLeftRadius : 1    
        },
        right: {
          backgroundColor: 'rgb(29, 53, 87)',
          borderRadius: 13,
          right: 1,
          borderBottomRightRadius : 1
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
