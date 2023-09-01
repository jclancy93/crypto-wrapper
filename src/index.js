import React from "react";
import ReactDOM from "react-dom";
import {
  injectedHooks,
  injected,
  walletconnect,
  walletconnectHooks,
} from "./connectors";
import { Web3ReactProvider } from "@web3-react/core";
import { Header, Footer } from "./components";
import "./index.css";
import App from "./App";
import { AppProvider } from "./context";

ReactDOM.render(
  <AppProvider>
    <Web3ReactProvider
      connectors={[
        [injected, injectedHooks],
        [walletconnect, walletconnectHooks],
      ]}
    >
      <Header />
      <App />
      <Footer />
    </Web3ReactProvider>
  </AppProvider>,
  document.getElementById("root")
);
