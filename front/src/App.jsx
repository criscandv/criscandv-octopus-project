import React, { Suspense, useState, lazy } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import { Box } from "@chakra-ui/react";

// Import views
const Home = lazy(() => import("./views/Octopus/Home"));
const Chat = lazy(() => import("./views/Octopus/Chat"));

function App() {
  const [count, setCount] = useState(0);

  return (
    <Box>
      <Suspense fallback={<h1>Hola</h1>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Suspense>
    </Box>
  );
}

export default App;
