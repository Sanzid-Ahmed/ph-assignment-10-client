import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../components/home/Footer/footer';

const MainLayout = () => {
    return (
        <div>
            <div>
                <header>
                    <Navbar></Navbar>
                </header>
                <main className='w-13/15 my-10 mx-auto'>
                    <Outlet></Outlet>
                </main>
                <footer>
                    <Footer></Footer>
                </footer>
            </div>
        </div>
    );
};

export default MainLayout;