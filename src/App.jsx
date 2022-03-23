import {Route, BrowserRouter, Routes} from "react-router-dom";
import {HomePage} from "./components/pages/HomePage";
import {LoginPage} from "./components/pages/authen/LoginPage";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route exact path="/" element={<HomePage/>}/>
              <Route path="login" element={<LoginPage/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
