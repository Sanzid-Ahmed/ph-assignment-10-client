import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../components/home/Footer/footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div>
        <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: { fontSize: "16px" },
        }}
      />
      <div>
        <header>
          <Navbar></Navbar>
        </header>
        <main className="w-13/15 my-10 mx-auto">
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
