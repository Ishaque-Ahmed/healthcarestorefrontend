import SingleCart from "./SingleCart";
const SingleOrder = (props) => {
    //console.log(props.curOrder.cartItems);
    return (
        <div>
            <ul className="list-group">
                <li className="list-group-item">Order Number: {props.serial}</li>
                {props.curOrder.cartItems.map(items => <SingleCart curCart={items} key={items._id} />)}
                <li className="list-group-item">Payment {props.curOrder.status}.</li>

            </ul>

        </div>
    )
}

export default SingleOrder;