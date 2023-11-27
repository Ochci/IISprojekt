import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { MainPanel, FooterPanel } from './components';
import { getLoggedInUser } from './auth';

function VozidloEdit() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [nazev, setNazev] = useState(queryParams.get('nazev'));
  const [spz, setSpz] = useState(queryParams.get('spz'));
  const [druh, setDruh] = useState(queryParams.get('druh'));
  const [znacka, setZnacka] = useState(queryParams.get('znacka'));
  const [fotografie, setFotografie] = useState(queryParams.get('fotografie'));
  const [pocet_mist, setPocetmist] = useState(queryParams.get('pocet_mist'));
  const [technicke_parametry, setTechnickeparametry] = useState(queryParams.get('technicke_parametry'));


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


  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.get(`http://localhost/IIS-ITU/enquiries/SpravaVozidelUpdate.php?action=updateVehicle&nazev=${nazev}&id=${id}&spz=${spz}&druh=${druh}&znacka=${znacka}&fotografie=${fotografie}&pocet_mist=${pocet_mist}&technicke_parametry=${technicke_parametry}`);
        console.log("Response:", response);
        if (response && response.data) {
          alert('Vozidlo úspěšně aktualizováno!');
          navigate('/SpravceSpravaVozidel');
        } else {
          alert('Chyba při aktualizaci vozidla.');
        }
     
    } catch (error) {
      alert('Chyba při aktualizaci vozidla.');
    }
  };


  return (
    <div className="bodywrapper">
      <div className="editvozidla">
      <MainPanel linkTo="/SpravceHomePage"></MainPanel>

            <div className="contentwrapper">
                <div className="formularlinky">
                    <h2>Editace vozidla</h2>

                    <form onSubmit={handleUpdate}>

                    <div>
                        <input
                        type="text"
                        id="spz"
                        value={spz}
                        onChange={(e) => setSpz(e.target.value)}
                        />
                        </div>
                        <div>
                        <input
                        type="text"
                        id="nazev"
                        value={nazev}
                        onChange={(e) => setNazev(e.target.value)}
                        />
                        </div>
                        <div>
                        <input
                        type="text"
                        id="znacka"
                        value={znacka}
                        onChange={(e) => setZnacka(e.target.value)}
                        />
                        </div>
                        <div className={`formtuple`}>
                            <select id="druh" value={druh} onChange={handleSelectChange}>
                                <option value="autobus">autobus</option>
                                <option value="trolejbus">trolejbus</option>
                                <option value="tramvaj">tramvaj</option>
                            </select>
                            </div>

                        <div className={`formtuple`}>
                        <input
                        type="text"
                        id="fotografie"
                        value={fotografie}
                        onChange={(e) => setFotografie(e.target.value)}
                        />
                        </div>

                        <div>
                        <input
                        type="number"
                        id="pocet_mist"
                        value={pocet_mist}
                        onChange={(e) => setPocetmist(e.target.value)}
                        />
                        </div>
                        <div>
                        <input
                        type="text"
                        id="technicke_parametry"
                        value={technicke_parametry}
                        onChange={(e) => setTechnickeparametry(e.target.value)}
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

export default VozidloEdit;
