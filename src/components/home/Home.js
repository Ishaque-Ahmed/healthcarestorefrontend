import { useState, useEffect } from "react";
import Layout from "../Layout";
import Card from "./Card";
import Spinner from "../Spinner/Spinner";
import { showError, showSuccess } from "../../utils/messages";
import { getCategories, getProducts, getFilteredProducts } from '../../api/apiProduct';
import CheckBox from "./Checkbox";
import RadioBox from "./RadioBox";
import Footer from '../healthcare/footer/Footer'
import { prices } from '../../utils/prices';
import { isAuthenticated, userInfo } from '../../utils/auth';
import { addToCart } from '../../api/apiOrder';

const Home = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [limit, setLimit] = useState(8);
    const [skip, setSkip] = useState(0);
    const [order, setOrder] = useState('desc');
    const [sortBy, setSortBy] = useState('createdAt');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [filters, setFilters] = useState({
        category: [],
        price: []
    });
    const [searchKey, setSearchKey] = useState('');
    const Swal = require('sweetalert2');

    useEffect(() => {
        setLoading(true);

        //console.log(sortBy, order, limit, skip);
        getProducts(sortBy, order, limit, skip)
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError("Failed To load Products");
                setLoading(false);
            });
        getCategories()
            .then(response => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError("Failed TO load Categories");
                setLoading(false);
            })
    }, [limit, skip]);



    const handleAddToCart = product => () => {
        if (isAuthenticated()) {
            setError(false);
            setSuccess(false);
            const user = userInfo();
            const cartItem = {
                user: user._id,
                product: product._id,
                price: product.price
            }
            addToCart(user.token, cartItem)
                .then(response => {
                    setSuccess(true);
                    Swal.fire({
                        icon: 'success',
                        title: 'Added To Cart',
                    })
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: err.response.data,
                    })
                    if (err.response) setError(err.response.data);
                    else setError("Adding To cart Failed!");
                })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Please Login First!',
            })
            setSuccess(false);
            setError("Please Log In first");
        }
    }

    const handleFilters = (myFilters, filterBy) => {
        const newFilters = { ...filters };
        if (filterBy === 'category') {
            newFilters[filterBy] = myFilters;
        }
        if (filterBy === 'price') {
            const data = prices;
            let arr = [];
            for (let i in data) {
                if (data[i].id === parseInt(myFilters)) {
                    arr = data[i].arr;
                }
            }
            newFilters[filterBy] = arr;
        }
        setFilters(newFilters);
        getFilteredProducts(skip, limit, newFilters, order, sortBy)
            .then(response => setProducts(response.data))
            .catch(err => setError("Failed to load products"));
    }

    const showFilters = () => {
        return (
            <>
                <div className="row mb-3">
                    <div className="col-4 border-right border-bottom">
                        <h5>Select Categories</h5>
                        <ul>
                            <CheckBox
                                categories={categories}
                                handleFilters={myFilters => handleFilters(myFilters, 'category')}
                            />
                        </ul>
                    </div>
                    <div className="col-4 border-right border-bottom">
                        <h5>Filter by Price</h5>
                        <div className="row">
                            <RadioBox
                                prices={prices}
                                handleFilters={myFilters => handleFilters(myFilters, 'price')}
                            />
                        </div>
                    </div>
                    <div className="col-4 border-bottom">
                        <h5 className="mb-2" >Search Products</h5>
                        <div className="input-group">
                            <div className="form-outline ">
                                <input type="search" id="form1" onChange={e => { setSearchKey(e.target.value) }} className="form-control" placeholder="type a name" />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }


    return (
        <Layout title="Store" className="" >
            <div className="container mt-4"  >
                {showFilters()}
                {loading ? <Spinner /> : ""}
                <div style={{
                    width: "100%"
                }}>
                    {/* {showError(error, error)}
                    {showSuccess(success, "Added To Cart Successfully")} */}
                </div>
                <div className="row">
                    {products && products.filter((product) => {
                        if (searchKey === '') return product;
                        else if (product.name.toLowerCase().includes(searchKey.toLocaleLowerCase())) {
                            return product;
                        }
                    })
                        .map(product => <Card product={product} key={product._id}
                            handleAddToCart={handleAddToCart(product)} />)}
                </div>
                <div className="d-flex justify-content-end">
                    <button className="mt-5 mb-5 btn btn-sm btn-outline-secondary"
                        onClick={() => { setSkip(skip + 4) }}>see more</button>
                </div>
            </div>
            <Footer />
        </Layout>
    )
}
export default Home;
