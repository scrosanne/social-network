import { useState, useEffect } from "react";
import { Start, Verify, Success } from "./ResetStates";

//first part truthy go to second and so on ... three different stages
//store info in state as stage --> 1, 2, 3
//no routing within component

//1 email
//2 code + new passoword
//3 success, return to login

//when fetch returns, yes email is found everything good
//in fetch not only code and new passoword also email adress (second state), store email in state

export default function Reset() {
    const [stage, setStage] = useState(0);

    const [input, setInput] = useState({});

    const handleInputChange = (e) => {
        setInput({ ...input, [e.currentTarget.name]: e.currentTarget.value });
    };

    const resetStart = () => {
        console.log("resetStart working");
        //fetch POST request to the server's registration route
        fetch("/password/reset/start", {
            method: "POST",
            body: JSON.stringify({ input }), //stringify object with form input
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.success) {
                    //"success true"
                    setStage("verify");
                } else {
                    //"success false"
                    location.reload();
                    //error message still missing
                }
            });
    };

    const resetVerify = () => {
        fetch("/password/reset/verify", {
            method: "POST",
            body: JSON.stringify({ input }), //stringify object with form input
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((response) => {
                //console.log(response);
                if (response.success) {
                    //"success true"
                    setStage("success");
                } else {
                    //"success false"
                    location.reload();
                    //update state to make error appear, also for catch
                }
            });
    };

    switch (stage) {
        case "start":
            return (
                <Start
                    handleInputChange={handleInputChange}
                    resetStart={resetStart}
                ></Start>
            );
        case "verify":
            return (
                <Verify
                    handleInputChange={handleInputChange}
                    resetVerify={resetVerify}
                ></Verify>
            );
        case "success":
            return <Success></Success>;
        default:
            return (
                <Start
                    handleInputChange={handleInputChange}
                    resetStart={resetStart}
                ></Start>
            );
    }
}

// // export default class Reset extends Component {
// // constructor(props) {
// //     super(props);

// //     this.state = {
// //         // error: true,
// //         stage: 0,
// //     };

// //     this.handleInputChange = this.handleInputChange.bind(this);
// //     this.resetStart = this.resetStart.bind(this);
// //     //this.resetVerify = this.resetVerify.bind(this);
// // }

// // // stores current value in state
// // handleInputChange(e) {
// //     const text = e.currentTarget.value;
// //     this.setState({
// //         [e.currentTarget.name]: text,
// //     });
// // }

// // resetStart() {
// //     console.log("resetStart working");
// //     //fetch POST request to the server's registration route
// //     fetch("/password/reset/start", {
// //         method: "POST",
// //         body: JSON.stringify(this.state), //stringify object with form input
// //         headers: { "Content-Type": "application/json" },
// //     })
// //         .then((res) => res.json())
// //         .then((response) => {
// //             if (response.success) {
// //                 //"success true"
// //                 this.setState({ stage: 2 });
// //             } else {
// //                 //"success false"
// //                 location.reload();
// //                 //error message still missing
// //             }
// //         });
// // }

// resetVerify() {
//     fetch("/password/reset/verify", {
//         method: "POST",
//         body: JSON.stringify(this.state), //stringify object with form input
//         headers: { "Content-Type": "application/json" },
//     })
//         .then((res) => res.json())
//         .then((response) => {
//             //console.log(response);
//             if (response) {
//                 //"success true"
//                 this.setState({ stage: 3 });
//             } else {
//                 //"success false"
//                 location.reload();
//                 //update state to make error appear, also for catch
//             }
//         });
// }

// t e m p l a t e
// render() {
//     switch (this.state.stage) {
//         case 1:
//             return (
//                 <First
//                     handleInputChange={this.handleInputChange}
//                     resetStart={this.resetStart}
//                 ></First>
//             );
//         case 2:
//             return (
//                 <Second
//                     handleInputChange={this.handleInputChange}
//                     resetVerify={this.resetVerify}
//                 ></Second>
//             );
//         case 3:
//             return <Third></Third>;
//         default:
//             return (
//                 <First
//                     handleInputChange={this.handleInputChange}
//                     resetStart={this.resetStart}
//                 ></First>
//             );
//     }
// }
// }
