import React, { useEffect, useState } from "react";
import './stylesheet.css'

import { useParams } from "react-router-dom";

import { useNavigate } from 'react-router-dom';

import { MainPanel , FooterPanel } from "./components";

import { getLoggedInUser } from "./auth";
 
function TechnikNovyZaznam() {
    const user = getLoggedInUser();

    const redirect = useNavigate();

    useEffect(() => {
        if (!(user && user.role === 'technik') && !(user && user.role === 'admin')) {
            redirect('/UzivatelHomePage');
        }
    }, []);

    const { vozidloid } = useParams();

    const [descr, setDescr] = useState('');
    const [typzaznamu, setTypzaznamu] = useState('');
    const [stav, setStav] = useState('0');
        
    const [missingFields, setMissingFields] = useState([]);
    
    const addNewRecord = async (recordData) => {
        try {
            const response = await fetch('http://localhost/IIS-ITU/enquiries/Servisnizaznamy.php?action=addNewRecord', {method: 'POST', 
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(recordData),
            });
      
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
      
            const result = await response.json();
      
            if (result.success) {
                console.log('Record created:', result.person);
                alert("Nový záznam byl uložen");
                redirect(`/TechnikDetail/${vozidloid}`);
            } 
            else {
                console.error('Error adding record:', result.error);
                alert(result.error);
            }
        } catch (error) {
          console.error('Error:', error.message);
        }
    };
    
    const currentDate = new Date();

    const [date, setDate] = useState(currentDate.toISOString().split('T')[0]);

    const ukony = ['údržba', 'STK', 'oprava'];

    const handleSubmit = (e) => {
        e.preventDefault();
        const requiredFields = ["typzaznamu"];
        const missingFields = requiredFields.filter(field => !eval(field));
    
        if (missingFields.length > 0) {
            setMissingFields(missingFields);
    
            setTimeout(() => {
                setMissingFields([]);
            }, 1000);
        }
        else {
            addNewRecord({
                'popis': descr,
                'datum': date,
                'typ': typzaznamu,
                'vyreseny': stav,
                'id_vozidlo': vozidloid,
                'id_uzivatel': user.id
            });
            setDescr('');
        }

        console.log(vozidloid);
    };
    
    const isFieldMissing = (fieldName) => missingFields.includes(fieldName);

    return (
        <div className="bodywrapper">
            <div className="techniknovyzaznam">

                <MainPanel linkTo="/TechnikHomePage"></MainPanel>

                <div className="contentwrapper">
                    <h2>Technická správa vozového parku</h2>


                    <div>
                        <h2>Nový záznam:</h2>
                        <form className="recordformnew" onSubmit={handleSubmit}>
                        <div className={`${isFieldMissing("typzaznamu") ? "missing" : ""}`}>
                            <label htmlFor="typzaznamu">Typ záznamu:</label>
                            <select
                            id="typzaznamu"
                            value={typzaznamu}
                            onChange={(e) => setTypzaznamu(e.target.value)}>
                            <option value="" disabled hidden>
                                Vybrat typ úkonu...
                            </option>
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
                            checked={stav === '1'}
                            onChange={() => setStav(stav === '1' ? '' : '1')}
                            />
                            Servis vyřízen
                            </label>
                        <label>Popis:</label>
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
 
export default TechnikNovyZaznam;