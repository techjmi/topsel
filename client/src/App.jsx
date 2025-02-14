import './App.css'
import SignUp from './component/SignUp'
import Login from './component/Login'
import Navbar from './component/Navbar'
import { Route, Routes } from 'react-router-dom'
import Profile from './component/profile'
import Search from './component/Search'

function App() {

  return (
    <>
   <Navbar />
   <Routes>
    <Route path='/' element={<Login />}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/search' element={<Search/>}/>
   </Routes>
     {/* <Login /> */}
    </>
  )
}

export default App
