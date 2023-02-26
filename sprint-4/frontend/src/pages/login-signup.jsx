import axios from 'axios'
import { useState, useEffect } from 'react'
import { ImgUploader } from '../cmps/login/img-uploader'
import { LoginPageHeader } from '../cmps/login/login-page-header'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadUsers, login, signup } from '../store/user.actions'
import { loadBoards } from '../store/board.actions'
import { useGoogleLogin } from '@react-oauth/google'

export function LoginSignup() {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [googleUser, setGoogleUser] = useState(null)
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
        onGoogleLogin()
    }, [googleUser])

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    function onSubmit(ev, isSignup) {
        ev.preventDefault()
        if (!credentials.username || !credentials.password) return
        if(isSignup) {
            if(!credentials.fullname) return 
            signup(credentials)
        } else login(credentials)
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
        const user = users.find(currUser => currUser.fullname === credentials.name && currUser.username === credentials.email)
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
        // TODO: Change header to the original header(option)
        // TODO: Change label to p
        // TODO: fix image uplouder 
        <div className="login-signup">
            <LoginPageHeader />
            <form className="form-container layout" onSubmit={(ev) => onSubmit(ev, isSignup)}>
                <h1>{isSignup ? 'Create your MyDay account here ' : 'Log in to your account'}</h1>
                {isSignup && <ImgUploader onUploaded={onUploaded} />}
                {!isSignup && <p className="login-explain">Enter your username and password</p>}
                {isSignup && <p className="login-explain">Enter your full name, username and password</p>}
                {isSignup && 
                <input
                    type="text"
                    name="fullname"
                    value={credentials.fullname}
                    placeholder="Full name"
                    onChange={handleChange}
                    required
                    autoFocus
                />}
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                    autoFocus
                />
                {
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                }
                <button className="btn-next">{isSignup ? 'Sign up' : 'Log in'}</button>
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
            </form>
        </div>
    )
}
