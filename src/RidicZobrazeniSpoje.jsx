import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainPanel, FooterPanel } from "./components";
import './stylesheet.css';
import {getLoggedInUser} from "./auth";

function RidicZobrazeniSpoje() {
  const [connections, setConnections] = useState([]);
  const user = getLoggedInUser();
  const navigate = useNavigate();

    useEffect(() => {
      if (!((user && user.role === 'ridic') || (user && user.role === 'admin'))) {
          navigate('/UzivatelHomePage');
      }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(`http://localhost/IIS-ITU/enquiries/RidicZobrazeniSpoje.php?action=getConnections&id=${user.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);

        setConnections(result.connections);
      } catch (error) {
        console.error('Error fetching line:', error);
      }
    };
    fetchData();
  }, [user.id]);

  return (
    <div className="bodywrapper">
      <div className="ridic_zobrazeni_spoje">
        <MainPanel linkTo="/RodičHomePage"></MainPanel>
        <div className="contentwrapper">
          


          <h3>Seznam budoucích spojů:</h3>
          <span className="tablelistlabels"><label>Název linky</label><label>Směr</label><label>Dny</label><label>Čas odjezdu</label><label>SPZ vozidla</label><label>Druh vozidla</label></span>

          <ul className="tablelistelements">
            
            {connections.map(connection => (
              <li key={connection.id_spoj}> 
                <div>
                            <p>{connection.nazev}</p>
                            <p>{connection.smer}</p>
                            <p>{connection.dny_kdy_jezdi}</p>
                            <p>{connection.cas_odjezdu}</p>
                            <p>{connection.spz}</p>
                            <p>{connection.druh}</p>
                            </div></li>
            ))}
          </ul>
          </div>
          <FooterPanel></FooterPanel>
        
      </div>
    </div>
  );
}

export default RidicZobrazeniSpoje;
