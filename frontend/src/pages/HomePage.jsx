import React from 'react'
import Layout from '../components/Layout/Layout'
import "../pages/HomePage.css"
import { Link } from "react-router-dom"
//importing images
import Flat500off from "../Images/Flat500off.jpg"

import HPSaveOnSale from "../Images/HPSaveOnSale.jpg"
import CrazyDealsHeading from "../Images/CrazyDealsHeading.jpg"
import Flat100 from "../Images/Flat100.jpg"
import Flat200 from "../Images/Flat200.jpg"

import CrazyDeals1 from '../Images/CrazyDeals1.png';
import CrazyDeals2 from '../Images/CrazyDeals2.png';
import CrazyDeals3 from '../Images/CrazyDeals3.png';
import CrazyDeals4 from '../Images/CrazyDeals4.png';
import CrazyDeals5 from '../Images/CrazyDeals5.png';
import CrazyDeals6 from '../Images/CrazyDeals6.png';


import ShopByCatHeading from '../Images/ShopByCatHeading.jpg';
import ShopByCat1 from '../Images/ShopByCat1.jpg';
import ShoByCat2 from '../Images/ShoByCat2.jpg';
import ShopByCat3 from '../Images/ShopByCat3.jpg';
import ShopByCat4 from '../Images/ShopByCat4.jpg';
import ShopByCat5 from '../Images/ShopByCat5.jpg';
import ShopByCat6 from '../Images/ShopByCat6.jpg';
import ShopByCat7 from '../Images/ShopByCat7.jpg';
import ShopByCat8 from '../Images/ShopByCat8.jpg';
import ShopByCat9 from '../Images/ShopByCat9.jpg';
import ShopByCat10 from '../Images/ShopByCat10.jpg';
import ShopByCat11 from '../Images/ShopByCat11.jpg';
import ShopByCat12 from '../Images/ShopByCat12.jpg';
import KnockoutOffer from '../Images/KnockoutOffer.jpg';


const HomePage = () => {

    return (
        <Layout>
            <div className="container mt-3">
                <div className="top-image-container">
                    <Link to="/all-products">
                        <img src={Flat500off} alt="Flat500off" className="img-fluid bordered-img" />
                    </Link>
                    <Link to="/all-products">
                        <img src={HPSaveOnSale} alt="Save On Sale" className="img-fluid bordered-img" />
                    </Link>

                    <div className="row mt-3">
                        <div className="col-md-6">
                            <Link to="/all-products">
                                <img src={Flat100} className="img-fluid bordered-img" alt="Flat100" />
                            </Link>

                        </div>
                        <div className="col-md-6">
                            <Link to="/all-products">
                                <img src={Flat200} className="img-fluid bordered-img" alt="Flat200" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mid-image-container">
                    <img src={CrazyDealsHeading} className="img-fluid mt-3" alt="CrazyDealsHeading" />

                    <div className="crazy-deals-container">
                        <div className="row mt-2">
                            {[CrazyDeals1, CrazyDeals2, CrazyDeals3, CrazyDeals4, CrazyDeals5, CrazyDeals6].map((image, index) => (
                                <div key={index} className="col-md-2 col-sm-4 mb-3">
                                    <Link to="/all-products">
                                        <img src={image} className="img-fluid bordered-img" alt={`CrazyDeals${index + 1}`} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className="row mt-2">
                            {[CrazyDeals5, CrazyDeals6, CrazyDeals1, CrazyDeals4, CrazyDeals2, CrazyDeals3].map((image, index) => (
                                <div key={index} className="col-md-2 col-sm-4 mb-3">
                                    <Link to="/all-products">
                                        <img src={image} className="img-fluid bordered-img" alt={`CrazyDeals${index + 1}`} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="shop-by-category mt-3">
                        <img src={ShopByCatHeading} className="img-fluid" alt="CrazyDealsHeading" />
                        <div className="row mt-2">
                            {[ShopByCat1, ShoByCat2, ShopByCat3, ShopByCat4, ShopByCat5, ShopByCat6, ShopByCat7, ShopByCat8, ShopByCat9, ShopByCat10, ShopByCat11, ShopByCat12].map((image, index) => (
                                <div key={index} className="col-md-2 col-sm-4 mb-3">
                                    <Link to="/all-products">
                                        <img src={image} className="img-fluid bordered-img" alt={`ShopByCat${index + 1}`} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bottom-container">
                    <Link to="/all-products">
                        <img src={KnockoutOffer} alt="KnockoutOffer" />
                    </Link>

                </div>
            </div>
        </Layout>
    )
}

export default HomePage
