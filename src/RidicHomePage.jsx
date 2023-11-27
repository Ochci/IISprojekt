import React, { useEffect} from "react";

import { Link } from "react-router-dom";

import { MainPanel , FooterPanel, FlexibleButton} from "./components";

import { getLoggedInUser } from "./auth";

import { useNavigate } from "react-router-dom";
 
function RidicHomePage() {

    const user = getLoggedInUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!((user && user.role === 'ridic') || (user && user.role === 'admin'))) {
            navigate('/UzivatelHomePage');
        }
    }, []); 

    return (   
        <div className="bodywrapper">
            <div className="contentwrapper">
                <MainPanel linkTo="/RidicHomePage"></MainPanel>

                <FlexibleButton text ="Seznam nadcházejících spojů" href="/RidicZobrazeniSpoje"></FlexibleButton>
                <FlexibleButton text ="Nahlásit závadu vozidla" href="/RidicNahlasitZavadu"></FlexibleButton>
                <FlexibleButton text ="Vyhledat spoj" href="/UzivatelHomePage"></FlexibleButton>

                <FooterPanel></FooterPanel>
            </div>
        </div>
    );
};
 
export default RidicHomePage;