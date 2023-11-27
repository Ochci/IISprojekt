import React, {useEffect} from "react";

import { Link } from "react-router-dom";

import { getLoggedInUser } from "./auth";

import { useNavigate } from "react-router-dom";

import { MainPanel , FooterPanel, FlexibleButton} from "./components";
 
function DispecerHomePage() {
    const user = getLoggedInUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!((user && user.role === 'dispecer') || (user && user.role === 'admin'))) {
            navigate('/UzivatelHomePage');
        }
    }, []);  

        return (   
            <div className="bodywrapper">
                <MainPanel linkTo="/DispecerHomePage"></MainPanel>
                <div className="contentwrapper">
                    
    
                    <FlexibleButton text ="Přidělit spoj" href="/DispecerVyberSpoje"></FlexibleButton>
                    <FlexibleButton text ="Vyhledat spoj" href="/UzivatelHomePage"></FlexibleButton>
    
                </div>
                <FooterPanel></FooterPanel>
            </div>
        );
    
};
 
export default DispecerHomePage;