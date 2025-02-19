import React, { useState, useEffect } from "react";
import  authService  from './appwrite/auth.js'; // Named import
import { login, logout } from './store/authSlice';
import { useDispatch } from "react-redux";
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => { // Make the useEffect callback async
      try {
        const userData = await authService.getCurrentUser(); // Use await
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error checking user:", error);
        dispatch(logout()); // Handle errors by logging out (or other logic)
      } finally {
        setLoading(false);
      }
    };

    checkUser(); // Call the async function
  }, [dispatch]); // Add dispatch to the dependency array

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-500">
      <div className="w-full block">
        <Header />
        <main>
          {/* <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;