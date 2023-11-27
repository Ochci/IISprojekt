import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainPanel, FooterPanel } from "./components";
import { getLoggedInUser } from "./auth";

function SpravceSpravaLinek() {
  const navigate = useNavigate();

  const user = getLoggedInUser();

    useEffect(() => {
      if (!((user && user.role === 'spravce') || (user && user.role === 'admin'))) {
          navigate('/UzivatelHomePage');
      }
  }, []); 

  const [lines, setLines] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost/IIS-ITU/enquiries/SpravaLinek.php?action=getLines');
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
  
      setLines(result.lines);
    } catch (error) {
      console.error('Error fetching lines:', error);

    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const deleteLine = async (linka) => {
    try {
        const response = await fetch(`http://localhost/IIS-ITU/enquiries/SpravaLinekDelete.php?action=deleteLine&nazev=${linka.nazev}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        const result = await response.json();

        if (result.message) {
            fetchData();
        } else {
            alert(`Error deleting line`);
        }
    } catch (error) {
        alert('Chyba při mazání linky.');
    }
};
    const navigateToEditPage = (lines) => {
        const queryString = new URLSearchParams({
        nazev: lines.nazev,
        }).toString();
    
        navigate(`/LinkaEdit?${queryString}`);
    };


  return (
    <div className="bodywrapper">
      <div className="sprava_linek">
        <div className="contentwrapper">
          <MainPanel linkTo="/SpravceHomePage"></MainPanel>

          <div className="tablelistwrapper">
            <h3>Seznam linek:</h3>
            <span className="tablelistlabels"><label>Název linky</label></span>
            <ul className="tablelistelements">
                {lines.map((linka) => (
                <li key={linka.nazev}>
                    <div>
                    <strong>{linka.nazev}</strong>
                    </div>
                    <button onClick={() => navigateToEditPage(linka)}>upravit</button>
                    <button onClick={() => deleteLine(linka)}>smazat</button>
                </li>
                ))}
            </ul>
            </div>

          <FooterPanel></FooterPanel>
        </div>
      </div>
    </div>
  );
}

export default SpravceSpravaLinek;
