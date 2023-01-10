// import Logo from "./Logo";
import ProfilePic from "./ProfilePic";
import Logout from "./Logout";

import { Link } from "react-router-dom";

export default function Navbar({ profilePicUrl, openUploader }) {
    return (
        <div className="navbar">
            <div id="nav-title">
                <h1>
                    Swap
                    <br />
                    Lab 🧪
                </h1>
            </div>

            <div id="nav-items">
                {/* <Logo /> */}

                <div className="logo">
                    <h1>
                        <Link to="/users">🔍</Link>
                    </h1>
                </div>

                <div className="logo">
                    <h1>
                        <Link to="/friends">👥</Link>
                    </h1>
                </div>

                <div className="logo">
                    <h1>
                        <Link to="/chat">💬</Link>
                    </h1>
                </div>

                <Logout />

                <ProfilePic
                    openUploader={openUploader}
                    profilePicUrl={profilePicUrl}
                    size="profile-pic"
                />
            </div>
        </div>
    );
}
