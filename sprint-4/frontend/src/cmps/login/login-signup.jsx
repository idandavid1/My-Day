import { useState, useEffect } from 'react'
import { userService } from '../../services/user.service'
// import { ImgUploader } from '../img-uploader'
import { LoginPageHeader } from '../login-page-header'

export function LoginSignup(props) {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [isSignup, setIsSignup] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
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
        props.onLogin(credentials)
        clearState()
    }

    function onSignup(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullname) return
        props.onSignup(credentials)
        clearState()
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    return (
        <div className="login-signup">
            <LoginPageHeader />
            <div className="form-container">
                <h1>Log in to your account</h1>
                <label className="label-username" htmlFor="username">Enter your username</label>
                <input className="input input-username"
                    name="username"
                    type="text"
                    value={credentials.username}
                    placeholder="username"
                    onChange={handleChange}
                />
                <button className="btn-next">Next</button>
                <div className="flex justify-center align-center split-line">
                    <span className="separator-line"></span>
                    <p>Or sign in with</p>
                    <span className="separator-line"></span>
                </div>
                <div className="suggest-signup">
                    <span className="suggest-signup-prefix">Don't have an account yet?</span>
                    <a to='/auth/signup'>Sign up</a>
                </div>
            </div>















            {/* <p>
                    <button className="btn-link" onClick={toggleSignup}>{!isSignup ? 'Signup' : 'Login'}</button>
                </p> */}
            {/* {!isSignup && <form className="login-form" onSubmit={onLogin}>
                    <select
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                    > */}
            {/* <option value="">Select User</option> */}
            {/* {users.map(user => <option key={user._id} value={user.username}>{user.fullname}</option>)}
                    </select> */}
            {/* <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        autoFocus
                        />
                        <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    /> */}
            {/* <button className='login-btn'>Next</button>
                </form>}
                <div className="signup-section">
                    {isSignup && <form className="signup-form" onSubmit={onSignup}>
                        <input
                            type="text"
                            name="fullname"
                            value={credentials.fullname}
                            placeholder="Fullname"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            placeholder="Username"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                        <ImgUploader onUploaded={onUploaded} />
                        <button >Signup!</button>
                    </form>} */}
            {/* </div> */}
        </div>
    )
}