
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import Book  from '../pages/Book';
import BookDetails from '../pages/BookDetails';

function AppRoutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<SignIn />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/home' element={<Home />} />
          <Route path='/book' element={<Book />} />
          <Route path='/book-details' element= {<BookDetails />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRoutes;
