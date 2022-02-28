import React from 'react';
import { API } from '../../utils/config';

const CartItem = ({ cartItem, serial, increaseItem, decreaseItem, removeItem }) => {
    return (
        <tr>
            <th scope="row">{serial}</th>
            <th><img src={`${API}/product/photo/${cartItem.product._id}`}
                alt={cartItem.product.name} width="30px" /></th>
            <td>{cartItem.product ? cartItem.product.name : ""}</td>
            <td>
                <button className="btn btn-outline-primary btn-sm mb-2"
                    onClick={decreaseItem}>-</button>
                &nbsp;&nbsp;{cartItem.count}&nbsp;&nbsp;
                <button className="btn btn-outline-primary btn-sm mb-2"
                    onClick={increaseItem}>+</button>
            </td>
            <td align="right">৳  {cartItem.price * cartItem.count}</td>
            <td><button className="btn btn-danger btn-sm"
                onClick={removeItem}>Remove From Cart</button></td>
        </tr>)
};


export default CartItem;