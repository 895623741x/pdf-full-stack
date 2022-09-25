import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import Upload from "./pages/upload/Upload";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/upload" element={<Upload />} />
        </Routes>
    );
}

export default App;
