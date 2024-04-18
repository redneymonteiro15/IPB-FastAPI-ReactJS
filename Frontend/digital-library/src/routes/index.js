
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from '../pages/Home';
import SignIn from '../pages/SignIn';

function AppRoutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<SignIn />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRoutes;
