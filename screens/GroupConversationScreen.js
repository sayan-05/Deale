import React, { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { socketAtom } from '../atomState'
import { individualGroupMsgAtom } from '../atomState'
import { groupMsgAtom } from '../atomState'
import { groupIdAtom } from '../atomState'
import { userIdAtom } from '../atomState'
import { useAtom } from "jotai"
import { customtInputToolbar, customSendButton, customBubble } from '../customGiftedChatComponents'

const GroupConversationScreen = () => {
    const [groupMsg] = useAtom(individualGroupMsgAtom)
    const [, updateMsg] = useAtom(groupMsgAtom)
    const [userId] = useAtom(userIdAtom)
    const [groupId] = useAtom(groupIdAtom)
    const [socket] = useAtom(socketAtom)

    const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
        s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

    const onSend = (message) => {
        message[0]._id = ObjectId()
        message[0].system = false
        updateMsg(prevState => {
            const groupMessagesCopy = JSON.parse(JSON.stringify(prevState))
            groupMessagesCopy.forEach((i) => {
                if (i._id == groupId) {
                    i.chat.unshift(message[0])
                }
            })
            return groupMessagesCopy
        }
        )
        socket.emit("send-group-message", {
            chatObj: message[0],
            groupId: groupId
        })
    }


    return (
        <View style={{
            backgroundColor: "white",
            flex: 1
        }}>
            <GiftedChat
                renderLoading={() => <ActivityIndicator size="large" color="red" />}
                renderInputToolbar={(props) => customtInputToolbar(props)}
                renderSend={(props) => customSendButton(props)}
                renderBubble={(props) => customBubble(props)}
                messages={groupMsg.chat}
                onSend={
                    message => onSend(message)
                }
                user={{
                    _id: userId,
                }}
            />
        </View>)
}

export default GroupConversationScreen