import React, { createContext, useState } from 'react';
import Parts from './Components/PartsPage/Parts';
import Homepage from './Components/HomePage/Homepage';
import Login from './Components/LoginPage/Login';
import PreviousSelections from './Components/PreviousSelectionsPage/PreviousSelections';
import SignUp from './Components/SignUpPage/SignUp';
import Wishlist from './Components/WishlistPage/Wishlist';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { getSessionStorage } from './Services/LocalStorage';;

function App() {
  const WishlistContext = createContext<any>(null);
  const data = getSessionStorage();

  const [componentType, setComponentType] = useState('PC Component')

  return (
    <WishlistContext.Provider value={data}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage setComponentType={setComponentType}/>} />
          <Route path='/Login' element={<Login />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/Parts' element={<Parts componentType={componentType} setComponentType={setComponentType} />} />
          <Route path='/PreviousSelections' element={<PreviousSelections />} />
          <Route path='/Wishlist' element={<Wishlist />} />
        </Routes>
      </BrowserRouter>
    </WishlistContext.Provider>
  );
}

export default App;
