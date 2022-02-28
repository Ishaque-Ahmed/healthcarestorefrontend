import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import { Link, useLocation } from 'react-router-dom';
import { showError, showLoading, showSuccess } from '../../utils/messages';
import { getCategories, updateProductById } from '../../api/apiAdmin';
import { userInfo } from '../../utils/auth';

const UpdateProduct = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        quantity: '',
        loading: false,
        error: false,
        success: false,
        disabled: false,
        formData: '',
    });

    const product = useLocation().state.product;
    console.log(product);
    console.log(product._id);


    const {
        name,
        description,
        price,
        category,
        categories,
        quantity,
        loading,
        error,
        success,
        formData,
        disabled
    } = values;

    useEffect(() => {
        getCategories()
            .then(response => {
                setValues({
                    ...values,
                    categories: response.data,
                    formData: new FormData()
                })
            })
            .catch(err => {
                setValues({
                    ...values,
                    error: "Failed to load Categories",
                    formData: new FormData()
                })
            })
    }, [])

    const handleChange = (e) => {
        const value = e.target.name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(e.target.name, value);
        setValues({
            ...values,
            [e.target.name]: value,
            error: false,
            success: false
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setValues({
            ...values,
            error: false,
            loading: true,
            disabled: true,
            success: false
        });

        const { token } = userInfo();

        updateProductById(token, formData, product._id)
            .then(response => {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    price: '',
                    category: '',
                    quantity: '',
                    loading: false,
                    success: true,
                    disabled: false,
                    error: false
                })
            })
            .catch(err => {
                let errMsg = "Something Went Wrong";
                if (err.response) errMsg = err.response.data;
                setValues({
                    ...values,
                    error: errMsg,
                    loading: false,
                    success: false,
                    disabled: false
                })
            })
    }



    const UpdateProductForm = () => (
        <form className="mb-3" onSubmit={handleSubmit} >
            <h4>Photo:</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input
                        type="file"
                        name="photo"
                        onChange={handleChange}
                        accept="image/*"

                    />
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name:</label>
                <input
                    name="name"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    value={name}

                />
            </div>
            <div className="form-group">
                <label className="text-muted">Description:</label>
                <textarea
                    name="description"
                    onChange={handleChange}
                    className="form-control"
                    value={description}

                />
            </div>
            <div className="form-group">
                <label className="text-muted">Price:</label>
                <input
                    name="price"
                    onChange={handleChange}
                    className="form-control"
                    type="number"
                    value={price}

                />
            </div>
            <div className="form-group">
                <label className="text-muted">Quantity:</label>
                <input
                    name="quantity"
                    onChange={handleChange}
                    className="form-control"
                    type="number"
                    value={quantity}

                />
            </div>
            <div className="form-group">
                <label className="text-muted">Category:</label>
                <select name="category" value={category} onChange={handleChange} className="form-control" >
                    <option value="">----Select Category----</option>
                    {categories && categories.map(item =>
                        (<option value={item._id} key={item._id}>{item.name}</option>)
                    )}
                </select>
            </div>
            <button className="btn btn-outline-primary" type="submit" disabled={disabled}>Update Product</button>
        </form>
    );

    const goBack = () => (<div className="mt-5">
        <Link to="/" className="text-warning">Go Back To Products</Link>
    </div>)


    return (
        <Layout title="Update product">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError(error, error)}
                    {showLoading(loading)}
                    {showSuccess(success, 'Product Updated Successfully!')}
                    {UpdateProductForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    );

}
export default UpdateProduct;
