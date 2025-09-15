import React from 'react'
import { personas as personaData } from '../constants/constant';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="flex flex-wrap justify-center gap-8 max-w-7xl">
                {personaData.map((persona) => (
                    <button
                        key={persona.id}
                        onClick={() => { navigate(`/chat/${persona.id}`) }}
                        className="w-72 text-left focus:outline-none"
                    >
                        <div
                            className="group relative bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-gray-500 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-gray-900/50 w-72"
                        >
                            {/* Image Container */}
                            <div className="relative overflow-hidden bg-gray-800 h-48 flex items-center justify-center">
                                <img
                                    src={persona.image}
                                    alt={persona.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90"
                                />
                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-black/20"></div>
                                {/* Gradient Overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-800/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Content Container */}
                            <div className="p-6 bg-gray-800">
                                {/* Name */}
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors duration-300 leading-tight">
                                    {persona.name}
                                </h3>
                                
                                {/* Description */}
                                <p className="text-gray-300 group-hover:text-gray-200 leading-relaxed mb-4 transition-colors duration-300">
                                    {persona.description}
                                </p>
                                
                                {/* Bottom Section */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-700 group-hover:border-gray-600 transition-colors duration-300">
                                    <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                        Persona #{persona.id}
                                    </span>
                                    
                                    {/* Arrow Icon */}
                                    <div className="w-10 h-10 rounded-full bg-gray-700 group-hover:bg-white flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                                        <svg 
                                            className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors duration-300 transform group-hover:translate-x-1" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Home;