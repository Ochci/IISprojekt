import React, { useEffect, useState } from "react";
import './stylesheet.css'

import { useParams } from "react-router-dom";

import { MainPanel , FooterPanel , NavPanel } from "./components";
 
function LinkaDetail() {
    const { nazevlinky } = useParams();

    console.log(nazevlinky);

    const [linedetails, setLinedetails] = useState([]);


    useEffect(() => {
        const fetchData = async (nazev) => {
        try {
            const response = await fetch(`http://localhost/IIS-ITU/enquiries/UzivatelPrehledLinek.php?action=getLineDetails&nazev=${nazev}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setLinedetails(result.linedetails);
            console.log(result);
        } catch (error) {
            console.error('Error fetching line details:', error);
        }
        };

        fetchData(nazevlinky);
    }, [nazevlinky]);

    return (
        <div className="bodywrapper">
            <div className="linkadetail">

                <MainPanel linkTo="/UzivatelHomePage"></MainPanel>
                <NavPanel></NavPanel>

                <div className="contentwrapper">
                    <h2>Podrobnosti o lince {nazevlinky}:</h2>

                    <div>
                    {linedetails ? (
                        <div>
                        {linedetails.length > 0 ? (
                            <>
                            <p>Linka je provozována ve dnech: {linedetails[0].dny_kdy_jezdi}</p>
                            <ul className="linedetailslist">
                                {linedetails.map((linedetail, index) => (
                                <li key={index}>
                                    <label className="linedetailelement">{linedetail.nazev_momentalni_zastavka}</label>
                                    <label>&rarr;</label>
                                    <label className="linedetailelement">{linedetail.nazev_dalsi_zastavka}</label>
                                    <label className="linedetailelement">Odjezd: {linedetail.cas_odjezdu}</label>
                                </li>
                                ))}
                            </ul>
                            </>
                        ) : (
                            <p>Linka neobsahuje žádné zastávky.</p>
                        )}
                        </div>
                    ) : (
                        <p>Načítání...</p>
                    )}
                    </div>

                </div>

                <FooterPanel></FooterPanel>

            </div>
        </div>
    );
};
 
export default LinkaDetail;