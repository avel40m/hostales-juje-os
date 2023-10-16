import Cookies from 'js-cookie'
import { createContext, useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { getUser } from './apis/user'
import { Dashboard } from './pages/Admin/Dashboard/Dashboard'
import { DetailsAddHostal } from './pages/Admin/Details/DetailsAddHostal'
import { DetailsHostal } from './pages/Admin/Hostal/DetailsHostal'
import { FormAddHostal } from './pages/Admin/Hostal/FormAddHostal'
import { Bookings as Reservas } from './pages/Admin/Bookings/Bookings'
import { Hostal } from './pages/Admin/Hostal/Hostal'
import { Users } from './pages/Admin/Users/Users'
import { Bookings } from './pages/CLIENT/Bookings'
import { Profile } from './pages/CLIENT/Profile'
import { Details } from './pages/Details'
import { Login } from './pages/Login'
import { ProtectedAdmin } from './pages/ProtectedAdmin'
import { ProtectedRouter } from './pages/ProtectedRouter'
import { Register } from './pages/Register'
import { Welcome } from './pages/Welcome'
import { CreateProfile } from './pages/CLIENT/CreateProfile'
import { EditProfile } from './pages/CLIENT/EditProfile'
import { Places } from './pages/Places'
import { Pays } from './pages/Admin/Pays/Pays'
import {AnimatePresence} from 'framer-motion';

export const UserContext = createContext({});
function App() {
  const cookie = Cookies.get();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const location = useLocation()
  useEffect(() => {
    const getToken = async () => {
      const response = await getUser(cookie?.token);
      if (response.status == 200) {
        setUser(response.userdto);
      } else {
        setUser(null);
        navigate('/')
      }
    }
    getToken();
  },[])

  const handleLogout = () => {
    setUser(null);
  }

  return (
    <UserContext.Provider value={{user,handleLogout,setUser}}>
      <AnimatePresence>
    <Routes location={location} key={location.pathname}>
      <Route path='/' element={<Welcome />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/places' element={<Places />} />
      <Route path='/detalles/:id' element={<Details />} />
      <Route path='/' element={<ProtectedRouter />} >
        <Route path='profile' element={<Profile />} />
        <Route path='bookings' element={<Bookings />} />
        <Route path='create-profile' element={<CreateProfile />} /> 
        <Route path='edit-profile' element={<EditProfile />} /> 
      </Route>
      <Route path='/' element={<ProtectedAdmin />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='users' element={<Users />} />
        <Route path='hostal' element={<Hostal />} />
        <Route path='reservas' element={<Reservas />} />
        <Route path='reservas/:id/pago' element={<Pays />} />
        <Route path='agregar-hostal' element={<FormAddHostal />} />
        <Route path='detalles-hostal/:id' element={<DetailsHostal />} />
        <Route path='add-details/:id' element={<DetailsAddHostal />} />
      </Route>
    </Routes>
      </AnimatePresence>
    </UserContext.Provider>
  )
}


export default App
