import React, { useEffect, useState } from "react";
import './stylesheet.css'

import { useParams } from "react-router-dom";

import { useNavigate } from 'react-router-dom';

import { MainPanel , FooterPanel } from "./components";

import { getLoggedInUser } from "./auth";
 
function TechnikUpravitZaznam() {

    const redirect = useNavigate();

    const user = getLoggedInUser();

    const { zaznamid } = useParams();
        
    const [missingFields, setMissingFields] = useState([]);

    const [records, setRecords] = useState([]);

    const [descr, setDescr] = useState('');
    const [typzaznamu, setTypzaznamu] = useState('');
    const [stav, setStav] = useState(false);

    useEffect(() => {
        const fetchData = async (id) => {
        try {
            const response = await fetch(`http://localhost/IIS-ITU/enquiries/Servisnizaznamy.php?action=getRecord&id=${id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setRecords(result.records);
            console.log(result);
            setDescr(result.records ? result.records.popis : '');
            setTypzaznamu(result.records ? result.records.typ : '');
            setStav(result.records ? result.records.vyreseny == '1' : false);
        } catch (error) {
            console.error('Error fetching vehicle:', error);
        }
        };
        if ((user && user.role === 'technik') || (user && user.role === 'admin')) {
            fetchData(zaznamid);
        } else {
            redirect('/UzivatelHomePage');
        }
    }, [zaznamid]);

    
    const editRecord = async (recordData) => {
        try {
            const response = await fetch('http://localhost/IIS-ITU/enquiries/Servisnizaznamy.php?action=editRecord', {method: 'POST', 
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(recordData),
            });
      
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
      
            const result = await response.json();
      
            if (result.success) {
                console.log('Record edited:', result.person);
                alert("Záznam byl upraven");
                redirect(records ? `/TechnikDetail/${records.id_vozidlo}` : `/TechnikHomePage` );
            } 
            else {
                console.error('Error changing record:', result.error);
                alert(result.error);
            }
        } catch (error) {
          console.error('Error:', error.message);
        }
    };

    const ukony = ['údržba', 'STK', 'oprava'];

    const handleSubmit = (e) => {
        e.preventDefault();
        const requiredFields = ["typZaznamu"];
        const missingFields = requiredFields.filter(field => !eval(field));
    
        if (missingFields.length > 0) {
            setMissingFields(missingFields);
    
            setTimeout(() => {
                setMissingFields([]);
            }, 1000);
        }
        else {
            editRecord({
                'popis': descr,
                'datum': records ? ( records.datum ) : (''),
                'typ': typzaznamu,
                'vyreseny': stav ? ( '1' ) : ( '0' ),
                'id_vozidlo': records ? ( records.id_vozidlo ) : (''),
                'id_uzivatel': user.id ,
                'id_zaznam' : records ? ( records.id_zaznam ) : ('')
            });
        }

    };
    
    const isFieldMissing = (fieldName) => missingFields.includes(fieldName);

    return (
        <div className="bodywrapper">
            <div className="technikupravitzaznam">

                <MainPanel linkTo="/TechnikHomePage"></MainPanel>

                <div className="contentwrapper">
                    <h2>Technická správa vozového parku</h2>

                    <div>
                        <h2>Upravit záznam:</h2>
                        <form className="recordformnew" onSubmit={handleSubmit}>
                        <div className={`${isFieldMissing("typZaznamu") ? "missing" : ""}`}>
                            <label htmlFor="typZaznamu">Typ záznamu:</label>
                            <select
                            id="typZaznamu"
                            value={typzaznamu}
                            onChange={(e) => setTypzaznamu(e.target.value)}>
                            {ukony.map((ukon, index) => (
                                <option key={index} value={ukon}>
                                {ukon}
                                </option>
                            ))}
                            </select>
                        </div>
                        <label>
                        <input
                            type="checkbox"
                            checked={stav}
                            onChange={() => setStav(!stav)}
                            />
                            Servis vyřízen
                            </label>
                        <label className={`${isFieldMissing("descr") ? "missing" : ""}`}>Popis:</label>
                            <input
                                type="text"
                                value={descr}
                                onChange={(e) => setDescr(e.target.value)}
                            />
                            <br />
                        <button type="submit">Potvrdit</button>
                        </form>
                    </div>

                </div>

                <FooterPanel></FooterPanel>

            </div>
        </div>
    );
};
 
export default TechnikUpravitZaznam;