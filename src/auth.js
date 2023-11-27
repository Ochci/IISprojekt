import React from "react";

export const checkLoginStatus = () => {
    const user = localStorage.getItem('user');
    return !!user; // Convert to boolean
};


export const getLoggedInUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};


export const logoutUser = () => {
    localStorage.removeItem('user');
};