import './footer.css'
import { Link } from 'react-router-dom';
import { userInfo, isAuthenticated } from '../../../utils/auth';
const Footer = () => {
    return (
        <div className=''>
            <section className="footer-area bg-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <div className="single-footer">
                                <h3 className="mt-3 mb-3">About Us</h3>
                                <p className="mt-3 text-justify">We aim at covering various healthcare categories comprehensively which include, general medicines, vitamins and herbs, medical equipments etc. </p>
                                <p className="mt-3 text-justify">The aim is to supply cheaper products to everybody who has access to the internet and deliver those products to their door.</p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="single-footer">
                                <h4>Quick Links</h4>
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/store">Healthcare Store</Link></li>
                                    {isAuthenticated() && (<>
                                        {userInfo().role === "user" && (<>
                                            <li>
                                                <Link to={`/user/prescription`}>Upload Prescription</Link>
                                            </li>
                                        </>)}
                                        <li>
                                            <Link to={`/${userInfo().role}/dashboard`}>Dashboard</Link>
                                        </li>
                                        <li >
                                            <Link to={`/cart`}>Cart</Link>
                                        </li>
                                    </>)}
                                </ul>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="single-footer">
                                <h4>Contact Us</h4>
                                <ul>
                                    <li><a href="">90 Low Leighton Rd, New Mills, High Peak, SK22 4JG</a></li>
                                    <li><a href="">01663 745 885 / 308 022</a></li>
                                    <li><a href="">info@newmillscuisine.uk</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
export default Footer;