import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import DispecerHomePage from "./DispecerHomePage";

import UzivatelHomePage from "./UzivatelHomePage";

import UzivatelPrehledLinek from "./UzivatelPrehledLinek";

import UzivatelVyhledaneSpoje from "./UzivatelVyhledaneSpoje";

import TechnikHomePage from "./TechnikHomePage";

import AdminHomePage from "./AdminHomePage";

import Spravauzivatelu from "./Spravauzivatelu";

import SpravceHomePage from "./SpravceHomePage";

import RidicHomePage from "./RidicHomePage";

import RidicNahlasitZavadu from "./RidicNahlasitZavadu";

import RidicZobrazeniSpoje from "./RidicZobrazeniSpoje";

import TechnikDetail from "./TechnikDetail";

import VytvareniLinek from "./VytvareniLinek";

import DispecerVyberSpoje from "./DispecerVyberSpoje";

import VkladaniZastavek from "./VkladaniZastavek";

import LoginPage from "./LoginPage";

import DispecerVyberVozidla from "./DispecerVyberVozidla";

import UcetPage from "./UcetPage";

import UzivatelEdit from "./UzivatelEdit";

import DispecerVyberRidice from "./DispecerVyberRidice";

import LinkaDetail from "./LinkaDetail";

import SpravceNaplanujUdrzbu from "./SpravceNaplanujUdrzbu";

import TechnikNovyZaznam from "./TechnikNovyZaznam";

import SpravceSpravaLinek from "./SpravceSpravaLinek";

import SpravceSpravaSpoju from "./SpravceSpravaSpoju";

import TechnikUpravitZaznam from "./TechnikUpravitZaznam";

import LinkaEdit from "./LinkaEdit";

import VytvareniSpoju from "./Vytvarenispoju";

import SpojEdit from "./SpojEdit";

import SpravceVkladaniVozidel from "./SpravceVkladaniVozidel";

import SpravceSpravaVozidel from "./SpravceSpravaVozidel";

import VozidloEdit from "./VozidloEdit";

import LinkaZastavkaEdit from "./LinkaZastavkaEdit";

import VkladaniCasu from "./VkladaniCasu";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route
						exact
						path="/"
						element={<UzivatelHomePage />}
					/>
					<Route
						path="/DispecerHomePage"
						element={<DispecerHomePage />}
					/>
					<Route
						path="/DispecerVyberSpoje"
						element={<DispecerVyberSpoje />}
					/>
					<Route
						path="/DispecerVyberVozidla"
						element={<DispecerVyberVozidla />}
					/>
					<Route
						path="/DispecerVyberRidice"
						element={<DispecerVyberRidice />}
					/>
					<Route
						path="/UzivatelHomePage"
						element={<UzivatelHomePage />}
					/>
					<Route
						path="/UzivatelPrehledLinek"
						element={<UzivatelPrehledLinek />}
					/>
					
					<Route
						path="/UzivatelVyhledaneSpoje/:fromLocation/:toLocation/:date/:time/:direction"
						element={<UzivatelVyhledaneSpoje />}
					/>
					<Route
						path="/TechnikHomePage"
						element={<TechnikHomePage />}
					/>
					<Route
						path="/AdminHomePage"
						element={<AdminHomePage />}
					/>
					<Route
						path="/Spravauzivatelu"
						element={<Spravauzivatelu />}
					/>
					<Route
						path="/SpravceHomePage"
						element={<SpravceHomePage />}
					/>
					<Route
						path="/SpravceNaplanujUdrzbu"
						element={<SpravceNaplanujUdrzbu />}
					/>
					<Route
						path="/RidicHomePage"
						element={<RidicHomePage />}
					/>
					<Route
						path="/RidicNahlasitZavadu"
						element={<RidicNahlasitZavadu />}
					/>
					<Route
						path="/RidicZobrazeniSpoje"
						element={<RidicZobrazeniSpoje />}
					/>
					<Route
						path="/TechnikDetail/:vozidloid"
						element={<TechnikDetail />}
					/>
					<Route
						path="/VytvareniLinek"
						element={<VytvareniLinek />}
					/>
					<Route
						path="/VkladaniZastavek"
						element={<VkladaniZastavek />}
					/>
					<Route
						path="/LoginPage"
						element={<LoginPage />}
					/>
					<Route
						path="/UcetPage"
						element={<UcetPage />}
					/>
					<Route
						path="/UzivatelEdit"
						element={<UzivatelEdit />}
					/>
					<Route
						path="/LinkaDetail/:nazevlinky"
						element={<LinkaDetail />}
					/>
					<Route
						path="/TechnikNovyZaznam/:vozidloid"
						element={<TechnikNovyZaznam />}
					/>
					<Route
						path="/SpravceSpravaLinek"
						element={<SpravceSpravaLinek />}
					/>
					<Route
						path="/SpravceSpravaSpoju"
						element={<SpravceSpravaSpoju />}
					/>
					<Route
						path="/TechnikUpravitZaznam/:zaznamid"
						element={<TechnikUpravitZaznam />}
					/>
					<Route
						path="/LinkaEdit"
						element={<LinkaEdit />}
					/>
					<Route
						path="/Vytvarenispoju"
						element={<VytvareniSpoju />}
					/>
					<Route
						path="/SpojEdit"
						element={<SpojEdit />}
					/>
					<Route
						path="/SpravceVkladaniVozidel"
						element={<SpravceVkladaniVozidel />}
					/>
					<Route
						path="/SpravceSpravaVozidel"
						element={<SpravceSpravaVozidel />}
					/>
					<Route
						path="/VozidloEdit"
						element={<VozidloEdit />}
					/>
					<Route
						path="/LinkaZastavkaEdit"
						element={<LinkaZastavkaEdit />}
					/>

					<Route
						path="/VkladaniCasu"
						element={<VkladaniCasu />}
					/>
					
					<Route
						path="*"
						element={<Navigate to="/UzivatelHomePage" />}
					/>
				</Routes>
			</Router>
		</>
	);
}


export default App;
