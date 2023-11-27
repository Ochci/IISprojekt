import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { MainPanel, FooterPanel } from "./components";
import axios from 'axios';
import './stylesheet.css';
import { getLoggedInUser } from "./auth";

function DispecerVyberRidice() {
  const location = useLocation();
  const [drivers, setDrivers] = useState([]);
  const [id_spoj, setId_spoj] = useState('');
  const [vozidlo_id, setId_vozidlo] = useState('');
  const navigate = useNavigate();

  const user = getLoggedInUser();

  useEffect(() => {
    if (!((user && user.role === 'dispecer') || (user && user.role === 'admin'))) {
        navigate('/UzivatelHomePage');
    }
}, []); 
    
  const handleItemClick = async (driverId) => {
    try {
      const response = await axios.get(`http://localhost/IIS-ITU/enquiries/DispecerVyberRidice.php?action=updateConnection&id_spoj=${id_spoj}&vozidlo_id=${vozidlo_id}&id_uzivatel=${driverId}`);
      if (response.status !== 201) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = response.data;
      console.log(result);
  
      alert("Řidič a vozidlo přirazeni ke spoji")
      navigate(`/DispecerHomePage`);
      console.log(`Clicked on item with id_spoj: ${driverId}`);
    } catch (error) {
      console.error('Error updating connection:', error.message);
      if (error.response && error.response.data) {
        console.error('Server error:', error.response.data);
      }
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
        const params = new URLSearchParams(location.search);
        const id_spojParam = params.get('id_spoj');
        const id_vozidloParam = params.get('vozidlo_id');
        if (id_spojParam && id_vozidloParam) {
          setId_spoj(id_spojParam);
          setId_vozidlo(id_vozidloParam);
          try {
            const response = await fetch(`http://localhost/IIS-ITU/enquiries/DispecerVyberRidice.php?action=getDrivers&id_spoj=${id_spoj}&vozidlo_id=${vozidlo_id}`);
    
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log(result);
    
            setDrivers(result.drivers);
          } catch (error) {
            console.error('Error fetching drivers:', error);
          }
        }
      };

    fetchData();
  }, [id_spoj, location.search, vozidlo_id]);

  return (
    <div className="bodywrapper">
      <div className="vyber_ridice">
        <MainPanel linkTo="/DispecerHomePage"></MainPanel>
        <div className="contentwrapper">
          
          <h3>Seznam dostupných řidičů:</h3>
          <span className="tablelistlabels"><label>Jméno</label><label>Příjmení</label><label>role</label></span>
          <ul className="tablelistelements">
            
            {drivers.map(driver => (
              <li key={driver.id} onClick={() => handleItemClick(driver.id)}> 
                <div>
                            <p>{driver.jmeno}</p>
                            <p>{driver.prijmeni}</p>
                            <p>{driver.role}</p>
                            </div></li>
            ))}
          </ul>
          </div>
          <FooterPanel></FooterPanel>
      </div>
    </div>
  );
}

export default DispecerVyberRidice;
