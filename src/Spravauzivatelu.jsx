import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainPanel, FooterPanel } from "./components";
import { getLoggedInUser } from "./auth";

function Spravauzivatelu() {
  const navigate = useNavigate();

  const [people, setPeople] = useState([]);

  const user = getLoggedInUser();

    useEffect(() => {
      if (!((user && user.role === 'admin'))) {
          navigate('/UzivatelHomePage');
      }
  }, []); 


  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost/IIS-ITU/enquiries/Spravauzivatelu.php?action=getPeople');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      setPeople(result.people);
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 
  const navigateToEditPage = (person) => {
    const queryString = new URLSearchParams({
      id: person.id,
      jmeno: person.jmeno,
      prijmeni: person.prijmeni,
      role: person.role,
    }).toString();
  
    navigate(`/UzivatelEdit?${queryString}`);
  };

  const deletePerson = async (person) => {
    try {
      const response = await fetch(`http://localhost/IIS-ITU/enquiries/Spravauzivatelu.php?action=deletePerson&id=${person.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        console.error('Non-OK response:', response);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
  
      if (isJson) {
        const result = await response.json();
  
        if (result.success) {
          fetchData();
        } else {
          console.error('Error deleting person:', result.error);
          alert('Chyba při mazání uživatele. Zkontrolujte konzoli pro více informací.');
        }
      } else {
        alert('Chyba při mazání uživatele. Zkontrolujte konzoli pro více informací.');
      }
    } catch (error) {
      console.error('Error deleting person:', error);
      alert('Chyba při mazání uživatele. Zkontrolujte konzoli pro více informací.');
    }
  };

  return (
    <div className="bodywrapper">
      <div className="sprava_uzivatelu">
      <MainPanel linkTo="/AdminHomePage"></MainPanel>
        <div className="contentwrapper">
          

          <div className="tablelistwrapper">
            <h3>Seznam uživatelů:</h3>
            <span className="tablelistlabels"><label>Jméno</label><label>Přijmení</label><label>Role</label></span>
            <ul className="tablelistelements">
                {people.map((person) => (
                <li key={person.id}>
                    <div>
                    <strong>{person.jmeno}</strong>
                    <p>{person.prijmeni}</p>
                    <p>{person.role}</p>
                    </div>
                    <button onClick={() => navigateToEditPage(person)}>upravit</button>
                    <button onClick={() => deletePerson(person)}>smazat</button>
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

export default Spravauzivatelu;
