import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './protectedRoutes/PrivateRoute';
import AdminRoute from './protectedRoutes/AdminRoute';
import Home from './home/Home';
import Login from './user/Login';
import Register from './user/Register';
import Dashboard from './user/Dashboard';
import Prescription from './user/Prescription/Prescription';
import AdminDashboard from './admin/AdminDashboard';
import CreateCategory from './admin/CreateCategory';
import CreateProduct from './admin/CreateProduct';
import ProductDetails from './home/ProductDetails';
import Cart from './order/Cart';
import ShippingAddress from './order/ShippingAddress';
import Checkout from './order/Checkout';
import PrescriptionShippingAddress from './user/Prescription/PrescriptionShippingAddress';
import PrescriptionCheckout from './user/Prescription/PrescriptionCheckout';
import Payment from './order/Payment';
import UpdateProduct from './admin/UpdateProduct';
import Healthcare from './healthcare/Healthcare';

const Main = () => {
    return (
        <div>
            <Switch>
                <Route path="/store" exact component={Home} />
                <Route path="/" exact component={Healthcare} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/product/:id" exact component={ProductDetails} />
                <PrivateRoute path="/user/dashboard">
                    <Dashboard />
                </PrivateRoute>
                <PrivateRoute path="/user/prescription">
                    <Prescription />
                </PrivateRoute>
                <PrivateRoute path="/cart">
                    <Cart />
                </PrivateRoute>
                <PrivateRoute path="/shipping">
                    <ShippingAddress />
                </PrivateRoute>
                <PrivateRoute path="/checkout">
                    <Checkout />
                </PrivateRoute>
                <PrivateRoute path="/payment">
                    <Payment />
                </PrivateRoute>
                <PrivateRoute path="/prescription/shipping">
                    <PrescriptionShippingAddress />
                </PrivateRoute>
                <PrivateRoute path="/prescription/checkout">
                    <PrescriptionCheckout />
                </PrivateRoute>
                <AdminRoute path="/admin/dashboard">
                    <AdminDashboard />
                </AdminRoute>
                <AdminRoute path="/admin/product/update/:id">
                    <UpdateProduct />
                </AdminRoute>
                <AdminRoute path="/create/category">
                    <CreateCategory />
                </AdminRoute>
                <AdminRoute path="/create/product">
                    <CreateProduct />
                </AdminRoute>
                <Redirect to="/" />
            </Switch>
        </div>
    )
}

export default Main;