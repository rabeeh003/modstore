import { useState } from 'react'
import './App.css'
import { useSelector } from 'react-redux';
import UserNavbar from './pages/user/components/UserNavbar';
import Home from './pages/user/Home';
import { Route, Routes } from 'react-router-dom';
import PostPage from './pages/user/PostPage';

function App() {
  const them = useSelector(state => state.them.currentThem)

  return (
    <div className={`${them} h-full min-h-[100vh] bg-background text-foreground`}>
      <Routes>
        <Route path='/' element={<UserNavbar />}>
          <Route index element={<Home />}/>
          <Route path='/appid' element={<PostPage/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
