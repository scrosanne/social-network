import ProfilePic from "../navbar/ProfilePic";
import BioEditor from "./BioEditor";

export default function Profile({
    firstName,
    lastName,
    profilePicUrl,
    openUploader,
}) {
    return (
        <div className="profile">
            <ProfilePic
                profilePicUrl={profilePicUrl}
                openUploader={openUploader}
                size="profile-pic-big"
            />

            <div className="user-info">
                <h1>
                    {firstName} {lastName}
                </h1>
                <BioEditor />
            </div>
        </div>
    );
}
