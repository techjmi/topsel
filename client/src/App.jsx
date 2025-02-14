import './App.css'
import SignUp from './component/SignUp'
import Login from './component/Login'
import Navbar from './component/Navbar'
import { Route, Routes } from 'react-router-dom'
import Search from './component/Search'
import User from './component/User'

function App() {

  return (
    <>
   <Navbar />
   <Routes>
    <Route path='/' element={<Login />}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/profile' element={<Profil/>}/>
    <Route path='/search' element={<User/>}/>
   </Routes>
     {/* <Login /> */}
    </>
  )
}

export default App
