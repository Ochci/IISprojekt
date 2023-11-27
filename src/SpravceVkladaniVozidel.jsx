import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { MainPanel, FooterPanel } from "./components";
import { getLoggedInUser } from './auth';

function SpravceVkladaniVozidel() {
  const [spz, setSpz] = useState('');
  const [name, setName] = useState('');
  const [druh, setDruh] = useState('');
  const [znacka, setZnacka] = useState('');
  const [fotografie, setFotografie] = useState('');
  const [pocet_mist, setPocetmist] = useState([]);
  const [technicke_parametry, setTechnickeparametry] = useState([]);

  const navigate = useNavigate();
  const user = getLoggedInUser();

    useEffect(() => {
      if (!((user && user.role === 'spravce') || (user && user.role === 'admin'))) {
          navigate('/UzivatelHomePage');
      }
  }, []); 


  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setDruh(selectedOption);
  };
  
  const isFieldMissing = (field) => {
    return !field.trim();
  };




  const handleInsert = async (e) => {
    e.preventDefault()

    if (isFieldMissing(name)) {
      alert("Pole nesmí být prázdné.");
      return;
    }

    try {
        const response = await axios.get(`http://localhost/IIS-ITU/enquiries/SpravceVytvareniVozidla.php?action=addVehicle&nazev=${name}&spz=${spz}&druh=${druh}&znacka=${znacka}&fotografie=${fotografie}&pocet_mist=${pocet_mist}&technicke_parametry=${technicke_parametry}`);
        console.log('Response:', response);
        if (response && response.data) {
          alert('Vozidlo úspěšně zaevidováno!');
          navigate(`/SpravceHomePage`);
        } else {
          alert('Vozidlo se nepodařilo zaevidovat!');
          console.error('Invalid response format:', response);

        }
      } catch (error) {
        console.error('Error inserting vehicle:', error);
      }
  };

  return (
    <div className="bodywrapper">
      <div className="vytvarenivozidla">
      <MainPanel linkTo="/SpravceHomePage"></MainPanel>

            <div className="contentwrapper">
                <div className="formularlinky">
                    <h2>Zaevidování vozidla</h2>

                    <form onSubmit={handleInsert}>
                        <div>
                        <input
                        type="text"
                        id="spz"
                        placeholder='SPZ'
                        onChange={(e) => setSpz(e.target.value)}
                        />
                        </div>
                        <div>
                        <input
                        type="text"
                        id="nazev"
                        placeholder='Název'
                        onChange={(e) => setName(e.target.value)}
                        />
                        </div>
                        <div>
                        <input
                        type="text"
                        id="znacka"
                        placeholder='Značka'
                        onChange={(e) => setZnacka(e.target.value)}
                        />
                        </div>
                        <div className={`formtuple`}>
                            <select id="druh" value={druh} onChange={handleSelectChange}>
                                <option value="">Vyberte druh</option>
                                <option value="trolejbus">trolejbus</option>
                                <option value="autobus">autobus</option>
                                <option value="tramvaj">tramvaj</option>
                            </select>
                            </div>

                        <div className={`formtuple`}>
                        <input
                        type="text"
                        id="fotografie"
                        placeholder='Fotografie'
                        onChange={(e) => setFotografie(e.target.value)}
                        />
                        </div>

                        <div>
                        <input
                        type="number"
                        id="pocet_mist"
                        placeholder='Počet míst'
                        onChange={(e) => setPocetmist(e.target.value)}
                        />
                        </div>
                        <div>
                        <input
                        type="text"
                        id="technicke_parametry"
                        placeholder='Technické parametry'
                        onChange={(e) => setTechnickeparametry(e.target.value)}
                        />
                        </div>
                        
                        <button type="submit">Zaevidovat</button>
                    </form>
                </div>
            </div>

        <FooterPanel></FooterPanel>
      </div>
    </div>
  );
}

export default SpravceVkladaniVozidel;
