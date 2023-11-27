import React, {useEffect} from "react";

import { MainPanel , FooterPanel, FlexibleButton} from "./components";

import { getLoggedInUser } from "./auth";

import { useNavigate } from "react-router-dom";
 
function SpravceHomePage() {


  const user = getLoggedInUser();
  const navigate = useNavigate();

    useEffect(() => {
        if (!((user && user.role === 'spravce') || (user && user.role === 'admin'))) {
            navigate('/UzivatelHomePage');
        }
    }, []);

    return (
        <div className="bodywrapper">

            <MainPanel linkTo="/SpravceHomePage"></MainPanel>
                <div className="contentwrapper">

                    

                    <FlexibleButton text="Vytvořit linku" href="/VytvareniLinek"></FlexibleButton>
                    <FlexibleButton text ="Spravovat linky" href="/SpravceSpravaLinek"></FlexibleButton>
                    <FlexibleButton text ="Vložit čas mezi zastávkami" href="/VkladaniCasu"></FlexibleButton>
                    <FlexibleButton text ="Vytvořit spoj" href="/Vytvarenispoju"></FlexibleButton>
                    <FlexibleButton text ="Spravovat spoje" href="/SpravceSpravaSpoju"></FlexibleButton>
                    <FlexibleButton text ="Vkládání vozidel" href="/SpravceVkladaniVozidel" ></FlexibleButton>
                    <FlexibleButton text ="Správa vozidel" href="/SpravceSpravaVozidel" ></FlexibleButton>
                    <FlexibleButton text ="Naplánovat údržbu vozidla" href="/SpravceNaplanujUdrzbu" ></FlexibleButton>
                    
                </div>   
            <FooterPanel></FooterPanel>
        </div>
    );
};

export default SpravceHomePage;