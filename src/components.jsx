import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import './stylesheet.css'

import { Link} from 'react-router-dom';

import { checkLoginStatus, getLoggedInUser } from './auth';

export const MainPanel = ({ linkTo }) => {

  const isLoggedIn = checkLoginStatus();

  const user = getLoggedInUser();

  return (
    <div className="main_panel">
        <Link to={linkTo} className="main_link"> <h1>Informační systém dopravního podniku</h1> </Link>
        {isLoggedIn ? (
          <Link to="/UcetPage" id="login_button">
            <span id="login_name">{user.jmeno} {user.prijmeni}</span>
          </Link>
          ) : (
          <Link to="/LoginPage" id="login_button">
            Přihlásit se
          </Link>
        )}
    </div>
  );
};

export const FooterPanel = () => {
    return (
        <div className="footer_panel">
        </div>
    );
};

export const NavPanel = () => {
  const [redirectto, setRedirectto] = useState('');

  const user = getLoggedInUser();
  
  useEffect(() => {
    if (user) {
      if (user.role === 'technik') {
        setRedirectto('/TechnikHomePage');
      } else if (user.role === 'ridic') {
        setRedirectto('/RidicHomePage');
      } else if (user.role === 'dispecer') {
        setRedirectto('/DispecerHomePage');
      } else if (user.role === 'spravce') {
        setRedirectto('/SpravceHomePage');
      } else if (user.role === 'admin') {
        setRedirectto('/AdminHomePage');
      } else {
        setRedirectto('');
      }
    }
  }, []);

    return (
        <div className="nav_panel">
            <Link to="/UzivatelPrehledLinek" className="nav_panel_button">Přehled linek</Link>
            {redirectto ? (
              <Link to={`${redirectto}`} className="nav_panel_button nav_panel_button_intern">Vstup do interního systému</Link>
            ) : ''}
        </div>
    );
};

export const NavHome = () => {
  return (
      <div className="nav_panel">
          <Link to="/UzivatelHomePage" className="nav_panel_button">Domovská stránka</Link>
      </div>
  );
};


export const FlexibleButton = ({ text, href}) => {
  const handleClick = () => {
    window.location.href = href;
  };  
  
  return (
      <button className="flexible-button" onClick={handleClick}>
        {text}
      </button>
    );
};
  
FlexibleButton.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
};
