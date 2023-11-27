import React from "react";
import './stylesheet.css'

import { useParams } from "react-router-dom";

import { MainPanel , NavPanel , FooterPanel } from "./components";
 
function UzivatelVyhledaneSpoje() {

    const { fromLocation, toLocation, date, time, direction } = useParams();

    return (
        <div className="bodywrapper">
            <div className="uzivatelvyhledanespoje">

                <MainPanel linkTo="/UzivatelHomePage"></MainPanel>
                <NavPanel></NavPanel>

                <div className="contentwrapper">
                    
                    <h2>Vyhledane spoje:</h2>

                    <div>
                        <p>Odkud: {fromLocation}</p>
                        <p>Kam: {toLocation}</p>
                        <p>Datum: {date}</p>
                        <p>Čas: {time}</p>
                        <p>Směr: {direction}</p>
                    </div>

                </div>

                <FooterPanel></FooterPanel>
            </div>
        </div>
    );
};
 
export default UzivatelVyhledaneSpoje;