import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesList from '../MoviesList/MoviesList';


function Movies({ isMainPage, isLoggedIn, isLoading, isMoviePage }) {

  return (
    <>
      <Header
        isMainPage={isMainPage}
        isLoggedIn={isLoggedIn}>
      </Header>
      <main className="movies">
        <SearchForm />
        {isLoading ? <Preloader />
          : <MoviesList
          isMoviePage={isMoviePage}
             />}
      </main>
      <Footer />
    </>
  );
}

export default Movies;