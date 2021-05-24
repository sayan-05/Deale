import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {socketAtom} from '../atomState'
import {individualGroupMsgAtom} from '../atomState'
import {groupMsgAtom} from '../atomState'
import {userIdAtom} from '../atomState'
import { useAtom } from "jotai"


const GroupConversationScreen = () => {
    const [groupMsg,setGroupMsg] = useAtom(individualGroupMsgAtom)
    const [,updateMsg] = useAtom(groupMsgAtom)  
    const [userId] = useAtom(userIdAtom)
    
    return (<GiftedChat
        messages={groupMsg.chat}
        onSend={
            message => onSend(message)
        }
        user={{
            _id: userId,
        }}
    />)
}

export default GroupConversationScreen