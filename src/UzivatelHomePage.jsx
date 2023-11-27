import React from "react";
import './stylesheet.css'

import { useNavigate } from "react-router-dom";

import { MainPanel , NavPanel , FooterPanel } from "./components";

import { checkLoginStatus, getLoggedInUser, logoutUser } from './auth';

function UzivatelHomePage() {

    checkLoginStatus();

    return (
        <div className="bodywrapper">
            <div className="uzivatelhomepage">

                <MainPanel linkTo="/UzivatelHomePage"></MainPanel>
                <NavPanel></NavPanel>

                <div className="contentwrapper">
                    <div className="formularspoje">
                        <h2>Vítejte na portálu dopravního podniku</h2>
                        <p>V přehledu linek naleznete všechny informace o našich linkách.</p>
                        <p>Pro více možností je nutné se přihlásit.</p>
                    </div>
                </div>

                <FooterPanel></FooterPanel>
            </div>
        </div>
    );
};
 
export default UzivatelHomePage;