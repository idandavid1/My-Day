import { carService } from "../services/car.service.local.js";
import { userService } from "../services/user.service.js";
import { store } from '../store/store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_CAR, ADD_TO_CART, CLEAR_CART, REMOVE_CAR, REMOVE_FROM_CART, SET_CARS, UNDO_REMOVE_CAR, UPDATE_CAR } from "./car.reducer.js";
import { SET_SCORE } from "./user.reducer.js";

// Action Creators:
export function getActionRemoveCar(carId) {
    return {
        type: REMOVE_CAR,
        carId
    }
}
export function getActionAddCar(car) {
    return {
        type: ADD_CAR,
        car
    }
}
export function getActionUpdateCar(car) {
    return {
        type: UPDATE_CAR,
        car
    }
}

export async function loadCars() {
    try {
        const cars = await carService.query()
        console.log('Cars from DB:', cars)
        store.dispatch({
            type: SET_CARS,
            cars
        })

    } catch (err) {
        console.log('Cannot load cars', err)
        throw err
    }

}

export async function removeCar(carId) {
    try {
        await carService.remove(carId)
        store.dispatch(getActionRemoveCar(carId))
    } catch (err) {
        console.log('Cannot remove car', err)
        throw err
    }
}

export async function addCar(car) {
    try {
        const savedCar = await carService.save(car)
        console.log('Added Car', savedCar)
        store.dispatch(getActionAddCar(savedCar))
        return savedCar
    } catch (err) {
        console.log('Cannot add car', err)
        throw err
    }
}

export function updateCar(car) {
    return carService.save(car)
        .then(savedCar => {
            console.log('Updated Car:', savedCar)
            store.dispatch(getActionUpdateCar(savedCar))
            return savedCar
        })
        .catch(err => {
            console.log('Cannot save car', err)
            throw err
        })
}

export function addToCart(car) {
    store.dispatch({
        type: ADD_TO_CART,
        car
    })
}

export function removeFromCart(carId) {
    store.dispatch({
        type: REMOVE_FROM_CART,
        carId
    })
}

export async function checkout(total) {
    try {
        const score = await userService.changeScore(-total)
        store.dispatch({ type: SET_SCORE, score })
        store.dispatch({ type: CLEAR_CART })
        return score
    } catch (err) {
        console.log('CarActions: err in checkout', err)
        throw err
    }
}


// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveCarOptimistic(carId) {
    store.dispatch({
        type: REMOVE_CAR,
        carId
    })
    showSuccessMsg('Car removed')

    carService.remove(carId)
        .then(() => {
            console.log('Server Reported - Deleted Succesfully');
        })
        .catch(err => {
            showErrorMsg('Cannot remove car')
            console.log('Cannot load cars', err)
            store.dispatch({
                type: UNDO_REMOVE_CAR,
            })
        })
}
