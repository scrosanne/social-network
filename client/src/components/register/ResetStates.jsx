import { Link } from "react-router-dom";

const Start = ({ handleInputChange, resetStart }) => {
    return (
        <div className="register">
            <h1>reset pw</h1>
            {/* <div className="error"> </div> */}

            <div className="form-block">
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={(e) => handleInputChange(e)}
                />

                <button onClick={() => resetStart()}>reset</button>
            </div>
        </div>
    );
};

const Verify = ({ handleInputChange, resetVerify }) => {
    return (
        <>
            <div className="register">
                <h1>set new pw</h1>
                {/* <div className="error"> </div> */}

                <div className="form-block">
                    <input
                        type="text"
                        name="code"
                        placeholder="code"
                        onChange={(e) => handleInputChange(e)}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="new password"
                        onChange={(e) => handleInputChange(e)}
                    />

                    <button onClick={() => resetVerify()}>reset</button>
                </div>
            </div>
        </>
    );
};

const Success = () => {
    return (
        <>
            <div className="register">
                <h1>done!</h1>
                <p>
                    go back to &nbsp;
                    <Link to="/login">log in</Link>
                </p>
            </div>
        </>
    );
};

export { Start, Verify, Success };
