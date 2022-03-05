import React, { useState, useEffect } from 'react';
import { getProfile } from '../../../api/apiOrder';
import { userInfo } from '../../../utils/auth';
import Layout from '../../Layout';
import { Link } from 'react-router-dom';

const PrescriptionCheckout = () => {
    const [values, setValues] = useState({
        phone: '',
        address1: '',
        address2: '',
        city: '',
        postcode: '',
        country: ''
    });

    const {
        phone,
        address1,
        address2,
        city,
        postcode,
        country
    } = values;


    useEffect(() => {
        getProfile(userInfo().token)
            .then(response => setValues(response.data))
            .catch(err => { })
    }, []);

    const shippinDetails = () => (
        <>
            To,
            <br /> <b>{userInfo().name}</b>
            <br /> Phone: {phone}
            <br /> {address1}
            {address2 ? (<><br />{address2}</>) : ""}
            <br /> {city}-{postcode}, {country}
        </>
    )


    if (address1 && city && phone && postcode && country) return (<>
        <Layout title="Checkout" description="Complete your order!" className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link href="#">Order</Link></li>
                    <li className="breadcrumb-item"><Link href="#">Cart</Link></li>
                    <li className="breadcrumb-item"><Link href="#">Shipping Address</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                </ol>
            </nav>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card mb-5" style={{ height: 'auto' }}>
                            <div className="card-header">Shipping Details</div>
                            <div className="card-body">
                                {shippinDetails()}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <br />
                        <p><Link className="btn btn-warning btn-md" to="/user/prescription" >Confirm Order</Link></p>
                    </div>
                </div>
            </div>
        </Layout>
    </>);
    else return <></>
}

export default PrescriptionCheckout;
