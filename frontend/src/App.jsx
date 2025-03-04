import React, { useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/auth.store";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/theme.store";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  const {theme} = useThemeStore();

  const memoizedCheckAuth = useCallback(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    memoizedCheckAuth();
  }, [memoizedCheckAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }


  return (
    <div data-theme = {theme} className="h-full">
      <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
    </div>
  );
};

export default App;
