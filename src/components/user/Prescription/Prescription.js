import { useState, useEffect } from "react";
import './prescription.css'
import Layout from "../../Layout";
import { API } from "../../../utils/config";
import { uploadPrescription, getAdminApprovedPrescriptions, updatePrescription } from '../../../api/apiPrescription'
import { userInfo } from "../../../utils/auth";
import { showSuccess, showError } from "../../../utils/messages";
import { useHistory } from "react-router-dom";
import PreviousPrescription from "./PreviousPrescription";

const Prescription = () => {
    const [values, setValues] = useState({
        uploaded: false,
        curStatus: '',
        price: '',
        loading: false,
        error: false,
        success: false,
        disabled: false,
        formData: new FormData(),
    });
    const [confirmed, setConfirmed] = useState([]);

    const history = useHistory();
    const {
        uploaded,
        curStatus,
        price,
        loading,
        error,
        success,
        formData,
        disabled
    } = values;
    useEffect(() => {
        getAdminApprovedPrescriptions(userInfo().token, userInfo()._id)
            .then(response => {
                setConfirmed(response.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleChange = e => {
        const value = e.target.name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(e.target.name, value);
        setValues({
            ...values,
            [e.target.name]: value,
            error: false,
            success: false
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({
            ...values,
            error: false,
            loading: true,
            disabled: true,
            success: true
        });
        const { token, } = userInfo();
        const userId = userInfo()._id;
        formData.set('user', userId);
        uploadPrescription(token, formData)
            .then(response => {
                setValues({
                    ...values,
                    curStatus: 'Pending',
                    price: '',
                    loading: false,
                    success: false,
                    disabled: false,
                    error: false,
                    uploaded: true,
                })
                history.push('/prescription/shipping')
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
    const prescriptionForm = () => (
        <form className="mt-5 mb-3" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input
                        type="file"
                        name="photo"
                        onChange={handleChange}
                        accept="image/*"
                        required
                    />
                </label>
            </div>
            <button className="btn btn-outline-secondary" type="submit" disabled={disabled && curStatus === 'Pending'}>Upload Prescription</button>
        </form>
    );

    //console.log(confirmed.length);
    const ApprovedPrescription = props => {
        const prescriptionId = props.cur._id;
        const [done, setDone] = useState(false);
        useEffect(() => {

        }, [done]);
        const showImage = () => {
            const win = window.open(`${API}/prescription/photo/${prescriptionId}`, "_blank");
            win.focus();
        }

        const changeToUserApproved = () => {
            if (!window.confirm("Confirm?")) return
            const formData = new FormData();
            formData.set('curStatus', 'UserConfirmed');
            updatePrescription(userInfo().token, prescriptionId, formData)
                .then(response => {
                    setDone(true);
                    alert('Confirmed')
                    window.location.reload();
                })
                .catch(err => {
                    setDone(false);
                    alert('can not confirm!');
                });
        }
        const changeToUserCancelled = () => {
            if (!window.confirm("Cancel?")) return
            const formData = new FormData();
            formData.set('curStatus', 'UserCancelled');
            updatePrescription(userInfo().token, prescriptionId, formData)
                .then(response => {
                    setDone(true);
                    alert('Cancelled!')
                    window.location.reload();
                })
                .catch(err => {
                    setDone(false);
                    alert('can not confirm!');
                })
        }

        return (
            <div>
                <div className="row mx-auto mb-2">
                    <span className="text-center text-muted">Prescription Number: {props.serial}</span>
                </div>
                <div className="mb-3">
                    <div className="row">
                        <div className="col-7">
                            <div className="row">
                                <div className="col-6"><span className="text-center text-muted">Total Cost: {props.cur.price}</span></div>
                                <div className="col-6"><a onClick={showImage} className="view-pres text-muted" >View Prescription</a></div>
                            </div>
                        </div>
                        <div className="col-5">
                            <button onClick={changeToUserApproved} className="btn btn-outline-success btn-sm mr-2">Confirm</button>
                            <button onClick={changeToUserCancelled} className="btn btn-outline-danger btn-sm">Cancel</button>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        )
    }
    //console.log(values);
    return (
        <Layout title="Upload Prescription" className="">
            <div className="prescription">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-6 mt-5 border-right">
                            <h4 className="mb-3 text-muted">Upload A Valid Prescription's Photo:</h4>
                            {showSuccess(success, "Uploaded Successfully")}
                            {showError(error, error)}
                            {prescriptionForm()}
                        </div>
                        <div className="col-6 mt-5">
                            {confirmed.length !== 0 ? <h4 className="mb-3 text-muted">Confirm Your Previous Orders: </h4> : ""}

                            <div className="mt-5">
                                {confirmed.map((cur, i) => <ApprovedPrescription serial={i + 1} cur={cur} key={cur._id} />)}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <PreviousPrescription />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Prescription;
