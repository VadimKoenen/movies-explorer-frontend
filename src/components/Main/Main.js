import React, { useState, useEffect } from 'react';
import './Main.css';
import Header from '../Header/Header';
import AboutMe from '../Aboutme/Aboutme';
import Footer from '../Footer/Footer';
import Techs from '../Techs/Tech';
import Promo from '../Promo/Promo';
import Hero from '../Hero/Hero';
import Nav from '../Nav/Nav';

function Main({ isMainPage, isLoggedIn }) {

  return (
    <>
      <Header
        isMainPage={isMainPage}
        isLoggedIn={isLoggedIn}>
      </Header>
      <main className="main">
        <Hero />
        <Nav />
        <Promo />
        <Techs />
        <AboutMe />
      </main>
      <Footer />
    </>
  );
}

export default Main;