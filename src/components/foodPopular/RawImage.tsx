import React from 'react';

const RawImage = ({ image, altText, className }) => {
    return (
        <img
            loading="lazy"
            src={image}
            alt={altText}
            className={className}
        />
    );
};

export default RawImage;