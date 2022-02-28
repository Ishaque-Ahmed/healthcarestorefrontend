import { Link, withRouter } from 'react-router-dom';
import { signOut, isAuthenticated, userInfo } from '../utils/auth';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" }
    }
    else {
        return { color: "white" }
    }
}

const Menu = ({ history }) => {

    return (
        <nav className='navbar navbar-dark bg-dark' >
            <div className='container'>
                <ul className="nav nav-tabs" >
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/store')} to="/store">Healthcare Store</Link>
                    </li>

                    {!isAuthenticated() && (<>
                        <li className="nav-item">
                            <Link className="nav-link"
                                style={isActive(history, '/login')} to="/login">Login
                            </Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link"
                                style={isActive(history, '/register')} to="/register">Register</Link>
                        </li> */}
                    </>)}
                    {isAuthenticated() && (<>
                        {userInfo().role === "user" && (<>
                            <li className="nav-item">
                                <Link className="nav-link"
                                    style={isActive(history, `/user/prescription`)} to={`/user/prescription`}>Upload Prescription</Link>
                            </li>
                        </>)}
                        <li className="nav-item">
                            <Link className="nav-link"
                                style={isActive(history, `/${userInfo().role}/dashboard`)} to={`/${userInfo().role}/dashboard`}>Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link"
                                style={isActive(history, `/cart`)} to={`/cart`}>Cart</Link>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link" style={{ cursor: "pointer", color: "grey" }} onClick={() => {
                                signOut(() => {
                                    history.push('/login')
                                })
                            }}>Log Out</span>
                        </li>
                    </>)}
                </ul>
            </div>
        </nav >

    )
}

export default withRouter(Menu);