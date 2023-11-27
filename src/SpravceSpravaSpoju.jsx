import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainPanel, FooterPanel } from "./components";
import { getLoggedInUser } from "./auth";

function SpravceSpravaSpoju() {
  const navigate = useNavigate();

  const user = getLoggedInUser();

    useEffect(() => {
      if (!((user && user.role === 'spravce') || (user && user.role === 'admin'))) {
          navigate('/UzivatelHomePage');
      }
  }, []);

  const [connections, setConnections] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost/IIS-ITU/enquiries/SpravaSpoju.php?action=getConnections');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setConnections(result.connections);
    } catch (error) {
      console.error('Error fetching connections:', error);

    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  const deleteConn = async (spoj) => {
    try {
        const response = await fetch(`http://localhost/IIS-ITU/enquiries/SpravaSpojuDelete.php?action=deleteConnection&id_spoj=${spoj.id_spoj}&nazev=${spoj.nazev}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        if (result.message) {
            fetchData();
        } else {
            alert(`Error deleting connection: ${result.error}`);
        }
    } catch (error) {
        alert('Chyba při mazání spoje.');
    }
};
    const navigateToEditPage = (spoj) => {
        const queryString = new URLSearchParams({
        id_spoj: spoj.id_spoj,
        dny_kdy_jezdi: spoj.dny_kdy_jezdi,
        smer: spoj.smer,
        cas_odjezdu: spoj.cas_odjezdu,
        nazev: spoj.nazev

        }).toString();
    
        navigate(`/SpojEdit?${queryString}`);
    };


  return (
    <div className="bodywrapper">
      <div className="sprava_spoju">
        
          <MainPanel linkTo="/SpravceHomePage"></MainPanel>
          <div className="contentwrapper">
          <div className="tablelistwrapper">
            <h3>Seznam spojů:</h3>
            <span className="tablelistlabels"><label>Linka</label><label>Směr</label><label>Čas odjezdu</label><label>Aktivní dny</label></span>
            <ul className="tablelistelements">
                {connections.map((spoj) => (
                <li key={spoj.id_spoj}>
                    <div>
                    <strong>{spoj.nazev}</strong>
                    <strong>{spoj.smer}</strong>
                    <strong>{spoj.cas_odjezdu}</strong>
                    <strong>{spoj.dny_kdy_jezdi}</strong>

                    </div>
                    <button onClick={() => navigateToEditPage(spoj)}>upravit</button>
                    <button onClick={() => deleteConn(spoj)}>smazat</button>
                    
                </li>
                ))}
            </ul>
            </div>

          
        </div>
        <FooterPanel></FooterPanel>
      </div>
    </div>
  );
}

export default SpravceSpravaSpoju;
