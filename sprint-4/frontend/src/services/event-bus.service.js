export const SHOW_MODAL = 'show-modal'

function createEventEmitter() {
    const listenersMap = {}
    return {
        on(evName, listener){
            listenersMap[evName] = (listenersMap[evName])? [...listenersMap[evName], listener] : [listener]
            return ()=>{
                listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
            }
        },
        emit(evName, data) {
            if (!listenersMap[evName]) return
            listenersMap[evName].forEach(listener => listener(data))
        }
    }
}

export const eventBus = createEventEmitter()

export function showModalDetails(msg) {
    eventBus.emit(SHOW_MODAL, msg)
}

export function showModal(txt) {
    console.log(txt)
    showModalDetails({txt, type: 'success'})
}
export function closeModal() {
    // showUserMsg({})
}

window.showModalDetails = showModalDetails

