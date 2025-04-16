import bus from '../utils/bus'

export default function useFlashMessage() {

    function setFlashMessage(mewsg, type) {

        bus.emit('flash', {
            message: mewsg,
            type: type,
        })
    }

    return { setFlashMessage }
}