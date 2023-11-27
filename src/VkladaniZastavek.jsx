import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { MainPanel, FooterPanel } from './components';
import { getLoggedInUser } from './auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function VkladaniZastavek() {
  const location = useLocation();
  const [nazev, setNazev] = useState('');
  const [selectedStops, setSelectedStops] = useState([]);
  const [availableStops, setAvailableStops] = useState([]);

  const navigate = useNavigate();
  const user = getLoggedInUser();

    useEffect(() => {
      if (!((user && user.role === 'spravce') || (user && user.role === 'admin'))) {
          navigate('/UzivatelHomePage');
      }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const nazevParam = params.get('nazev');
    if (nazevParam) {
      setNazev(nazevParam);
    }
    const fetchStops = async () => {
      try {
        const response = await axios.get('http://localhost/IIS-ITU/enquiries/VkladaniZastavek.php?action=getStops');
        if (response && response.data) {
          setAvailableStops(response.data.stops);
        }
      } catch (error) {
        console.error('Error fetching stops:', error);
      }
    };

    fetchStops();
  }, [location.search]);

  const handleAddStop = async (idZastavka) => {
    if (idZastavka === undefined) {
      console.error('Selected stop ID is undefined');
      return;
    }
  
    try {
      const response = await axios.get(`http://localhost/IIS-ITU/enquiries/VkladaniZastavek.php?action=addLineStop&nazev=${nazev}&id_zastavka=${idZastavka}`);
      console.log('Server Response:', response.data);
  
      if (response && response.data) {
        if (response.data.error) {
          console.error('Error adding stop:', response.data.error);
        } else {
          if (Array.isArray(response.data.stop) && response.data.stop.length > 0) {
            const addedStop = response.data.stop[0].nazev;
            setSelectedStops([...selectedStops, addedStop]);
          } else {
            console.error('Error adding stop: Invalid server response format');
          }
        }
      }
    } catch (error) {
      console.error('Error adding stop:', error);
      console.error('Error details:', error.response.data);
    }
  };  
  
  
  return (
    <div className="bodywrapper">
      <div className="vkladanizastavek">
        <MainPanel linkTo="/SpravceHomePage"></MainPanel>
        <div className="contentwrapper">
        <h2>Vkládání zastávek pro linku {nazev}</h2>
        <Link to={`/SpravceHomePage`}>Zpět</Link>
          <div className="formularzastavky">

            <div className="column">
              <h3>Dostupné zastávky:</h3>
              <ul>
                {availableStops.map((stop) => (
                  <li key={stop.id_zastavka} onClick={() => handleAddStop(stop.id_zastavka)}>
                    {stop.nazev}
                  </li>
                ))}
              </ul>
            </div>

            <div className="column">
              <h3>Vybrané zastávky:</h3>
              <ul>
                {selectedStops.map((idZastavka) => (
                  <li key={idZastavka}>{idZastavka}</li>
                ))}
              </ul>
            </div>
          </div>


          

        </div>
        <FooterPanel></FooterPanel>
      </div>
    </div>
  );
}

export default VkladaniZastavek;
