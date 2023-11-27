import React, { useEffect, useState } from "react";
import './stylesheet.css'

import { Link } from 'react-router-dom';

import { MainPanel , FooterPanel , NavHome} from "./components";

import { getLoggedInUser } from "./auth";

import { useNavigate } from 'react-router-dom';
 
function TechnikHomePage() {

    const navigate = useNavigate();

    const user = getLoggedInUser();


    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('http://localhost/IIS-ITU/enquiries/Spravavozidel.php?action=getVehicles');

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setVehicles(result.vehicles);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
        };
        if ((user && user.role === 'technik') || (user && user.role === 'admin')) {
            fetchData();
        } else {
            navigate('/UzivatelHomePage');
        }
    }, []);

    return (
        <div className="bodywrapper">
            <div className="technikhomepage">

                <MainPanel linkTo="/TechnikHomePage"></MainPanel>

                <NavHome></NavHome>

                <div className="contentwrapper">
                    <h2>Technická správa vozového parku</h2>

                    <div className="tablelistwrapper">
                    <h3>Seznam vozidel:</h3>
                    <span className="tablelistlabels"><label>Typ vozidla</label><label>Značka</label><label>SPZ</label><label>Stav</label></span>
                    <ul className="tablelistelements">
                        {vehicles.map((vehicle) => (
                        <li key={vehicle.id}>
                            <div>
                            <strong>{vehicle.druh}</strong>
                            <p>{vehicle.znacka}</p>
                            <p>{vehicle.spz}</p>
                            <p>{vehicle.technicke_parametry}</p>
                            </div>
                            <Link to={`/TechnikDetail/${vehicle.id}`}>
                                Detail
                            </Link>
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
 
export default TechnikHomePage;