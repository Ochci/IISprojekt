import React, { useEffect, useState } from "react";
import './stylesheet.css'

import { Link } from "react-router-dom";

import { MainPanel , NavPanel , FooterPanel } from "./components";
 
function UzivatelPrehledLinek() {
    const [TransportType, setTransportType] = React.useState('tramvaj');

    const [lines, setLines] = React.useState([]);


    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/enquiries/UzivatelPrehledLinek.php?action=getLinesByVehicle&vehicle=${TransportType}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setLines(result.lines);
            console.log(result);
        } catch (error) {
            console.error('Error fetching vehicle:', error);
        }
    };


    const SelectTransportType = (typ_dopravy) => {
        setTransportType(typ_dopravy);
    };


    useEffect(() => {
        fetchData(TransportType);
    }, [TransportType]);


    return (
        <div className="bodywrapper">
            <div className="uzivatelprehledlinek">

                <MainPanel linkTo="/UzivatelHomePage"></MainPanel>
                <NavPanel></NavPanel>

                <div className="contentwrapper">
                    <h2>Přehled linek</h2>


                    <div className="transportoptions">
                        <button className="transport_option" onClick={() => SelectTransportType('autobus')}>
                            Autobus
                        </button>
                        <button className="transport_option" onClick={() => SelectTransportType('trolejbus')}>
                            Trolejbus
                        </button>
                        <button className="transport_option" onClick={() => SelectTransportType('tramvaj')}>
                            Tramvaj
                        </button>
                    </div>

                    {TransportType && (
                        <div>
                            <h3>Linky pro: {TransportType}</h3>
                        </div>
                    )}

                    <span className="lineslistlegend"><label>Linka:</label><label>Cílová zastávka:</label><label>Podrobnosti:</label></span>

                    <ul className="lineslist">
                        {lines.map((line) => (
                        <li key={line.nazev}>
                            <strong>{line.nazev}</strong>
                            <p>{line.smer}</p>
                            <Link to={`/LinkaDetail/${line.nazev}`}>
                                Detail
                            </Link>
                        </li>
                        ))}
                    </ul>

                </div>

                <FooterPanel></FooterPanel>

            </div>
        </div>
    );
};
 
export default UzivatelPrehledLinek;