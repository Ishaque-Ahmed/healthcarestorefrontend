import { useState } from "react";
import SingleAdminCart from "./SingleAdminCart";
import { getUserById, getProfile } from "../../../api/apiPrescription";
import { userInfo } from "../../../utils/auth";
import { useEffect } from "react";
const SingleAdminOrder = (props) => {
    //console.log(props.curOrder.user);
    const [profile, setProfile] = useState({});
    const [user, setUser] = useState({});
    useEffect(() => {
        getUserById(userInfo().token, props.curOrder.user)
            .then(response => {
                console.log(response.data);
                setUser(response.data);
            })
            .catch(err => {
                console.log(err);
            });
        getProfile(userInfo().token, props.curOrder.user)
            .then(response => {
                console.log(response.data);
                setProfile(response.data)
            })
            .catch(err => {
                console.log(err);
            });
    }, [])
    return (
        <div>
            <ul className="list-group mb-5">
                <li className="list-group-item">Order Number: {props.serial}</li>
                {props.curOrder.cartItems.map(items => <SingleAdminCart curCart={items} key={items._id} />)}
                <li className="list-group-item">
                    <h5 className='text-muted'>Shipping Address</h5>
                    <div className='row'>
                        <div className='col-4'>
                            <label>Customer Name: {user.name}</label><br />
                            <label>Contact Number: {profile.phone}</label><br />
                            <label>Email Address: {user.email}</label><br />
                        </div>
                        <div className='col-4'>
                            <label>House: {profile.address1}</label><br />
                            <label>City: {profile.city}</label><br />
                            <label>Postcode: {profile.postcode}</label><br />
                        </div>
                    </div>
                </li>
            </ul>

        </div>
    )
}

export default SingleAdminOrder;