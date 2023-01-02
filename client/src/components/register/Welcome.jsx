import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Reset from "./Reset";
import Logo from "../navbar/Logo";

export default function Welcome() {
    return (
        <>
            {/* <Logo /> */}

            <div className="welcome-container">
                <div className="welcome-left">
                    <h1>
                        SWAP<br></br>&nbsp;&nbsp;LAB
                    </h1>
                    <p>
                        <b>free your stuff</b> <br></br> among friends and
                        family
                    </p>
                </div>

                <div className="welcome-right">
                    <BrowserRouter>
                        <Routes>
                            <Route
                                exact
                                path="/"
                                element={<Register />}
                            ></Route>
                            <Route path="/login" element={<Login />}></Route>
                            <Route path="/reset" element={<Reset />}></Route>
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </>
    );
}
