import { atom } from "jotai"

export const privateMsgAtom = atom([])

export const recieverIdAtom = atom('')

export const individualChatMsgAtom = atom(
    (get) => {
        const privateMsgAtomCopy = JSON.parse(JSON.stringify(get(privateMsgAtom)))
        const filteredObj =  privateMsgAtomCopy.find((obj) => {
            return obj.pair[0]._id == get(recieverIdAtom)
        })
        return filteredObj.chat
    }
)

export const userIdAtom = atom('')

export const socketAtom = atom(undefined)
