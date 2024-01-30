import { Routes, Route, Navigate } from 'react-router-dom';
import Login from 'pages/Login/LoginPage';
import NotFound from 'pages/Notfound';
import Register from 'pages/Register/Register';


export default function AuthRouter() {
  return (
    <Routes>
      
      <Route element={<Login />} path="/login" />
      <Route path="*" element={ <Navigate   to='/login' /> } replace />
      <Route path="/register" element ={<Register/>}/>

    </Routes>
  );
}
