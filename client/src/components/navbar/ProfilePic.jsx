export default function ProfilePic({ openUploader, profilePicUrl, size }) {
    return (
        <div onClick={() => openUploader()} className={size}>
            <img src={profilePicUrl} alt="" />
        </div>
    );
}
