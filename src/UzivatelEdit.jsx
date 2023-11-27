import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { MainPanel, FooterPanel } from './components';
import { getLoggedInUser } from './auth';

function UzivatelEdit() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [jmeno, setJmeno] = useState(queryParams.get('jmeno'));
  const [prijmeni, setPrijmeni] = useState(queryParams.get('prijmeni'));

  const [role, setRole] = useState(queryParams.get('role'));

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setRole(selectedOption);
  };

  const navigate = useNavigate();
  const user = getLoggedInUser();

    useEffect(() => {
      if (!((user && user.role === 'admin'))) {
          navigate('/UzivatelHomePage');
      }
  }, []);


  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost/IIS-ITU/enquiries/UzivatelEdit.php?action=updatePerson', {
          id,
          jmeno,
          prijmeni,
          role,
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

      if (response && response.data) {
        if (response.data.hasOwnProperty('user')) {
          console.log('User updated:', response.data.user);
          alert('Uživatel úspěšně aktualizován!');
          navigate('/Spravauzivatelu');
        } else {
          alert('Chyba při aktualizaci uživatele. Zkontrolujte konzoli pro více informací.');
        }
      } else {
        alert('Chyba při aktualizaci uživatele.');
      }
    } catch (error) {
      alert('Chyba při aktualizaci uživatele.');
    }
  };

  return (
    <div className="bodywrapper">
      <div className="clovekedit">
        <MainPanel linkTo="/AdminHomePage"></MainPanel>
        <div className="contentwrapper">
          <div className="formularlinky">
            <h2>Změna údajů</h2>
            <form onSubmit={handleUpdate}>
              <div className={`formtuple`}>
                <label htmlFor="jmeno">Jméno:</label>
                <input type="text" id="jmeno" value={jmeno} onChange={(e) => setJmeno(e.target.value)} />
              </div>
              <div className={`formtuple`}>
                <label htmlFor="prijmeni">Příjmení:</label>
                <input type="text" id="prijmeni" value={prijmeni} onChange={(e) => setPrijmeni(e.target.value)} />
              </div>
              <div className={`formtuple`}>
                <div className={`formtuple`}>
                  <label htmlFor="role">Role:</label>
                  <select id="role" value={role} onChange={handleSelectChange}>
                    <option value="dispecer">Dispečer</option>
                    <option value="ridic">Řidič</option>
                    <option value="spravce">Správce</option>
                    <option value="technik">Technik</option>
                    <option value="admin">Administrátor</option>
                  </select>
                </div>
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

export default UzivatelEdit;
