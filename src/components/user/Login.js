import { useState } from 'react';
import Layout from '../Layout';
import './login.css';
import { Redirect, useHistory, Link } from 'react-router-dom'
import { showError, showLoading } from '../../utils/messages'
import { login } from '../../api/apiAuth';
import { authenticate, isAuthenticated, userInfo } from '../../utils/auth'

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: false,
        loading: false,
        disabled: false,
        redirect: false
    });
    const history = new useHistory();

    const { email, password, loading, error, redirect, disabled } = values;

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
        login({ email, password })
            .then(response => {
                authenticate(response.data.token, () => {
                    setValues({
                        email: '',
                        password: '',
                        loading: false,
                        disabled: false,
                        success: true,
                        redirect: true
                    })
                });
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

    const signInForm = () => (
        <form onSubmit={handleSubmit}>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                                <div className="card-body p-5 text-center">

                                    <div className="mb-md-5 mt-md-4 pb-3">

                                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p className="text-white-50 mb-3">Please enter your email and password!</p>
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
                                        <button className="btn btn-outline-light btn-lg px-5" type="submit" disabled={disabled}>Login</button>
                                    </div>
                                    <div>
                                        <p className="mb-0">Don't have an account? <Link to="/register" className="text-white-50 fw-bold">Sign Up</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </form>
    );

    const redirectUser = () => {
        if (redirect) {
            return <Redirect to={`${userInfo().role}/dashboard`} />
        }
        if (isAuthenticated()) return <Redirect to="/" />
    }

    return (
        <Layout title="Login" >
            {redirectUser()}
            {showError(error, error)}
            {showLoading(loading)}
            {signInForm()}
        </Layout>
    );
}

export default Login;
