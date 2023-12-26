import React from 'react'
import GAStore from "../../Images/GAStore.png"

const Footer = () => {
    return (
        <footer className="text-bg-secondary p-3 mt-4">
            <div className="container p-4">
                <div className="row">
                    <div className="col-md-4">
                        <h5 style={{ cursor: 'pointer' }}>ONLINE SHOPPING</h5>
                        <p style={{ cursor: 'pointer' }}>Men</p>
                        <p style={{ cursor: 'pointer' }}>Women</p>
                        <p style={{ cursor: 'pointer' }}>Kids</p>
                        <p style={{ cursor: 'pointer' }}>Home & Living</p>
                        <p style={{ cursor: 'pointer' }}>Beauty</p>
                        <p style={{ cursor: 'pointer' }}>Gift Card</p>
                        <p style={{ cursor: 'pointer' }}>Myntra Insider</p>
                    </div>
                    <div className="col-md-4">
                        <h5 style={{ cursor: 'pointer' }}>CUSTOMER POLICIES</h5>
                        <p style={{ cursor: 'pointer' }}>Contact Us</p>
                        <p style={{ cursor: 'pointer' }}>FAQ</p>
                        <p style={{ cursor: 'pointer' }}>T&C</p>
                        <p style={{ cursor: 'pointer' }}>Term of Use</p>
                        <p style={{ cursor: 'pointer' }}>Track Orders</p>
                        <p style={{ cursor: 'pointer' }}>Shipping</p>
                        <p style={{ cursor: 'pointer' }}>Cancellation</p>
                    </div>
                    <div className="col-md-4">
                        <h5>EXPERIENCE MYNTRA APP ON MOBILE</h5>
                        <img src={GAStore} alt="Save On Sale" className="img-fluid w-50" />
                    </div>
                </div>
                <hr className="my-4" />
                <p className="text-center">&copy; 2023 www.myntra.com All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer 
