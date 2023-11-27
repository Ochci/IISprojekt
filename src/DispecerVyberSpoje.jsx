import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MainPanel, FooterPanel } from "./components";
import { getLoggedInUser } from "./auth";
import './stylesheet.css';

function DispecerVyberSpoje() {
  const [connections, setConnections] = useState([]);
  const navigate = useNavigate();

  const handleItemClick = (id_spoj) => {
    navigate(`/DispecerVyberVozidla?id_spoj=${id_spoj}`);
    console.log(`Clicked on item with id_spoj: ${id_spoj}`);
  };

  const user = getLoggedInUser();

    useEffect(() => {
      if (!((user && user.role === 'dispecer') || (user && user.role === 'admin'))) {
          navigate('/UzivatelHomePage');
      }
  }, []);  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/IIS-ITU/enquiries/DispecerVyberSpoje.php?action=getConnections');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);

        setConnections(result.connections);
      } catch (error) {
        console.error('Error fetching connections:', error);
      }
    };


    fetchData();
  }, []); 

  return (
    <div className="bodywrapper">
      <div className="sprava_uzivatelu">
        <MainPanel linkTo="/DispecerHomePage"></MainPanel>
        <div className="contentwrapper">
          


          <h3>Seznam nepřiřazených linek:</h3>
          <span className="tablelistlabels"><label>Název linky</label><label>Směr</label><label>Dny</label><label>Čas odjezdu</label></span>
          <ul className="tablelistelements">
            
            {connections.map(connection => (
              <li key={connection.id_spoj} onClick={() => handleItemClick(connection.id_spoj)}> 
                <div>
                            <p>{connection.nazev}</p>
                            <p>{connection.smer}</p>
                            <p>{connection.dny_kdy_jezdi}</p>
                            <p>{connection.cas_odjezdu}</p>
                            </div></li>
            ))}
          </ul>
          </div>
          <FooterPanel></FooterPanel>
        
      </div>
    </div>
  );
}

export default DispecerVyberSpoje;
