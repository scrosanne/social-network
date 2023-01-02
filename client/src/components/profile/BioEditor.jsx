import { useState, useEffect } from "react";

export default function BioEditor() {
    //stages: "add", "save", "edit"
    const [mode, setMode] = useState("edit");
    const [newBio, setNewBio] = useState("");
    const [error, setError] = useState(false);

    const bioInputChange = (e) => {
        setNewBio(e.target.value);
    };

    //when save button gets pressed, puts newBio into db
    const saveNewBio = () => {
        fetch("/bio", {
            method: "POST",
            body: JSON.stringify({ newBio }),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                if (res[0].bio) {
                    setMode("edit");
                } else {
                    setError(true);
                }
            });
    };

    //get bio from db with reload
    useEffect(() => {
        fetch("/user/data.json")
            .then((res) => res.json())
            .then((userData) => {
                if (userData) {
                    //"success true"
                    setNewBio(userData.bio);
                } else {
                    //"success false"
                    setError(true);
                }
            });
    }, []);

    return (
        <>
            {error === true && <p>oh ups!</p>}
            {mode === "add" && (
                <div className="bio">
                    <button onClick={() => setMode("save")}>
                        add your bio now
                    </button>
                </div>
            )}

            {mode === "save" && (
                <div className="bio">
                    <textarea
                        name="bio"
                        id="bio"
                        cols="15"
                        rows="3"
                        value={newBio}
                        onChange={(e) => bioInputChange(e)}
                    ></textarea>
                    <button onClick={() => saveNewBio()}>save</button>
                </div>
            )}

            {mode === "edit" && (
                <div className="bio">
                    <p>{newBio}</p>
                    <button onClick={() => setMode("save")}>edit</button>
                </div>
            )}
        </>
    );
}
