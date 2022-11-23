import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, NavLink } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.scss';

import { AccountActivationPage } from './pages/AccountActivationPage';
import { AuthContext } from './components/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { RequireAuth } from './components/RequireAuth';
import { NamesPage } from './pages/NamesPage';
import { Loader } from './components/Loader.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { usePageError } from './hooks/usePageError.js';
import { RequireNonAuth } from './components/RequireNonAuth';
import { nameService } from './services/nameService';
import axios from 'axios';
import { API_URL } from './config';
import { useUnload } from './hooks/useUnload';

function App() {
  const navigate = useNavigate();
  const [error, setError] = usePageError();
  const { isChecked, user, logout, checkAuth } = useContext(AuthContext);

  const [names, setNames] = useState([]);
  console.log(names)
  const namesForLogoutUpdate = names.map((el, i)  => { return {...el, ...{rank : i +1} }})

  // useUnload(async e => {
  //   e.preventDefault();
  //   await axios.put(API_URL,
  //     names.map((el, i)  => { return {...el, ...{rank : i +1} }})
  //   )
  // }) // causes bags with edit functionality 

  useEffect(() => {
    checkAuth();
    nameService.getAll()
    .then(array => setNames(array))
    .catch(error => {
      setError(error.message)
    })
  }, [setError]);


  if (!isChecked) {
    return <Loader />
  }

  return <>
    <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
      <div className="navbar-start">
        <NavLink to="/" className="navbar-item">
          Home
        </NavLink>

        <NavLink to="/names" className="navbar-item">
          Names
        </NavLink>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {user ? (
              <button
                className="button is-light has-text-weight-bold"
                onClick={() => {
                  logout(namesForLogoutUpdate)
                    .then(() => {
                      navigate('/');
                    })
                    .catch((error) => {
                      setError(error.response?.data?.message);
                    });
                }}
              >
                Log out
              </button>
            ) : (
              <>
                <Link to="/sign-up" className="button is-light has-text-weight-bold">
                  Sign up
                </Link>

                <Link to="/login" className="button is-success has-text-weight-bold">
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>

    <main>
      <section className="section">
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="sign-up"
            element={<RegistrationPage />}
          />
          <Route
            path="activate/:activationToken"
            element={<AccountActivationPage />}
          />
          
          <Route path="/" element={<RequireNonAuth />}>
          <Route
            path="login"
            element={<LoginPage />}
          />
          </Route>

          <Route path="/" element={<RequireAuth />}>
            <Route
              path="names"
              element={<NamesPage changeNamesState={setNames} names={names} />}
            />
          </Route>

        </Routes>
      </section>

      {error && <p className="notification is-danger is-light">{error}</p>}
    </main>
  </>
}

export default App;
