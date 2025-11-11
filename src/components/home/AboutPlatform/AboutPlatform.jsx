// src/components/AboutPlatform.jsx

import React from 'react';
import { FiGlobe } from 'react-icons/fi'; // Example icon for the illustration area

const AboutPlatform = ({ platformName = "TaskSphere" }) => {
    return (
        <section className="my-16 py-10 bg-gray-50 rounded-lg shadow-inner">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Text Content (Left Column) */}
                <div className="lg:pr-8">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                        💡 About {platformName}: Your Next Opportunity
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        **{platformName}** is a dynamic marketplace connecting talented individuals with businesses in need of digital services. We streamline the process, offer secure collaboration tools, and guarantee timely delivery.
                    </p>
                    <p className="text-lg text-gray-600 mt-4">
                        Find and fulfill tasks in Web Development, Design, Marketing, and more—all within a single, reliable platform.
                    </p>
                </div>
                
                {/* Illustration/Graphic (Right Column) */}
                <div className="flex justify-center items-center p-6">
                    {/* Placeholder for the large, minimalist illustration */}
                    <div className="relative w-full max-w-md aspect-square">
                        {/* Using a simple icon/shape as a stand-in for a detailed SVG illustration */}
                        <FiGlobe className="w-full h-full text-teal-200 opacity-75 animate-pulse" />
                        <div className="absolute inset-0 flex justify-center items-center text-teal-600 font-bold text-xl">
                            Connect & Conquer
                        </div>
                        {/*   -> Replace with your actual SVG/image */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutPlatform;