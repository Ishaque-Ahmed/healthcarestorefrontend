import { useState, useEffect } from "react";
import './banner.css';
const Banner = () => {
    return (
        <div>
            <div className="banner mb-5 banner-overlay">
                <div className="banner-content">
                    <h3>Welcome To</h3>
                    <h2>Online Healthcare Store</h2>
                    <a href="" className="btn btn-outline-light">About Us</a>
                </div>
            </div>
        </div>
    )
}
export default Banner;