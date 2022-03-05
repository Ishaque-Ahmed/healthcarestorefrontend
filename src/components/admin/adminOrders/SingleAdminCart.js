import { useEffect, useState } from 'react';
import { API } from '../../../utils/config';
import { getProductDetails } from "../../../api/apiProduct";
const SingleAdminCart = props => {
    //console.log(props.curCart);
    const [curProduct, setCurProduct] = useState({});
    const [errors, setError] = useState("");
    useEffect(() => {
        getProductDetails(props.curCart.product)
            .then(response => setCurProduct(response.data))
            .catch(err => setError(""));
    }, [])


    //console.log(curProduct.name);
    return (
        <li className="list-group-item">
            <div className='row'>
                <div className='col-4'>
                    <h5 className="mr-3">{curProduct.name}</h5>  <p className="mr-3">Quantity: {props.curCart.count}</p>
                    <p className="mr-3">Price: {props.curCart.price * props.curCart.count}</p>
                </div>
                <div className='col-8'><img src={`${API}/product/photo/${props.curCart.product}`} width="120px" className="mr-3 img-fluid" /></div>
            </div>

        </li>
    )
}

export default SingleAdminCart;