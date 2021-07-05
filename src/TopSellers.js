import React from 'react';
import Product from './Product';

function TopSellers() {
    return (
        <div>
            <div className="lw">
                <div className="lw-title f aic jcsb">
                    <p>Amazon Top Sellers</p>
                    <div className="lw-titleCTA f aic">
                        <p className="lato">View more</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="24" viewBox="0 0 46 24">
                            <g id="Group_1" data-name="Group 1" transform="translate(-492 -999)">
                                <path id="Path_1" data-name="Path 1" d="M0,0H24V24H0Z" transform="translate(492 999)" fill="none"></path>
                                <line id="Line_1" data-name="Line 1" x2="40" transform="translate(497 1011)" fill="none" stroke="#4c4b4d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"></line>
                                <line id="Line_2" data-name="Line 2" x2="4" y2="4" transform="translate(497 1011)" fill="none" stroke="#4c4b4d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"></line>
                                <line id="Line_3" data-name="Line 3" y1="4" x2="4" transform="translate(497 1007)" fill="none" stroke="#4c4b4d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"></line>
                            </g>
                        </svg>
                    </div>
                </div>

                <div className="lw-products f jcsb">
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                </div>
            </div>
        </div>
    )
}

export default TopSellers
