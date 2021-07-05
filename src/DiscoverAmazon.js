import React from 'react';

function DiscoverAmazon({ title1, title2, desc, image }) {
    return (
        <div className="da f jcsb">
            <div className="da-col1">
                <p className="lato">Discover Amazon</p>
                <h2>{title1}</h2>
                <h2>{title2}</h2>
                <p className="lato da-col1-desc">{desc} <span><img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/48/winking-face_1f609.png" alt="" /></span></p>
                <button className="lato">View more</button>
            </div>
            <div className="da-col2 f aife">
                <img src={image} alt="" />
            </div>
        </div>
    )
}

export default DiscoverAmazon
