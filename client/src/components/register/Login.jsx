import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [error, setError] = useState("");
    const [input, setInput] = useState({});

    const handleInputChange = (e) => {
        const text = e.currentTarget.value;
        setInput({
            ...input,
            [e.currentTarget.name]: text, //grab input element and add with propertyname to state object
        });
    };

    const handleSubmit = () => {
        //fetch POST request to the server's registration route
        fetch("/login", {
            method: "POST",
            body: JSON.stringify({ input }), //stringify object with form input
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.success === true) {
                    //function that gets friends state in redux
                    location.replace("/");
                } else {
                    setError("pls try again");
                }
            });
    };

    return (
        <div className="register">
            <h1>log in</h1>
            <p>{error}</p>

            <div className="form-block">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={(e) => handleInputChange(e)}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => handleInputChange(e)}
                />

                <button onClick={() => handleSubmit()}>Log in</button>
                <p>
                    forgot password? &nbsp;
                    <Link to="/reset">reset</Link>
                </p>
            </div>
        </div>
    );
}
