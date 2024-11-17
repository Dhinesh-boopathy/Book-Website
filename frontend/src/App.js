import React from 'react';
import { BrowserRouter,  Route, Routes } from 'react-router-dom'


//routes and components
import Home from './pages/Home';
import Navbar from "./components/Navbar.js"
import Books from './pages/books.js';
import NewBook from './components/NewBook.js';
import More from './components/More.js';
import About from './pages/about.js';
import Favorite from './pages/Favorite.js';
import Login from './pages/login.js';
import SignUp from './pages/signUp.js';
import MyFiles from './pages/MyFiles.js';



function App() {
  return (
    
    <div className='app'>
      
      <BrowserRouter>
      <Navbar/>
        <div className='pages'>
          <Routes>
            <Route path='/' element = {<Home/>}/>
            <Route path='/about' element ={<About/>}/>
            <Route path='/books' element={<Books/>}/>
            <Route path='/myfiles' element={<MyFiles/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/newbook' element={<NewBook/>}/>
            <Route path='/favorites' element={<Favorite/>}/>
            <Route path='/more' element={<More/>}/>
          </Routes>
        </div>
      
      </BrowserRouter>
    </div>

  );
}

export default App;
