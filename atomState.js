import { atom } from "jotai"

export const privateMsgAtom = atom([])

export const recieverIdAtom = atom('')

export const singleChatMsgAtom = atom(
    (get) => {
        const privateMsgAtomCopy = JSON.parse(JSON.stringify(get(privateMsgAtom)))
        const filteredObj =  privateMsgAtomCopy.find((obj) => {
            return obj.pair[0]._id == get(recieverIdAtom)
        })
        return filteredObj.chat
    }
)
