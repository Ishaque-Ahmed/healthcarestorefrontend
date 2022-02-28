import { useEffect, useState } from 'react';
import Layout from '../Layout';
import { Link } from 'react-router-dom';
import { userInfo } from '../../utils/auth';
import { getPrescriptions } from '../../api/apiPrescription';
import SinglePrescription from './SinglePrescription';

const AdminDashboard = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [error, setError] = useState("");
    const { name, email, role } = userInfo();
    useEffect(() => {
        getPrescriptions(userInfo().token)
            .then(response => {
                setPrescriptions(response.data);
            })
            .catch(err => {
                setError("Failed To load Orders");
            });
    }, []);
    //console.log(prescriptions);

    const PurchaseHistory = () => (
        <div className="card mb-5">
            <h3 className="card-header mb-2">Prescription Orders</h3>
            {prescriptions.map((prescription, i) => <SinglePrescription serial={i + 1} curPrescription={prescription} key={prescription._id} />)}
        </div>
    );

    const UserLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/category">Create Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/product">Create Product</Link>
                    </li>
                </ul>
            </div>
        )
    };


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
            <div className=''>
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

export default AdminDashboard;