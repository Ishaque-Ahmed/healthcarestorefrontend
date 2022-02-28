import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
import Layout from '../Layout';
import './login.css';
import { showError, showLoading } from '../../utils/messages'
import { register } from '../../api/apiAuth';
import { isAuthenticated } from '../../utils/auth';
import { userInfo } from '../../utils/auth';

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        loading: false,
        disabled: false,
        success: false
    });

    const { name, email, password, success, error, loading, disabled } = values;

    const handleChange = e => {
        setValues({
            ...values,
            error: false,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setValues({
            ...values,
            error: false,
            loading: true,
            disabled: true
        })
        register({ name, email, password })
            .then(response => {
                setValues({
                    name: '',
                    email: '',
                    password: '',
                    loading: false,
                    disabled: false,
                    success: true
                })
            })
            .catch(err => {
                let errMsg = "Something Went Wrong.";
                if (err.response) {
                    errMsg = err.response.data;
                } else {
                    errMsg = "Something Went Wrong.";
                }
                setValues({
                    ...values,
                    error: errMsg,
                    disabled: false,
                    loading: false
                })
            });
    }

    const signUpForm = () => (
        <form onSubmit={handleSubmit}>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                                <div className="card-body p-5 text-center">

                                    <div className="mb-md-5 mt-md-4 pb-2">

                                        <h2 className="fw-bold mb-3 text-uppercase">Signup</h2>
                                        <div className="form-outline form-white mb-4">
                                            <input type="text" name="name"
                                                className="form-control form-control-lg"
                                                value={name} required
                                                onChange={handleChange} placeholder="Name" />

                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <input name='email' type="email"
                                                value={email} required
                                                onChange={handleChange} className="form-control form-control-lg" placeholder="Email" />

                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <input type="password" name="password"
                                                value={password} required
                                                onChange={handleChange}
                                                className="form-control form-control-lg" placeholder="Password" /></div>
                                        <button className="btn btn-outline-light btn-lg px-5" type="submit" disabled={disabled}>Signup</button>
                                    </div>
                                    <div>
                                        <p className="mb-0">Already have an account? <Link to="/login" className="text-white-50 fw-bold">Login</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return (
                <div className="alert alert-primary mb-0">
                    New Account Created. Please, <Link to="/login">Login</Link>.
                </div>
            )
        }
    }

    return (
        <Layout title="Register" >
            {isAuthenticated() ? <Redirect to="/" /> : ""}
            {showSuccess()}
            {showLoading(loading)}
            {showError(error, error)}
            {signUpForm()}
        </Layout>
    );
}
export default Register;
