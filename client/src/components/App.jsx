
import AuthPage from "../pages/AuthPage"
import LandingPage from "../pages/LandingPage"
import { Routes, Route } from "react-router-dom"
function App() {
    return (<>
        <Routes>
            <Route path="/auth" element={<AuthPage />}> </Route>
            <Route path="/" element={<LandingPage />}></Route>
        </Routes>
    </>);
}

export default App;