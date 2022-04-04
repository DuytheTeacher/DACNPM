import {Route, BrowserRouter, Routes} from "react-router-dom";

import {HomePage} from "./components/pages/HomePage";
import {SuperAdminLayout, SuperAdminLoginPage, SuperAdminRegister} from "./components/pages";

import "./App.css";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route exact path="/" element={<HomePage/>}/>
              <Route path="super-admin" element={<SuperAdminLayout/>}>
                  <Route path="login" element={<SuperAdminLoginPage />}/>
                  <Route path="register" element={<SuperAdminRegister />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
