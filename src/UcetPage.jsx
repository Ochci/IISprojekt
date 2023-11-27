import React, { useEffect, useState } from "react";
import './stylesheet.css'

import { useNavigate } from 'react-router-dom';

import { getLoggedInUser, logoutUser } from './auth';

function UcetPage() {
    const user = getLoggedInUser();
    
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost/IIS-ITU/enquiries/Spravauzivatelu.php?action=logoutPerson', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            }); 
            
            console.log('Fetch response:', response);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            else if (response.ok) {
                logoutUser();
                console.log('User logged out successfully');
            }
    
            navigate(`/UzivatelHomePage`);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };


    return (
        <div className="bodywrapper">
            <div className="loginpage">
                <h2>Váš účet:</h2>
                <p>{user.jmeno} {user.prijmeni}</p>

                <form onSubmit={handleSubmit}>
                <label>Odhlášení:</label>
                <button type="submit">Odhlásit</button>
                </form>
            </div>
        </div>
    );
};

 
export default UcetPage;