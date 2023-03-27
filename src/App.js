import Logo from './Assets/BuildCompLogo.png'
import BestBuilds from './Components/BestBuildsPage/BestBuilds.js';
import Homepage from './Components/HomePage/Homepage';
import Login from './Components/LoginPage/Login';
import PreviousSelections from './Components/PreviousSelectionsPage/PreviousSelections';
import SignUp from './Components/SignUpPage/SignUp';
import Wishlist from './Components/WishlistPage/Wishlist';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/SignUp' element={<SignUp/>}/>
      <Route path='/BestBuilds' element={<BestBuilds/>}/>
      <Route path='/PreviousSelections' element={<PreviousSelections/>}/>
      <Route path='/Wishlist' element={<Wishlist/>}/>
  </Routes>
    </BrowserRouter>

  );
}

export default App;
