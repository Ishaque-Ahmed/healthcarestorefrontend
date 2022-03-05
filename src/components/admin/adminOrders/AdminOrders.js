import { useEffect, useState } from "react";
import { getAllOrders } from '../../../api/apiOrder';
import { userInfo } from "../../../utils/auth";
import SingleAdminOrder from "./SingleAdminOrder";
import Layout from '../../Layout';
import Spinner from '../../Spinner/Spinner';
const AdminOrders = () => {

    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        setLoading(true);
        getAllOrders(userInfo().token)
            .then(response => {
                setOrders(response.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
    }, [])
    return (
        <Layout title="Orders">
            <div className="container">
                <h3 className="text-center text-muted my-5">Orders:</h3>
                {loading ? <Spinner /> : ""}
                {orders.map((order, i) => <SingleAdminOrder serial={i + 1} curOrder={order} key={order._id} />)}
            </div>
        </Layout>

    )
}
export default AdminOrders;