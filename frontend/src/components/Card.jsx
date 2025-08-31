import React, { useContext } from 'react';
import { userDataContext } from '../context/UserContext';

function Card({ image, selected, onClick }) {
    const { backendImage, setBackendImage, setFrontendImage, setSelectedImage } = useContext(userDataContext);

    const handleClick = () => {
        // Clear uploaded image if a default card is selected
        setBackendImage(null);
        setFrontendImage(null);
        setSelectedImage(image);

        if (onClick) onClick(); // call parent click handler if provided
    };

    return (
        <div
            className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#020220] border-2 border-[#0000ff66] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white
            ${selected ? "border-4 border-white shadow-2xl shadow-blue-950" : ""}`}
            onClick={handleClick}
        >
            <img src={image} className='h-full object-cover' alt="assistant option" />
        </div>
    );
}

export default Card;
