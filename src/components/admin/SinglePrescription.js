import { useEffect, useState } from 'react';
import { getProfile } from '../../api/apiPrescription';
import { userInfo } from '../../utils/auth';
import { API } from '../../utils/config';
import { updatePrescription, deletePrescription, getUserById } from '../../api/apiPrescription';

const SinglePrescription = (props) => {
    const [profile, setProfile] = useState({});
    const [approved, setApproved] = useState(props.curPrescription.curStatus);
    const [user, setUser] = useState({});

    const userid = props.curPrescription.user._id;
    const prescriptionId = props.curPrescription._id;

    //console.log("prescription", props.curPrescription);

    useEffect(() => {
        getProfile(userInfo().token, userid)
            .then(response => {
                setProfile(response.data);
            });
        getUserById(userInfo().token, userid)
            .then(response => { setUser(response.data) })
            .catch(err => { })
    }, [approved])
    console.log(user.name, user.email);
    //console.log(approved);
    //console.log("Profile", profile);
    const showImage = () => {
        const win = window.open(`${API}/prescription/photo/${prescriptionId}`, "_blank");
        win.focus();
    }
    const changeStatus = () => {
        const price = prompt("Enter Price: ");
        console.log(price);
        const formData = new FormData();
        formData.set('curStatus', 'AdminApproved');
        formData.set('price', price);
        if (price !== null) {
            updatePrescription(userInfo().token, prescriptionId, formData)
                .then(response => {
                    setApproved("AdminApproved");
                    alert('Approved');
                    window.location.reload();
                })
                .catch(err => {
                    alert('can not approve!');
                })
        } else {
            alert("Please Provide total cost!")
        }

    }
    const deleteCurrentPrescription = () => {
        if (!window.confirm("Confirm Delete")) return
        deletePrescription(userInfo().token, prescriptionId)
            .then(response => { window.location.reload(); })
            .catch(err => { })
    }
    return <div className='container'>
        <div className='row ml-2'>
            <div className='col-6 border-right'>
                <h5 className='text-center text-muted'>Shipping Address</h5>
                <div className='row'>
                    <div className='col-7'>
                        <label>Customer Name: {user.name}</label><br />
                        <label>Contact Number: {profile.phone}</label><br />
                        <label>Email Address: {user.email}</label><br />
                        <label>Order Status: {props.curPrescription.curStatus}</label>
                    </div>
                    <div className='col-5'>
                        <label>House: {profile.address1}</label><br />
                        <label>City: {profile.city}</label><br />
                        <label>Postcode: {profile.postcode}</label><br />
                        <label>Country: {profile.country}</label>
                    </div>
                </div>
            </div>
            <div className='col-3 d-flex justify-content-center border-right'>
                <button className='btn btn-outline-success' onClick={showImage}>View Prescription</button>
            </div>
            <div className='col-3 text-center mt-5'>
                <button className='btn btn-outline-warning ' onClick={changeStatus} disabled={approved !== 'Pending'}>
                    {approved === 'Pending' ? "Approve" : "Approved"}</button>
                <button className='btn btn-outline-danger ml-2' onClick={deleteCurrentPrescription}>
                    Delete
                </button>
            </div>
        </div>
        <hr />
    </div>
}
export default SinglePrescription;