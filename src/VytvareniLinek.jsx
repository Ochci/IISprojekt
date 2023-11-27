import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from './auth';
import { MainPanel, FooterPanel } from "./components";

function VytvareniLinek() {
  const [name, setName] = useState('');
  
  const isFieldMissing = (field) => {
    return !field.trim();
  };

  const navigate = useNavigate();
  const user = getLoggedInUser();

    useEffect(() => {
      if (!((user && user.role === 'spravce') || (user && user.role === 'admin'))) {
          navigate('/UzivatelHomePage');
      }
  }, []);


  const handleInsert = async (e) => {
    e.preventDefault()
    if (isFieldMissing(name)) {
      alert("Pole název nesmí být prázdné.");
      return;
    }

    try {
        const response = await axios.get(`http://localhost/IIS-ITU/enquiries/VytvareniLinek.php?action=addLine&nazev=${name}`);
      
        if (response && response.data) {
          console.log('Line inserted:', response.data);
          alert('Linka úspěšně vytvořena, nyní vložte zastávky!');
          navigate(`/VkladaniZastavek?nazev=${name}`);
        } else {
          alert("Linka již existuje, zvolte jiný název!");
          console.error('Invalid response format:', response);

        }
      } catch (error) {
        console.error('Error inserting line:', error);
        alert("Linka již existuje, zvolte jiný název!");
      
        if (error.response && error.response.data) {
          console.error('Server error:', error.response.data);
        } else {
          console.error('Unknown error:', error.message);
        }
      }
  };

  return (
    <div className="bodywrapper">
      <div className="vytvarenilinky">
      <MainPanel linkTo="/SpravceHomePage"></MainPanel>

            <div className="contentwrapper">
                <div className="formularlinky">
                    <h2>Vytvoření linky</h2>

                    <form onSubmit={handleInsert}>
                        <div className={`formtuple`}>
                        <label htmlFor="name">Název:</label>
                        <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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

export default VytvareniLinek;
