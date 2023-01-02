import { createRoot } from "react-dom/client";
import Welcome from "./components/register/Welcome";
import App from "./components/app/App";

// * * * * * * * * * * * * r e d u x * * * * * * * * * * * *
import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./redux/rootReducer.js";
import { Provider } from "react-redux";

import { init } from "./socket";

const root = createRoot(document.querySelector("main"));

//global redux store
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

fetch("/user/id.json")
    .then((res) => res.json())
    .then((response) => {
        //if userId comes from session on the server, means user is signed in
        if (response.userId) {
            init(store); //initialize socket connection
            root.render(
                <Provider store={store}>
                    <App />
                </Provider>
            );
            // // root.render(<App />);
        } else {
            root.render(<Welcome />);
        }
    });

root.render(<Welcome />);
