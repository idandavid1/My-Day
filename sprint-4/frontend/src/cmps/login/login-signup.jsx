import { useState, useEffect } from 'react'
import { userService } from '../../services/user.service'
import { ImgUploader } from './img-uploader'
import { LoginPageHeader } from './login-page-header'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadUsers, login, signup } from '../../store/user.actions'
import { loadBoards } from '../../store/board.actions'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useEffectUpdate } from '../../customHooks/useEffectUpdate'


export function LoginSignup() {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [googleUser, setGoogleUser] = useState([])
    const [isSignup, setIsSignup] = useState(false)
    const navigate = useNavigate()
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const users = useSelector(storeState => storeState.userModule.users)

    const googleLogin = useGoogleLogin({
        onSuccess: codeResponse => {
            setGoogleUser(codeResponse)
        },
        onError: errorResponse => console.log(errorResponse)
    })

    useEffect(() => {
        if (!users.length) loadUsers()
        if (!boards.length) loadBoards()
    })

    useEffectUpdate(() => {
        onGoogleLogin()
    }, [googleUser])

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
        setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    function onLogin(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        login(credentials)
        clearState()
        navigate(`/board/${boards[0]._id}`)
    }

    function onSignup(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullname) return
        signup(credentials)
        clearState()
        navigate(`/board/${boards[0]._id}`)
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    async function onGoogleLogin() {
        try {
            if (googleUser) {
                const user = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${googleUser.access_token}`,
                        Accept: 'application/json'
                    }
                })
                checkGoogleCredentials(user.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    function checkGoogleCredentials(credentials) {
        const user = users.find(currUser => {
            return currUser.password === credentials.id && currUser.username === credentials.email
        })
        if (user) login(user)
        else {
            signup({
                username: credentials.email,
                password: credentials.id,
                fullname: credentials.name,
                imgUrl: credentials.picture
            })
        }
        navigate(`/board/${boards[0]._id}`)
    }


    return (
        //TODO: Change to form
        // TODO: Change header to the original header(option)
        // TODO: Change label to p
        // TODO: fix image uplouder 
        <div className="login-signup ">
            <LoginPageHeader />
            <div className="form-container layout">
                <h1>{isSignup ? 'Create your MyDay account here ' : 'Log in to your account'}</h1>
                {isSignup && <ImgUploader onUploaded={onUploaded} />}
                {!isSignup && <label className="label-username" htmlFor="username">Enter your username and password</label>}
                {isSignup && <label className="label-username" htmlFor="username">Enter your full name, username and password</label>}
                {isSignup && <input className="input input-fullname"
                    type="text"
                    name="fullname"
                    value={credentials.fullname}
                    placeholder="Full name"
                    onChange={handleChange}
                    required
                    autoFocus
                />}
                <input className="input input-username"
                    type="text"
                    name="username"
                    value={credentials.username}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                    autoFocus
                />
                {
                    <input className="input input-password"
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                }
                <button className="btn-next" onClick={isSignup ? onSignup : onLogin}>{isSignup ? 'Sign up' : 'Log in'}</button>
                <div className="flex justify-center align-center split-line">
                    <span className="separator-line"></span>
                    <p>{isSignup ? 'Or sign up with' : 'Or sign in with'}</p>
                    <span className="separator-line"></span>
                </div>
                <button className="btn-login-google" onClick={() => googleLogin()}>
                    <img className="img-google-login" src="https://cdn.monday.com/images/logo_google_v2.svg" aria-hidden="true" alt="" />
                    <span>Google</span>
                </button>
                <div className="suggest-signup">
                    <span className="suggest-signup-prefix">{isSignup ? 'Already have an account?' : 'Don\'t have an account yet?'}</span>
                    {!isSignup && <Link to={'/auth/signup'}><button className="btn-signup" onClick={toggleSignup}>Sign up</button></Link>}
                    {isSignup && <Link to={'/auth/login'}><button className="btn-signup" onClick={toggleSignup}>Log in</button></Link>}
                </div>
            </div>
        </div>
    )
}
