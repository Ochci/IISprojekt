import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { MainPanel, FooterPanel } from './components';
import { getLoggedInUser } from './auth';

function LinkaEdit() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const staryNazev = queryParams.get('nazev');
  const [nazev, setNazev] = useState(queryParams.get('nazev'));

  const navigate = useNavigate();

  const user = getLoggedInUser();

    useEffect(() => {
      if (!((user && user.role === 'spravce') || (user && user.role === 'admin'))) {
          navigate('/UzivatelHomePage');
      }
  }, []); 


  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.get(`http://localhost/IIS-ITU/enquiries/SpravaLinekUpdate.php?action=updateLine&nazev=${nazev}&starynazev=${staryNazev}`);
        console.log("Response:", response);
        if (response && response.data) {
          alert('Linka úspěšně aktualizována!');
          navigate(`/LinkaZastavkaEdit?nazev=${nazev}`);
        } else {
          alert('Chyba při aktualizaci linky.');
        }
     
    } catch (error) {
      alert('Chyba při aktualizaci linky.');
    }
  };

  return (
    <div className="bodywrapper">
      <div className="linkaedit">
        <MainPanel linkTo="/SpravceHomePage"></MainPanel>
        <div className="contentwrapper">
          <div className="formularlinky">
            <h2>Změna názvu</h2>
            <form onSubmit={handleUpdate}>
              <div className={`formtuple`}>
                <label htmlFor="nazev">Název:</label>
                <input type="text" id="nazev" value={nazev} onChange={(e) => setNazev(e.target.value)} />
              </div>
              <button type="submit">
                Uložit
              </button>
            </form>
          </div>
        </div>
        <FooterPanel></FooterPanel>
      </div>
    </div>
  );
}

export default LinkaEdit;
