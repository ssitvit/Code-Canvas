import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { Context } from "./components/Context/Context";
import { SpeechProvider } from "@speechly/react-client";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <SpeechProvider appId="92f268bb-f070-45f5-9831-935abdd658b8" language="en-US">
    <Context>
      <App />
    </Context>
  </SpeechProvider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
reportWebVitals();
