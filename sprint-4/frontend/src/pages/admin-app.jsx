import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import { loadUsers, removeUser } from '../store/user.actions'

export function AdminApp() {
    const users = useSelector(storeState => storeState.userModule.users)
    const isLoading = useSelector(storeState => storeState.userModule.isLoading)

    useEffect(() => {
        loadUsers()
    }, [])

    return <section className="admin">
        {isLoading && 'Loading...'}
        {users && <ul>

            {users.map(user => (
                <li key={user._id}>
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                    <button
                        onClick={() => {
                            removeUser(user._id)
                        }}
                    >
                        Remove {user.username}
                    </button>
                </li>
            ))}
        </ul>}
    </section>
}