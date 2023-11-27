import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { MainPanel, FooterPanel } from "./components";
import { getLoggedInUser } from './auth';

function NaplanovaniUdrzby() {
  const [popis, setPopis] = useState('');

  const [vehicles, setVehicles] = useState([]);
  const [vehicles_sel, setVehiclesSel] = useState([]);

  const currentDate = new Date();
  const [date, setDate] = React.useState(currentDate.toISOString().split('T')[0]);


  const [typ, setSelectedValue] = useState('udrzba');

  
  const navigate = useNavigate();
  const user = getLoggedInUser();

    useEffect(() => {
      if (!((user && user.role === 'spravce') || (user && user.role === 'admin'))) {
          navigate('/UzivatelHomePage');
      }
  }, []);


  const handleInsert = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.get(`http://localhost/IIS-ITU/enquiries/NahlaseniZavady.php?action=addRecord&popis=${popis}&typ=${typ}&datum=${date}&id_vozidlo=${vehicles}`);
      
        if (response && response.data) {
          alert('Plán údržby zaevidován!');
          setPopis(popis);
          navigate(`/SpravceHomePage`);
        } else {
          alert("Chyba při ukládání údržby");
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        console.error('Error inserting record:', error);
        alert("Chyba pri ukladani do databaze");
      
        if (error.response && error.response.data) {
          console.error('Server error:', error.response.data);
        } else {
          console.error('Unknown error:', error.message);
        }
      }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch('http://localhost/IIS-ITU/enquiries/GetVehicles.php?action=getVehicles');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

        setVehiclesSel(result.vehicles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bodywrapper">
      <div className="spravce_naplanuj_udrzbu">
      <MainPanel linkTo="/SpravceHomePage"></MainPanel>

            <div className="contentwrapper">
                <div className="formularlinky">
                    <h2>Nahlášení údržby</h2>

                    <form onSubmit={handleInsert}>
                        
                        {/* POPIS */}
                        <div className={`formtuple`}>
                        <label htmlFor="popis">Popis:</label>
                        <input
                        type="text"
                        id="popis"
                        value={popis}
                        onChange={(e) => setPopis(e.target.value)}
                        />
                        </div>
                            
                            {/* SPZ VOZIDLA*/}
                            <div>
                            <label htmlFor="spz_vozidla">SPZ:</label>
                            <select id="spz_vozidla" value={vehicles} onChange={(e) => setVehicles(e.target.value)}>
                            <option value="">Vyberte SPZ</option>
                            {vehicles_sel.map(vehicle => (
                                <option key={vehicle.id} value={vehicle.id}>
                                {vehicle.spz}
                                </option>
                            ))}
                            </select>
                            </div>



                        <button type="submit">Vytvořit</button>
                    </form>
                </div>
            </div>

        <FooterPanel></FooterPanel>
      </div>
    </div>
  );
}

export default NaplanovaniUdrzby;
