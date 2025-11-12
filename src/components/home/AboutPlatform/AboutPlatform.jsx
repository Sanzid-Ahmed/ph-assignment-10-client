import React from 'react';
import logo from '../../../assets/Gemini_Generated_Image_45u0f345u0f345u0.png'

const AboutPlatform = () => {
    return (
        <section className="my-16 py-10 bg-gray-50 rounded-lg shadow-inner">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="lg:pr-8">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                        About FreeMarket : Your Next Opportunity
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        FreeMarket is a dynamic marketplace connecting talented individuals with businesses in need of digital services. We streamline the process, offer secure collaboration tools, and guarantee timely delivery.
                    </p>
                    <p className="text-lg text-gray-600 mt-4">
                        Find and fulfill tasks in Web Development, Design, Marketing, and more—all within a single, reliable platform.
                    </p>
                </div>
                
                
                <div className="flex justify-center items-center p-6">
                    <div className="relative w-full max-w-md aspect-square">
                        <img src={logo} alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutPlatform;