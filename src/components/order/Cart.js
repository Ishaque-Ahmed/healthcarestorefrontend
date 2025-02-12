import { useState, useEffect } from 'react';
import Layout from '../Layout';
import { Link } from 'react-router-dom';
import { getCartItems, updateCartItems, deleteCartItem } from '../../api/apiOrder';
import { userInfo } from '../../utils/auth';
import CartItem from './CartItem';
import Spinner from '../Spinner/Spinner';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const Swal = require('sweetalert2');

    const loadCart = () => {
        setLoading(true);
        getCartItems(userInfo().token)
            .then(response => {
                setCartItems(response.data);
                setSuccess(true);
                setLoading(false);
            })
            .catch(err => {
                if (err.response) {
                    setError(err.response.data)
                    setSuccess(false);
                    setLoading(false);
                } else {
                    setError("Cart Not Found");
                    setLoading(false);
                    setSuccess(false);
                }
            })
    }
    useEffect(() => {
        loadCart();
    }, [])

    const increaseItem = item => () => {
        if (item.count === 5) return;
        const cartItem = {
            ...item,
            count: item.count + 1
        }
        updateCartItems(userInfo().token, cartItem)
            .then(response => {
                loadCart();
            })
            .catch(err => {
                if (err.response) {
                    setError(err.response.data)
                    setSuccess(false);
                } else {
                    setError("Cart Not Found");
                    setSuccess(false);
                }
            })
    }

    const decreaseItem = item => () => {
        if (item.count === 1) return;
        const cartItem = {
            ...item,
            count: item.count - 1
        }
        updateCartItems(userInfo().token, cartItem)
            .then(response => {
                loadCart();
            })
            .catch(err => {
                if (err.response) {
                    setError(err.response.data)
                    setSuccess(false);
                } else {
                    setError("Cart Not Found");
                    setSuccess(false);
                }
            })
    }
    const getCartTotal = () => {
        const arr = cartItems.map(item => item.price * item.count);
        const sum = arr.reduce((a, b) => a + b, 0);
        return sum;
    }

    const removeItem = item => () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success ml-3',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCartItem(userInfo().token, item)
                    .then(response => { loadCart() })
                    .catch(err => {
                        if (err.response) {
                            setError(err.response.data)
                            setSuccess(false);
                        } else {
                            setError("Could Not Remove!");
                            setSuccess(false);
                        }
                    })
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your cart item is safe :)',
                    'error'
                )
            }
        })

    }

    return (
        <Layout title="Your Cart" description="Hurry up! Place your order!" className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Order</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Cart</li>
                </ol>
            </nav>
            {loading ? <Spinner /> : <div className="container my-5">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" width="15%">#</th>
                            <th scope="col">Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col" align="right">Price</th>
                            <th scop="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, i) => <CartItem
                            cartItem={item}
                            serial={i + 1}
                            key={item._id}
                            increaseItem={increaseItem(item)}
                            decreaseItem={decreaseItem(item)}
                            removeItem={removeItem(item)} />)}
                        <tr>
                            <th scope="row" />
                            <td colSpan={3}>Total</td>
                            <td align="right">৳ {getCartTotal()}</td>
                            <td />
                        </tr>
                        <tr>
                            <th scope="row" />
                            <td colSpan={5} className="text-right">
                                <Link to="/store"><button className="btn btn-warning mr-4">Continue Shoping</button></Link>
                                <Link to="/shipping" className="btn btn-success mr-4">Proceed To Checkout</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>}

        </Layout>
    )
}

export default Cart;
