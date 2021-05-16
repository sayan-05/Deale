import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native'
import { privateMsgAtom } from "../atomState"
import { individualChatMsgAtom } from "../atomState"
import {socketAtom} from '../atomState'
import { useAtom } from "jotai"
import {userIdAtom} from '../atomState'
import {recieverIdAtom} from "../atomState.js"

const PrivateConversationScreen = () => {


    let [,setPrivateMessages] = useAtom(privateMsgAtom)

    const [socket] = useAtom(socketAtom)

    const [userId] = useAtom(userIdAtom)

    const [chats] = useAtom(individualChatMsgAtom)

    const [recieverId] = useAtom(recieverIdAtom)

    const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
        s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

    const onSend = (message) => {
        message[0]._id = ObjectId()
        setPrivateMessages(prevState => {
            const privateMessagesCopy = JSON.parse(JSON.stringify(prevState))
            privateMessagesCopy.forEach((i) => {
                if (i.pair[0]._id == recieverId) {
                    i.chat.unshift(message[0])
                }
            })
            return privateMessagesCopy
        }
        )
        socket.emit("send-private-message", {
            chatObj: message[0],
            recieverId: recieverId
        })
    }



    return (<GiftedChat
        messages={chats}
        onSend={
            message => onSend(message)
        }
        user={{
            _id: userId,
        }}
    />)
}

export default PrivateConversationScreen