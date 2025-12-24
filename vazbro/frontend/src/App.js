import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./components/Login.css"; // Главные стили

import Header from "./components/Header"; // Компоненты

// Страницы

import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import About from "./pages/About";





function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} /> 
        <Route path="/about" element={<About />} /> 
      </Routes>
    </BrowserRouter>
  );
}


export default App;
