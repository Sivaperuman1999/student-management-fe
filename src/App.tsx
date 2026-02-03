import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Box from "@mui/material/Box/Box";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Students from "./pages/Students/Students";

const App = () => {
  const { authUser, isLoggingIn, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoggingIn && !authUser) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      {authUser && <Sidebar />}
      <Routes>
        <Route path="/home" element={authUser ? <Home /> : <Navigate to="/login" />}></Route>
        <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to="/login" />}></Route>
        <Route path="/students" element={authUser ? <Students /> : <Navigate to="/login" />}></Route>
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/home" />}></Route>
        <Route path="*" element={<Navigate to={authUser ? "/home" : "/login"} />}></Route>
      </Routes>
    </div>
  )
}

export default App