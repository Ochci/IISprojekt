import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from './auth';
import { MainPanel, FooterPanel } from "./components";

function VkladaniCasu() {
  const [firstStop, setFirstStop] = useState('');
  const [nextStop, setNextStop] = useState('');
  const [time, setTime] = useState('');
  const [stops_sel, setStopsSel] = useState([]);

  const navigate = useNavigate();
  const user = getLoggedInUser();

  useEffect(() => {
    if (!((user && user.role === 'spravce') || (user && user.role === 'admin'))) {
        navigate('/UzivatelHomePage');
    }
}, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseStops = await fetch('http://localhost/IIS-ITU/enquiries/VkladaniZastavek.php?action=getStops');

        if (!responseStops.ok) {
            throw new Error(`HTTP error! Status: ${responseStops.status}`);
          }
  
          const resultStops = await responseStops.json();
          console.log(resultStops);
  
          setStopsSel(resultStops.stops);

        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleClick = () => {
    navigate(`/SpravceHomePage`);
  };

  const handleInsert = async (e) => {
    e.preventDefault()

    try {
        const response = await axios.get(`http://localhost/IIS-ITU/enquiries/CasMeziZastavkami.php?action=addStopTime&id_momentalni_zastavka=${firstStop}&id_dalsi_zastavka=${nextStop}&cas_dalsi_zast=${time}`);
        if (response) {
          alert('Čas úspěšně vložen!');
        } else {
          alert('Nastala chyba, čas mezi zastávkami je možná již určen!');
          console.error('Invalid response format:', response);

        }
      } catch (error) {
        console.error('Error inserting TimeBStops:', error);
      }
  };

  return (
    <div className="bodywrapper">
      <div className="vytvarenispoje">
      <MainPanel linkTo="/SpravceHomePage"></MainPanel>
            <div className="contentwrapper">
            
                <div className="formularlinky">
                
                    <h2>Přidání času mezi zastávkami</h2>
                    <form onSubmit={handleInsert}>

                    

                    <div>
                        <label htmlFor="puvodni_zastavka">Ze zastávky</label>
                        <select id="puvodni_zastavka" value={firstStop} onChange={(e) => setFirstStop(e.target.value)}>
                        <option value="">Vyberte zastávku:</option>
                        {stops_sel.map(stop => (
                            <option key={stop.id_zastavka} value={stop.id_zastavka}>
                            {stop.nazev}
                            </option>
                        ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="dalsi_zastavka">Do zastávky</label>
                        <select id="dalsi_zastavka" value={nextStop} onChange={(e) => setNextStop(e.target.value)}>
                        <option value="">Vyberte zastávku:</option>
                        {stops_sel.map(stop => (
                            <option key={stop.id_zastavka} value={stop.id_zastavka}>
                            {stop.nazev}
                            </option>
                        ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="cas">Čas do další zastávky</label>
                        <input
                        type="number"
                        id="cas"
                        onChange={(e) => setTime(e.target.value)}
                        />
                    </div>

                    <button type="submit">Vytvořit</button>
                    <button onClick={handleClick}>Zpět</button>
                    </form>
                    
                </div>
            </div>
            
        <FooterPanel></FooterPanel>
      </div>
    </div>
  );
}

export default VkladaniCasu;
