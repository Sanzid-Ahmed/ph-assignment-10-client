import React from 'react';
// These icons are placeholders. You would use a library like react-icons or SVG components.
import { FaCode, FaPaintBrush, FaBullhorn, FaFileAlt } from 'react-icons/fa';

const categoriesData = [
    { name: 'Web Development', icon: FaCode, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { name: 'Graphics Designing', icon: FaPaintBrush, color: 'text-orange-600', bg: 'bg-orange-100' },
    { name: 'Digital Marketing', icon: FaBullhorn, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Content Writing', icon: FaFileAlt, color: 'text-red-600', bg: 'bg-red-100' },
];

const TopCategories = () => {
    return (
        <section className="my-16 py-8">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
                🎯 Job Categories for Every Skill
            </h2>
            
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8 max-w-5xl mx-auto">
                {categoriesData.map((cat, index) => {
                    const Icon = cat.icon;
                    return (
                        // Card for each category
                        <div 
                            key={index} 
                            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer"
                        >
                            {/* Icon/Image Area */}
                            <div className={`p-4 rounded-full ${cat.bg} mb-4`}>
                                <Icon className={`w-8 h-8 ${cat.color}`} />
                            </div>
                            
                            {/* Category Name */}
                            <h3 className="text-lg font-semibold text-gray-800 text-center">
                                {cat.name}
                            </h3>
                            {/* Optional: Add a count of jobs in this category if fetched dynamically */}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default TopCategories;