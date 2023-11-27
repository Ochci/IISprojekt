import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainPanel, FooterPanel } from "./components";
import { getLoggedInUser } from "./auth";

function SpravceSpravaVozidel() {
  const navigate = useNavigate();

  const user = getLoggedInUser();

    useEffect(() => {
      if (!((user && user.role === 'spravce') || (user && user.role === 'admin'))) {
          navigate('/UzivatelHomePage');
      }
  }, []);

  const [vehicles, setVehicles] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost/IIS-ITU/enquiries/GetVehicles.php?action=getVehicles');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
  
      setVehicles(result.vehicles);
    } catch (error) {
      console.error('Error fetching data:', error);

    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  const deleteVehicle = async (vozidlo) => {
    try {
        const response = await fetch(`http://localhost/IIS-ITU/enquiries/SpravaVozidelDelete.php?action=deleteVehicle&id=${vozidlo.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        if (result.message) {
            fetchData();
        } else {
            alert(`Chyba při mazání vozdila.`);
        }
    } catch (error) {
        alert('Chyba při mazání vozidla.');
    }
};
    const navigateToEditPage = (vozidlo) => {
        const queryString = new URLSearchParams({
        id: vozidlo.id,
        nazev: vozidlo.nazev,
        druh: vozidlo.druh,
        spz: vozidlo.spz,
        znacka: vozidlo.znacka,
        fotografie: vozidlo.fotografie,
        pocet_mist: vozidlo.pocet_mist,
        technicke_parametry: vozidlo.technicke_parametry

        }).toString();
    
        navigate(`/VozidloEdit?${queryString}`);
    };


  return (
    <div className="bodywrapper">
      <div className="sprava_vozu">
        
          <MainPanel linkTo="/SpravceHomePage"></MainPanel>
          <div className="contentwrapper">
          <div className="tablelistwrapper">
            <h3>Seznam vozů:</h3>
            <span className="tablelistlabels"><label>SPZ</label><label>Název</label><label>Druh</label><label>Značka</label><label>Počet míst</label><label>Technické parametry</label></span>
            <ul className="tablelistelements">
                {vehicles.map((vozidlo) => (
                <li key={vozidlo.id}>
                    <div>
                    <strong>{vozidlo.spz}</strong>
                    <strong>{vozidlo.nazev}</strong>
                    <strong>{vozidlo.druh}</strong>
                    <strong>{vozidlo.znacka}</strong>
                    <strong>{vozidlo.pocet_mist}</strong>
                    <strong>{vozidlo.technicke_parametry}</strong>

                    </div>
                    <button onClick={() => navigateToEditPage(vozidlo)}>upravit</button>
                    <button onClick={() => deleteVehicle(vozidlo)}>smazat</button>
                    
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

export default SpravceSpravaVozidel;
