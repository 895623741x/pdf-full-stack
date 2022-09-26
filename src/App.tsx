import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import Upload from "./pages/upload/Upload";

function App() {
    const [newUserInfo, setNewUserInfo] = useState<Object>({
        profileImages: [],
    });

    const updateUploadedFiles = (files: File[]) => setNewUserInfo({...newUserInfo, profileImages: files});

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route
                path="/upload"
                element={
                    <Upload
                        accept=".jpg,.png,.jpeg"
                        label="Profile Image(s)"
                        multiple
                        updateFilesCb={updateUploadedFiles}
                    />
                }
            />
        </Routes>
    );
}

export default App;
