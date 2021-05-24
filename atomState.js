import { atom } from "jotai"

export const privateMsgAtom = atom([])

export const recieverIdAtom = atom('')

export const individualPrivateMsgAtom = atom(
    (get) => {
        const privateMsgAtomCopy = JSON.parse(JSON.stringify(get(privateMsgAtom)))
        const filteredObj =  privateMsgAtomCopy.find((obj) => {
            return obj.pair[0]._id == get(recieverIdAtom)
        })
        return filteredObj.chat
    }
)

export const groupMsgAtom = atom([]) 

export const groupIdAtom = atom('')

export const individualGroupMsgAtom = atom(
    (get) => {
        const groupMsgAtomCopy = JSON.parse(JSON.stringify(get(groupMsgAtom)))
        const filteredObj = groupMsgAtomCopy.find((obj) => {
            return obj._id == get(groupIdAtom)
        })
        return filteredObj
    }
)

export const userIdAtom = atom('')

export const socketAtom = atom(undefined)
