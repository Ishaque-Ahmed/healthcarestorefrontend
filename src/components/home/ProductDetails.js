import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Layout from '../Layout';
import { API } from '../../utils/config';
import { getProductDetails } from '../../api/apiProduct'
import { showSuccess, showError } from '../../utils/messages';
import { addToCart } from '../../api/apiOrder';
import { isAuthenticated, userInfo } from '../../utils/auth';
import { deleteProductById } from '../../api/apiAdmin';



const ProductDetails = props => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [deleteMsg, setDeleteMsg] = useState(false);



    useEffect(() => {
        const id = props.match.params.id;
        getProductDetails(id)
            .then(response => {
                setProduct(response.data);
            })
            .catch(err => {
                setError("Failed to load product")
            })
    }, [])
    const handleAddToCart = product => () => {
        if (isAuthenticated()) {
            setSuccess(false);
            setError(false);
            const user = userInfo();
            const cartItem = {
                user: user._id,
                product: product._id,
                price: product.price
            }
            addToCart(user.token, cartItem)
                .then(response => setSuccess(true))
                .catch(err => {
                    if (err.response) setError(err.response.data);
                    else setError("Adding To cart Failed!");
                })
        } else {
            setSuccess(false);
            setError("Please Log In first");
        }
    }

    const GoBack = () => (<div className="mt-5 mb-5">
        <Link to="/" className="container text-Success text-center">Product Deleted, Go to Home</Link>
    </div>)


    const handleDelete = product => () => {
        if (!window.confirm("Delete Product?")) return
        deleteProductById(userInfo().token, product._id)
            .then(response => {
                setDeleteMsg(true);
            })
            .catch(err => {
                if (err.response) {
                    setError(err.response.data)
                } else {
                    setError("Could Not Delete!");
                }
            })
    }



    //console.log(product);
    if (deleteMsg === true) {
        return (
            <Layout title='Product Page'>
                <div className='mt-5 mb-5 container'>
                    <GoBack />
                </div>
            </Layout>
        )
    } else {
        return (
            <Layout title='Product Page'>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><a href="#">Product</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{product.category ? product.category.name : ""}</li>
                    </ol>
                </nav>
                <div className='container'>
                    <div>
                        {showSuccess(success, 'Item Added to Cart!')}
                        {showError(error, error)}

                    </div>
                    <div className="row container">
                        <div className="col-6">
                            <img
                                src={`${API}/product/photo/${product._id}`}
                                alt={product.name}
                                width="100%"
                            />
                        </div>
                        <div className="col-6">
                            <h3>{product.name}</h3>
                            <span style={{ fontSize: 20 }}>&#2547;</span>{product.price}
                            <p>{product.quantity ? (<span className="badge badge-pill badge-primary">In Stock</span>) : (<span className="badge badge-pill badge-danger">Out of Stock</span>)}</p>
                            <p>{product.description}</p>
                            {product.quantity ? <>
                                &nbsp;<button className="btn btn-outline-primary btn-md"
                                    onClick={handleAddToCart(product)}>Add to Cart</button>
                            </> : ""}
                            {userInfo().role === 'admin' ? <Link to={{ pathname: `/admin/product/update/${product._id}`, state: { product } }}
                            >
                                <button className="btn btn-outline-warning btn-md ml-2">Update Product</button>
                            </Link> : ""}
                            {userInfo().role === 'admin' ? <button className="btn btn-outline-danger btn-md ml-2" onClick={handleDelete(product)}>Delete Product</button> : ""}
                        </div>
                    </div>
                </div>
            </Layout>
        )

    }




}

export default ProductDetails;


