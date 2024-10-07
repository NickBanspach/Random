import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ColorToggle, CoreProvider, MainCard } from "./components";
import type { ReactElement } from "react";
import { Admin } from "./pages";

const App = (): ReactElement => {
  return (
    <>
      <CoreProvider>
        <ColorToggle />
        <Router>
          <Routes>
            <Route path="/" element={<MainCard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CoreProvider>
    </>
  );
};

export default App;
