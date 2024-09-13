import React from "react";
import '../../../index.css';
import PropTypes from "prop-types";

export function Modal_Profile({ name, state, city, bio, picture, onClose }) {
    return (
        <>
            <div className="relative h-screen w-full">
                <div className="absolute justify-center items-center bg-clr-white rounded-lg h-auto w-[22rem]">
                    {/* Upper Background */}
                    <div className="relative w-full h-36">
                        {/* Botón de cerrar */}
                        <div className="absolute top-0 right-0 z-10 m-2" onClick={onClose}>
                            <img src="/images/close_window.svg" alt="Cerrar" className="h-12 cursor-pointer transition-transform duration-300 transform hover:scale-125 transform-origin-center"/>
                        </div>
                        {/* Botón de cerrar */}
                        <svg className="h-full w-full fill-clr-blue opacity-20">
                            <defs>
                                <pattern id="backgroundPattern" x="0" y="0" width="98" height="98" patternUnits="userSpaceOnUse" patternTransform="translate(24 55)">
                                    <path transform="scale(0.45)" d="m112.4,17.77c-15.09,15.09-21.09,36.54-16.04,57.38,4.09,16.9-.15,34.77-11.4,48.05-1,1.17-2.02,2.28-3.09,3.36-11.14,11.14-26.6,16.98-42.43,15.87-10.69-.75-21.14,3.14-28.66,10.66-14.34,14.35-14.38,37.65-.08,51.95,14.3,14.3,37.58,14.25,51.92-.08,7.53-7.53,11.41-17.97,10.66-28.66-1.11-15.83,4.74-31.3,15.87-42.43,1.07-1.07,2.18-2.1,3.36-3.09,13.31-11.26,31.16-15.48,48.05-11.4,20.85,5.06,42.31-.95,57.4-16.04,23.66-23.66,23.72-62.1.13-85.68s-62.02-23.54-85.68.12h0Z" />
                                </pattern>
                            </defs>
                            <rect x="0" y="0" width="100%" height="100%" fill="url(#backgroundPattern)" />
                        </svg>
                    </div>
                    {/* Upper Background */}
                    <div className="mx-10 mb-5 mt-16">
                        {/* Profile Picture */}
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                            <img src={picture} alt="Foto de perfil" className="w-28 h-28 rounded-full border-4 border-white object-cover" />
                        </div>
                        {/* Profile Picture */}
                        {/* Profile */}
                        <div className="flex flex-col justify-center items-center">
                            <h3 className="font-clashDisplay font-medium">{name}</h3>
                            <h6 className="font-bold">{state}, {city}</h6>
                        </div>
                        {/* Profile */}

                        {/* Botones */}
                        <div className="flex gap-5 justify-center transition-all duration-500 items-center my-8">
                            <button className='text-white text-fs-xsmall bg-clr-black rounded transition-all duration-500 hover:text-clr-green-light px-3 py-2'>
                                Editar perfil
                            </button>
                            <button className='text-white text-fs-xsmall bg-clr-black rounded transition-all duration-500 hover:text-clr-green-light px-3 py-2'>
                                Registrar Empresa
                            </button>
                        </div>
                        {/* Botones */}

                        {/* Divider */}
                        <div className="divide-y divide-clr-black">

                            {/* Bio */}
                            <div className="flex flex-col justify-center items-center text-center">
                                <h4 className="font-bold">Acerca de mi</h4>
                                <p className="font-bold text-fs-xsmall">{bio}</p>
                            </div>
                            {/* Bio */}

                            {/* Log Out */}
                            <div className="flex justify-center items-center text-center mt-8">
                                <div className="border-b border-gray-300 my-4"></div>
                                <button className='text-fs-xsmall text-clr-grey transition-all hover:scale-110'>
                                    Cerrar sesión
                                </button>
                            </div>
                            {/* Log Out */}
                        </div>
                        {/* Divider */}
                    </div>
                </div>
            </div>
        </>
    )
}

Modal_Profile.propTypes = {
    name: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired
};

Modal_Profile.defaultProps = {
    name: 'Nombre de usuario',
    state: 'Provincia',
    city: 'Ciudad',
    bio: 'Hola, soy Alejandra Robles, una apasionada por las plantas y amante de las mascotas. ',
    picture: "/images/default_profile_picture.jpg"
};