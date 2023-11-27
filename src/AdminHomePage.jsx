import React, {useEffect} from "react";

import { getLoggedInUser } from "./auth";

import { useNavigate } from 'react-router-dom';

import { MainPanel , FooterPanel, FlexibleButton} from "./components";
 
function AdminHomePage() {

    const user = getLoggedInUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!(user && user.role === 'admin')) {
            navigate('/UzivatelHomePage');
        }
    }, []); 
        
    
        return (
            <div className="bodywrapper">
                <div className="adminhomepage">
                <MainPanel linkTo="/AdminHomePage"></MainPanel>
                    <div className="contentwrapper">
                        
    
                        
                        <FlexibleButton text ="Řidič" href="/RidicHomePage"></FlexibleButton>
                        <FlexibleButton text ="Správce" href="/SpravceHomePage"></FlexibleButton>
                        <FlexibleButton text ="Technik" href="/TechnikHomePage" ></FlexibleButton>
                        <FlexibleButton text ="Dispečer" href="/DispecerHomePage" ></FlexibleButton>
                        <FlexibleButton text ="Neregistrovaný uživatel" href="/UzivatelHomePage" ></FlexibleButton>
                        <FlexibleButton text ="Spravovat uživatele" href="/Spravauzivatelu"></FlexibleButton>
    
    
                       
    
                    </div>
                    <FooterPanel></FooterPanel>  
                </div>
            </div>
        );

    
};
 
export default AdminHomePage;