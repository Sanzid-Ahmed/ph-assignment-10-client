import React, { useState, useEffect } from 'react';
import image from "../../../assets/young-asian-business-team-work-260nw-1695247384.jpg"
import { Link } from 'react-router';



const Banner = () => {
    const [isVisible, setIsVisible] = useState(false);

    
    useEffect(() => {        
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100); 
        return () => clearTimeout(timer);
    }, []);

    
    
    const contentAnimationClasses = isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-5';

    
    
    return (
        <header className="relative w-full h-[65vh] overflow-hidden grid place-items-center mt-[72px]">

            <img 
                src={image} 
                alt="Young Asian business team working, illustrating a creative marketplace" 
                className="absolute top-0 left-0 w-full h-full object-cover z-10 
                           brightness-[.35] contrast-[1.1] grayscale-[.1]"/>
            
           
            <div 
                className="absolute top-0 left-0 w-full h-full z-20 
                           bg-gradient-to-br from-gray-900/80 to-black/60"
            ></div>

            
            <div 
                
                className={`relative z-30 text-center max-w-4xl px-5 text-white 
                            transition-all duration-1000 ease-in-out 
                            ${contentAnimationClasses}`}
            >
               
                <h1 className="text-2xl md:text-4xl font-extrabold mb-2 leading-tight">
                    Your <span className="text-teal-400">Creative</span> Marketplace
                </h1>

                
                <p className="font-bold mb-10 opacity-95 text-[11px]">
                    Connect with top-tier talent and bring your projects to life.
                </p>

                
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                    
                    
                    <Link 
                        to ="/addJob"
                        className="btn bg-white text-black font-bold py-3 px-8 
                                   rounded-full transition duration-300 ease-in-out 
                                   transform hover:scale-105 hover:-translate-y-1 
                                    w-full sm:w-auto"
                    >
                        Create a Job
                    </Link>
                    
                    
                    <button 
                        className="btn bg-transparent text-white font-semibold py-3 px-8 
                                   border-2 hover:border-teal-500 
                                   hover:bg-teal-500 rounded-full transition duration-300 
                                   transform hover:scale-105 w-full sm:w-auto"
                    >
                        How Reliable?
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Banner;