export default function Uploader({ closeUploader, uploadImage }) {
    return (
        <div className="modal-uploader">
            <p onClick={() => closeUploader()}>x</p>
            {/* <h3>change your profile picture</h3> */}
            <input type="file" accept="image/png, image/jpeg" />

            <input type="submit" onClick={() => uploadImage()} value="upload" />
        </div>
    );
}
