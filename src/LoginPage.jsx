import React, { useEffect, useState } from "react";
import './stylesheet.css'

import { useNavigate } from 'react-router-dom';



const addNewPerson = async (registerData) => {
    try {
        const response = await fetch('http://localhost/IIS-ITU/enquiries/Spravauzivatelu.php?action=addPerson', {method: 'POST', 
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(registerData),
        });
  
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const result = await response.json();
  
        if (result.success) {
            console.log('Person added successfully:', result.person);
            alert("Účet byl úspěšně vytvořen");
        } 
        else {
            console.error('Error adding person:', result.error);
            alert(result.error);
        }
    } catch (error) {
      console.error('Error:', error.message);
    }
};

const Register = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [birth, setBirth] = useState('');
    const [password, setPassword] = useState('');
    
    const [missingFields, setMissingFields] = React.useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const requiredFields = ["name", "email", "password"];
        const missingFields = requiredFields.filter(field => !eval(field));

        if (missingFields.length > 0) {
            setMissingFields(missingFields);

            setTimeout(() => {
                setMissingFields([]);
            }, 1000);
        }
        else {
            addNewPerson({
                'login': email,
                'password': password,
                'role': 'uzivatel',
                'jmeno': name,
                'prijmeni': surname,
                'datum_narozeni': birth
            });
            setName('');
            setSurname('');
            setEmail('');
            setPassword('');
            setBirth('');
        }
    };

    const isFieldMissing = (fieldName) => missingFields.includes(fieldName);
  
    return (
        <div>
            <h2>Registrovat se:</h2>
            <form onSubmit={handleSubmit}>
            <label className={`${isFieldMissing("name") ? "missing" : ""}`}>Jméno:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
            <label className={`${isFieldMissing("surname") ? "missing" : ""}`}>Příjmení:</label>
                <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
                <br />
            <label className={`${isFieldMissing("email") ? "missing" : ""}`}>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
            <label>Datum narození: (nepovinné)</label>
                <input
                    type="date"
                    value={birth}
                    onChange={(e) => setBirth(e.target.value)}
                />
                <br />
            <label className={`${isFieldMissing("password") ? "missing" : ""}`}>Heslo:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
            <button type="submit">Registrovat</button>
            </form>
        </div>
    );
};



function LoginPage() {

    const prev = useNavigate();

    const loginPerson = async (loginData) => {
        try {
            const response = await fetch('http://localhost/IIS-ITU/enquiries/Spravauzivatelu.php?action=loginPerson', {method: 'POST', 
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(loginData),
            });
      
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
      
            const result = await response.json();
      
            if (result.success) {
                console.log('Person logged in successfully:', result.person);
                localStorage.setItem('user', JSON.stringify(result.person));
                if (result.person.role === 'technik') {
                    prev('/TechnikHomePage');
                } else if (result.person.role === 'ridic') {
                    prev('/RidicHomePage');
                } else if (result.person.role === 'dispecer') {
                    prev('/DispecerHomePage');
                } else if (result.person.role === 'spravce') {
                    prev('/SpravceHomePage');
                } else if (result.person.role === 'admin') {
                    prev('/AdminHomePage');
                } else {
                    prev('/UzivatelHomePage');
                }
            } 
            else {
                console.error('Error logging person:', result.error);
                alert(result.error);
            }
        } catch (error) {
          console.error('Error:', error.message);
        }
    };



    const Login = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
    
        const [missingFields, setMissingFields] = React.useState([]);
    
      
        const handleSubmit = (e) => {
            e.preventDefault();
            const requiredFields = ["email", "password"];
            const missingFields = requiredFields.filter(field => !eval(field));
    
            if (missingFields.length > 0) {
                setMissingFields(missingFields);
    
                setTimeout(() => {
                    setMissingFields([]);
                }, 1000);
            }
            else {
                loginPerson({
                    'email': email,
                    'password': password,
                });
            }
        };
        
        const isFieldMissing = (fieldName) => missingFields.includes(fieldName);
    
        return (
            <div>
                <h2>Přihlásit se:</h2>
                <form onSubmit={handleSubmit}>
                <label className={`${isFieldMissing("email") ? "missing" : ""}`}>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                <label className={`${isFieldMissing("password") ? "missing" : ""}`}>Heslo:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                <button type="submit">Přihlásit</button>
                </form>
          </div>
        );
    };



    
    return (
        <div className="bodywrapper">
            <div className="loginpage">
                <Login />
                <Register />
            </div>
        </div>
    );
};

 
export default LoginPage;