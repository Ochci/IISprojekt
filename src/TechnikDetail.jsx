import React, { useEffect, useState } from "react";
import './stylesheet.css'

import { useParams } from "react-router-dom";


import { Link } from 'react-router-dom';

import { MainPanel , FooterPanel } from "./components";

import { getLoggedInUser } from "./auth";

import { useNavigate } from 'react-router-dom';
 
function TechnikDetail() {

    const navigate = useNavigate();

    const user = getLoggedInUser();


    const { vozidloid } = useParams();

    const [vehicle, setVehicle] = useState(null);
    const [records, setRecords] = useState([]);


    useEffect(() => {
        const fetchData = async (id) => {
        try {
            const response = await fetch(`http://localhost/IIS-ITU/enquiries/Spravavozidel.php?action=getVehicle&id=${id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setVehicle(result.vehicle);
            console.log(result);
        } catch (error) {
            console.error('Error fetching vehicle:', error);
        }
        };


        const fetchRecordData = async (id) => {
        try {
            const response = await fetch(`http://localhost/IIS-ITU/enquiries/Servisnizaznamy.php?action=getVehicleRecords&id=${id}`);
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json();
            setRecords(result.records);
            console.log(result);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
        };

        if ((user && user.role === 'technik') || (user && user.role === 'admin')) {
            fetchData(vozidloid);
            fetchRecordData(vozidloid);
        } else {
            navigate('/UzivatelHomePage');
        }
    }, [vozidloid]);

    return (
        <div className="bodywrapper">
            <div className="technikdetail">

                <MainPanel linkTo="/TechnikHomePage"></MainPanel>

                <div className="contentwrapper">
                    <h2>Technická správa vozového parku</h2>

                        {vehicle ? (
                            <div className="vehicledetails">
                            <ul>
                                <li>Typ vozidla:    <label className="listhodnota">{vehicle.druh}</label></li>
                                <li>Název vozidla:  <label className="listhodnota">{vehicle.nazev}</label></li>
                                <li>Značka:         <label className="listhodnota">{vehicle.znacka}</label></li>
                                <li>SPZ:            <label className="listhodnota">{vehicle.spz}</label></li>
                                <li>Počet míst:     <label className="listhodnota">{vehicle.pocet_mist}</label></li>
                                <li>Technický stav: <label className="listhodnota">{vehicle.technicke_parametry}</label></li>
                            </ul>
                            <img src={vehicle.fotografie} alt="Fotka vozidla" />
                            </div>
                        ) : ( <p>Načítání...</p> )}

                    <div className="recordlistwrapper">
                    <div className="headerbuttonwrap">
                        <h3>Seznam servisních záznamů:</h3>
                        <Link to={`/TechnikNovyZaznam/${vozidloid}`}>
                            Přidat nový záznam
                        </Link>
                    </div>
                    <ul className="recordlistelements">
                        {records.map((record) => (
                        <li key={record.id_zaznam}>
                            <span className="recordlistlabels"><label>Typ záznamu</label><label>Stav</label><label>Datum provedení</label><label>Přidal</label></span>
                            
                            <span className="recordlistlabels">
                            <strong>{record.typ}</strong>
                            <p>{record.vyreseny === 1 ? 'Vyřízeno' : 'Nevyřízeno'}</p>
                            <p>{record.datum}</p>
                            <p>{record.jmeno + ' ' + record.prijmeni}</p>
                            </span>
                            
                            <label className="recordnewline recordflushleft">Popis záznamu:</label>
                            <div className="recordnewline">
                            <p>{record.popis}</p>
                            </div>
                            <div className="recordnewline">
                            <Link to={`/TechnikUpravitZaznam/${record.id_zaznam}`}>
                                Upravit
                            </Link>
                            </div>
                        </li>
                        ))}
                    </ul>
                    </div>

                </div>

                <FooterPanel></FooterPanel>

            </div>
        </div>
    );
};
 
export default TechnikDetail;