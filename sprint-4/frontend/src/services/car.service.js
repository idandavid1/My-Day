
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'car'

export const carService = {
    query,
    getById,
    save,
    remove,
    getEmptyCar,
    addCarMsg
}
window.cs = carService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)
}

function getById(carId) {
    // return storageService.get(STORAGE_KEY, carId)
    return httpService.get(`car/${carId}`)
}

async function remove(carId) {
    // await storageService.remove(STORAGE_KEY, carId)
    return httpService.delete(`car/${carId}`)
}
async function save(car) {
    var savedCar
    if (car._id) {
        // savedCar = await storageService.put(STORAGE_KEY, car)
        savedCar = await httpService.put(`car/${car._id}`, car)

    } else {
        // Later, owner is set by the backend
        car.owner = userService.getLoggedinUser()
        // savedCar = await storageService.post(STORAGE_KEY, car)
        savedCar = await httpService.post('car', car)
    }
    return savedCar
}

async function addCarMsg(carId, txt) {
    const savedMsg = await httpService.post(`car/${carId}/msg`, {txt})
    return savedMsg
}


function getEmptyCar() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}





