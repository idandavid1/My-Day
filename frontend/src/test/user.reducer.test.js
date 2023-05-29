import {userReducer}  from '../store/user.reducer.js';

describe('userReducer', () => {

    const mockUser = {fullname: "tal", imgUrl: "https://res.cloudinary.com/dcwibf9o5/image/upload/v1676463194/byy5vnabu2wfjdcnyaeq.jpg", _id: "63eccc56d710bb63bcad0813"}
    const initialState = {
        user: null
    }

    it('creates initial state', async () => {
        const state = userReducer(initialState)
        expect(state).toBe(initialState)
    })

    it('should set a user in the state', async () => {
        let state = userReducer(initialState)
        expect(state.user).toBeFalsy()

        state = userReducer(initialState, {type: 'SET_USER', user: mockUser})
        expect(state.user).toBeTruthy()
        // expect(state.error).toBeFalsy()
    })
})