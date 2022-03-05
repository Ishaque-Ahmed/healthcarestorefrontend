import { useEffect, useState } from 'react';
import Layout from '../Layout';
import { Link } from 'react-router-dom';
import { userInfo } from '../../utils/auth';
import { getPurchaseHistory } from '../../api/apiOrder'
import SingleOrder from './SingleOrder';
import Spinner from '../Spinner/Spinner';

const Dashboard = () => {
    const { name, email, role } = userInfo();
    const [orders, setOrders] = useState([]);
    const [errors, setError] = useState("");
    const [loading, setLodaing] = useState(false);

    useEffect(() => {
        setLodaing(true);
        getPurchaseHistory(userInfo().token)
            .then(response => {
                setOrders(response.data);
                setLodaing(false);
            })
            .catch(err => {
                setError("Failed To load Orders");
                setLodaing(false);
            });
    }, []);

    //console.log(orders);
    const UserLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="#">My Cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="#">Update Profile</Link>
                    </li>
                </ul>
            </div>
        )
    };



    const PurchaseHistory = () => (
        <div className="card mb-5">
            <h3 className="card-header">Purchase History</h3>
            {loading ? <Spinner /> : ""}
            {orders.map((order, i) => <SingleOrder serial={i + 1} curOrder={order} key={order._id} />)}
            {/* {order.cartItems.map(item => console.log("cart item", item.product))} */}
        </div>
    );

    const UserInfo = () => (
        <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role}</li>
            </ul>
        </div>
    );

    return (
        <Layout title="Dashboard" className="container-fluid">
            <div className='container'>
                <div className="row">
                    <div className="col-sm-3">
                        <UserLinks />
                    </div>
                    <div className="col-sm-9">
                        <UserInfo />
                        <PurchaseHistory />
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Dashboard;