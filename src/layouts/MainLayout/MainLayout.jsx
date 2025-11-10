import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div>
            <div className='w-13/15 my-10 mx-auto'>
                <header>
                    <Navbar></Navbar>
                </header>
                <main>
                    <Outlet></Outlet>
                </main>
                <footer>
                    
                </footer>
            </div>
        </div>
    );
};

export default MainLayout;