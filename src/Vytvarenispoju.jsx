import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from './auth';
import { MainPanel, FooterPanel } from "./components";

function VytvareniSpoje() {
  const [name, setName] = useState('');
  const [direction, setDirection] = useState('');
  const [departure_time, setDeparture] = useState('');
  const [active_days, setDays] = useState('');
  const [lines_sel, setLinesSel] = useState([]);
  const [stops_sel, setStopsSel] = useState([]);
  
  const isFieldMissing = (field) => {
    return !field.trim();
  };

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
        const responseLines = await fetch('http://localhost/IIS-ITU/enquiries/SpravaLinek.php?action=getLines');

        if (!responseLines.ok) {
          throw new Error(`HTTP error! Status: ${responseLines.status}`);
        }
        const resultLines = await responseLines.json();
        console.log(resultLines);

        setLinesSel(resultLines.lines);

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

  const handleInsert = async (e) => {
    e.preventDefault()

    if (isFieldMissing(name)) {
      alert("Pole název nesmí být prázdné.");
      return;
    }

    try {
        const response = await axios.get(`http://localhost/IIS-ITU/enquiries/SpravceVytvareniSpoje.php?action=addConnection&nazev=${name}&smer=${direction}&cas_odjezdu=${departure_time}&dny_kdy_jezdi=${active_days}`);
        console.log('Response:', response);
        if (response && response.data) {
          alert('Spoj úspěšně vytvořen!');
          navigate(`/SpravceHomePage`);
        } else {
          alert('Spoj se nepodařilo vytvořit!');
          console.error('Invalid response format:', response);

        }
      } catch (error) {
        console.error('Error inserting conn:', error);
      }
  };

  return (
    <div className="bodywrapper">
      <div className="vytvarenispoje">
      <MainPanel linkTo="/SpravceHomePage"></MainPanel>

            <div className="contentwrapper">
                <div className="formularlinky">
                    <h2>Vytvoření spoje</h2>

                    <form onSubmit={handleInsert}>
                    <div>
                        <label htmlFor="linka">Název:</label>
                        <select id="linka" value={name} onChange={(e) => setName(e.target.value)}>
                        <option value="">Vyberte linku:</option>
                        {lines_sel.map(line => (
                            <option key={line.nazev} value={line.nazev}>
                            {line.nazev}
                            </option>
                        ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="smer">Směr:</label>
                        <select id="smer" value={direction} onChange={(e) => setDirection(e.target.value)}>
                        <option value="">Vyberte zastávku:</option>
                        {stops_sel.map(stop => (
                            <option key={stop.id_zastavka} value={stop.nazev}>
                            {stop.nazev}
                            </option>
                        ))}
                        </select>
                    </div>

                        <div className={`formtuple`}>
                        <label htmlFor="time">Odjezd:</label>
                        <input
                        type="time"
                        id="cas_odjezdu"
                        onChange={(e) => setDeparture(e.target.value)}
                        />
                        </div>

                        <div>
                        <label htmlFor="jizdni_dny">Dny:</label>
                        <input
                        type="text"
                        id="jizdni_dny"
                        onChange={(e) => setDays(e.target.value)}
                        />
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

export default VytvareniSpoje;
