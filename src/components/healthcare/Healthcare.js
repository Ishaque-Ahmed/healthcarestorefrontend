import './healthcare.css';
import About from './about/About';
import Team from './team/Team';
import Footer from './footer/Footer';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { signOut, isAuthenticated, userInfo } from '../../utils/auth';
const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" }
    }
    else {
        return { color: "white" }
    }
}
const Healthcare = ({ history }) => {


    const Menu = () => {

        return (
            <nav className='navbar navbar-dark' >
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
                            {userInfo().role === "admin" && (<>
                                <li className="nav-item">
                                    <Link className="nav-link"
                                        style={isActive(history, `/admin/orders`)} to={`/admin/orders`}>Orders</Link>
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

    const viewShop = () => {
        history.push('/store')
    }
    document.title = "Homepage"
    return (

        <div>

            <div className="banner  banner-overlay">
                <div className='menu'> <Menu /> </div>

                <div className="banner-content">
                    <h3>Welcome To</h3>
                    <h2>Online Healthcare Store</h2>
                    <p>we are ready to serve in your doorstep</p>
                    <button onClick={viewShop} className="btn btn-outline-light">Visit Store</button>
                </div>
            </div>
            <About /> <hr />
            <Team /><hr />
            <Footer />
        </div>
    )
}
export default withRouter(Healthcare);