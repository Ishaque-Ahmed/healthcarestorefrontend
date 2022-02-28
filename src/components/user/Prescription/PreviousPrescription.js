import { useState, useEffect } from "react";
import { getOrderedPrescriptions } from '../../../api/apiPrescription';
import { userInfo } from "../../../utils/auth";
import SinglePreviousOrders from "./SinglePreviousOrders";
const PreviousPrescription = () => {
    const [previous, setPrevious] = useState([]);

    useEffect(() => {
        getOrderedPrescriptions(userInfo().token, userInfo()._id)
            .then(response => {
                setPrevious(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    //console.log(previous);
    return (
        <div className="container">
            <h4 className="mb-3 text-muted">Previous Orders:</h4>
            {previous.map((item, i) =>
                <SinglePreviousOrders cur={item} serial={i + 1} key={item._id} />
            )}
        </div>
    )
}
export default PreviousPrescription;