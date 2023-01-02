import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Uploader from "../profile/Uploader";
import Profile from "../profile/Profile";
import FindPeople from "./FindPeople";
import OtherProfile from "./OtherProfile";
import Navbar from "../navbar/Navbar";
import Friends from "../../redux/friends/Friends";
import Chat from "../../redux/chat/Chat";

export default function App() {
    const [isUploaderVisible, setIsUploaderVisible] = useState(false);
    const [userData, setUserData] = useState({
        profilePicUrl: "https://picsum.photos/200",
    });

    const openUploader = () => {
        setIsUploaderVisible(true);
    };

    const closeUploader = () => {
        setIsUploaderVisible(false);
    };

    const uploadImage = () => {
        //use FormData API to send file to the server
        const file = document.querySelector("input[type=file]").files[0];

        const formData = new FormData(); //create FormData instance and append file to it
        formData.append("file", file);

        //send formData instance in POST request
        fetch("/images", {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                return res.json(); //json from "/images" post in server
            })
            .then((result) => {
                setUserData({ ...userData, profilePicUrl: result.url });
                //successfully uploaded, close modal
                closeUploader();
            });
    };

    useEffect(() => {
        fetch("/user/data.json")
            .then((res) => res.json())
            .then((userData) => {
                if (userData) {
                    //"success true"
                    setUserData(userData);
                } else {
                    //"success false"
                    console.log("data load failed");
                }
            });
    }, []);

    return (
        <>
            <BrowserRouter>
                <Navbar
                    openUploader={openUploader}
                    profilePicUrl={userData.profilePicUrl}
                />

                <div className="app">
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={
                                <Profile
                                    firstName={userData.firstName}
                                    lastName={userData.lastName}
                                    profilePicUrl={userData.profilePicUrl}
                                    //for ProfilePic
                                    openUploader={openUploader}
                                />
                            }
                        ></Route>
                        <Route path="/users" element={<FindPeople />}></Route>
                        <Route path="/friends" element={<Friends />}></Route>
                        <Route path="/chat" element={<Chat />}></Route>
                        <Route
                            path="/user/:id"
                            element={<OtherProfile />}
                        ></Route>
                    </Routes>

                    {isUploaderVisible === true && (
                        <Uploader
                            uploadImage={uploadImage}
                            closeUploader={closeUploader}
                        />
                    )}
                </div>
            </BrowserRouter>
        </>
    );
}
