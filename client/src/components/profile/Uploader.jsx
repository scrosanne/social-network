export default function Uploader({ closeUploader, uploadImage }) {
    return (
        <div className="modal-uploader">
            <p onClick={() => closeUploader()}>x</p>

            <div className="modal-half-left">
                <button className="btn-upload">choose file</button>
                <input
                    className="input-file"
                    type="file"
                    accept="image/png, image/jpeg"
                />
            </div>

            <div className="modal-half-right">
                <input
                    className="submit-file"
                    type="submit"
                    onClick={() => uploadImage()}
                    value="upload"
                />
            </div>
        </div>
    );
}
