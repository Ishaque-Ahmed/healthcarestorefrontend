import { API } from "../../../utils/config";
const SinglePreviousOrders = (props) => {
    const prescriptionId = props.cur._id;
    const showImage = () => {
        const win = window.open(`${API}/prescription/photo/${prescriptionId}`, "_blank");
        win.focus();
    }
    console.log(props.cur);
    return (
        <div className="row">
            <div className="col-6"><div className="mb-3" style={{ float: "left", fontSize: "17px" }}>
                <div className="ml-auto mb-4">
                    <span className="text-center text-muted">Order Number: {props.serial}</span>
                </div>
                <div className="ml-auto mb-3"><span className="text-center text-muted">Total Cost: {props.cur.price}</span></div>
                <div className="ml-auto mb-3"><a onClick={showImage} className="view-pres text-muted" >View Prescription</a></div>
                <hr /> <hr />
            </div></div>
        </div>

    )
}
export default SinglePreviousOrders;