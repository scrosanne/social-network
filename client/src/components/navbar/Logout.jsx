export default function Logout() {
    const logOut = () => {
        fetch("/logout")
            .then((result) => result.json())
            .then(() => {
                location.replace("/login");
            });
    };

    return (
        <div className="logo" onClick={logOut}>
            ✕
        </div>
    );
}
