import React from 'react';
import Banner from './Banner/Banner';
import TopCategories from './TopCategories/TopCategories';
import AboutPlatform from './AboutPlatform/AboutPlatform';

const Home = () => {
    return (
        <div>
            <header className='mt-10'><Banner></Banner></header>
            <main>
                <section>
                    <TopCategories></TopCategories>
                </section>
                <section>
                    <AboutPlatform></AboutPlatform>
                </section>
            </main>
        </div>
    );
};

export default Home;