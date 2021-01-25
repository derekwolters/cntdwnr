import React from 'react';

const Footer = () => {
    const currentDate = new Date();
    const year = (currentDate.getFullYear());
    const month = (currentDate.getMonth());
    const day = (currentDate.getDate());
    return (
        <div className="footer">
            <h2>{month+1}.{day}.{year}</h2>
        </div>
    )
}

export default Footer;