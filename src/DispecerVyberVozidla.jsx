import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { MainPanel, FooterPanel } from "./components";
import './stylesheet.css';
import { getLoggedInUser } from "./auth";

function DispecerVyberVozidla() {
  const location = useLocation();
  const [vehicles, setVehicles] = useState([]);
  const [id_spoj, setId_spoj] = useState('');
  const navigate = useNavigate();

  const handleItemClick = (vozidlo_id) => {
    navigate(`/DispecerVyberRidice?id_spoj=${id_spoj}&vozidlo_id=${vozidlo_id}`);
    console.log(`Clicked on item with vozidlo_id: ${vozidlo_id}`);
  };

  const user = getLoggedInUser();

    useEffect(() => {
      if (!((user && user.role === 'dispecer') || (user && user.role === 'admin'))) {
          navigate('/UzivatelHomePage');
      }
  }, []);  

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(location.search);
      const id_spojParam = params.get('id_spoj');
      if (id_spojParam) {
        setId_spoj(id_spojParam);
        try {

          const response = await fetch(`http://localhost/IIS-ITU/enquiries/DispecerVyberVozidla.php?action=getVehicles&id_spoj=${id_spoj}`);
  

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  

          const result = await response.json();
          console.log(result);
  
          setVehicles(result.vehicles);
        } catch (error) {
          console.error('Error fetching vehicle:', error);
        }
      }
    };
  
    fetchData();
  }, [location.search, id_spoj]);
  
  return (
    <div className="bodywrapper">
      <div className="vyber_vozidla">
          <MainPanel linkTo="/DispecerHomePage"></MainPanel>
          <div className="contentwrapper">
          <h3>Seznam dostupných vozidel:</h3>
          <span className="tablelistlabels"><label>Typ vozidla</label><label>Značka</label><label>SPZ</label><label>Počet míst</label></span>
          <ul className="tablelistelements">
            
            {vehicles.map(vehicle => (
              <li key={vehicle.id} onClick={() => handleItemClick(vehicle.id)}> 
                <div>
                            <strong>{vehicle.druh}</strong>
                            <p>{vehicle.znacka}</p>
                            <p>{vehicle.spz}</p>
                            <p>{vehicle.pocet_mist}</p>
                            </div></li>
            ))}
          </ul>
          </div>
          <FooterPanel></FooterPanel>

      </div>
    </div>
  );
};

export default DispecerVyberVozidla;