import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { MainPanel, FooterPanel } from './components';
import { getLoggedInUser } from './auth';

function SpojEdit() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id_spoj');
  const nazev = queryParams.get('nazev');
  const [direction, setDirection] = useState(queryParams.get('smer'));
  const [departure_time, setDeparture] = useState(queryParams.get('cas_odjezdu'));
  const [active_days, setDays] = useState(queryParams.get('dny_kdy_jezdi'));
  const [stops_sel, setStopsSel] = useState([]);


  const navigate = useNavigate();
  const user = getLoggedInUser();

    useEffect(() => {
      if (!((user && user.role === 'spravce') || (user && user.role === 'admin'))) {
          navigate('/UzivatelHomePage');
      }
  }, []); 


  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.get(`http://localhost/IIS-ITU/enquiries/SpravaSpojuUpdate.php?action=updateConnection&nazev=${nazev}&id_spoj=${id}&smer=${direction}&cas_odjezdu=${departure_time}&dny_kdy_jezdi=${active_days}`);
        console.log("Response:", response);
        if (response && response.data) {
          alert('Spoj úspěšně aktualizován!');
          navigate('/SpravceSpravaSpoju');
        } else {
          alert('Chyba při aktualizaci spoje.');
        }
     
    } catch (error) {
      alert('Chyba při aktualizaci spoje.');
    }
  };


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

  return (
    <div className="bodywrapper">
      <div className="editspoje">
      <MainPanel linkTo="/SpravceHomePage"></MainPanel>

            <div className="contentwrapper">
                <div className="formularlinky">
                    <h2>Editace spoje</h2>

                    <form onSubmit={handleUpdate}>

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
                        value={departure_time}
                        onChange={(e) => setDeparture(e.target.value)}
                        />
                        </div>

                        <div>
                        <label htmlFor="jizdni_dny">Dny:</label>
                        <input
                        type="text"
                        id="jizdni_dny"
                        value={active_days}
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

export default SpojEdit;
