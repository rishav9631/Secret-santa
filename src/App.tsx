import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import { ServerAwakening } from "./components/ServerAwakening";
import "./App.css";

function App() {
  const [isServerReady, setIsServerReady] = useState(false);

  return (
    <BrowserRouter>
      {!isServerReady && <ServerAwakening onAwake={() => setIsServerReady(true)} />}
      <div className={!isServerReady ? "hidden" : ""}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
