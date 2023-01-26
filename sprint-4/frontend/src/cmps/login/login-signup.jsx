import { useState, useEffect } from 'react'
import { userService } from '../../services/user.service'
import { ImgUploader } from './img-uploader'
import { LoginPageHeader } from './login-page-header'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { login, signup } from '../../store/user.actions'
import { loadBoards } from '../../store/board.actions'
import { useGoogleLogin } from '@react-oauth/google'


export function LoginSignup() {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [isSignup, setIsSignup] = useState(false)
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const boards = useSelector(storeState => storeState.boardModule.boards)

    useEffect(() => {
        loadUsers()
        if (!boards.length) loadBoards()
    }, [])

    async function loadUsers() {
        const users = await userService.getUsers()
        setUsers(users)
    }

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

    const googleLogin = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
        flow: 'auth-code'
      })

    return (
        <div className="login-signup">
            <LoginPageHeader />
            <div className="form-container">
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
                <button className="btn-login-google" onClick={() => googleLogin()} redirect_uri="http://localhost:3000/board/63d075e98056b4b446310f22">
                    <img className="img-google-login" src="https://cdn.monday.com/images/logo_google_v2.svg" aria-hidden="true" alt="" />
                    <span>Google</span>
                </button>
                <div className="suggest-signup">
                    <span className="suggest-signup-prefix">{isSignup ? 'Already have an account?' : 'Don\'t have an account yet?'}</span>
                    <Link to={'/auth/signup'}><button className="btn-signup" onClick={toggleSignup}>{!isSignup ? 'Sign up' : 'Log in'}</button></Link>
                </div>
            </div>
        </div>
    )
}
