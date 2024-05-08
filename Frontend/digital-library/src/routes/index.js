
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import Book  from '../pages/Book';
import BookDetails from '../pages/BookDetails';
import Bookshelf from '../pages/Bookshelf';
import BookshelfDetails from '../pages/BookshelfDetails';
import Borrowed from '../pages/borrowed';
import Contact from '../pages/Contact';
import Account from '../pages/Account';
import Page404 from '../pages/page404';
import ChangePassword from '../pages/ChangePassword';


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
          <Route path='/bookshelf' element={<Bookshelf /> } />
          <Route path='/bookshelf-details' element={<BookshelfDetails />} />
          <Route path='/borrowed' element={<Borrowed />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/account' element={<Account />} />
          <Route path='/change-password' element={<ChangePassword />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRoutes;
