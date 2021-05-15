import React from "react";
import ReactDOM from "react-dom";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { Header, Footer } from "./components";
import "./index.css";
import App from "./App";
import { AppProvider, useMaxApproval } from "./context";

function getLibrary(provider) {
  return new Web3Provider(provider); // this will vary according to whether you use e.g. ethers or web3.js
}

ReactDOM.render(
  <AppProvider>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Header />
      <App />
      <Footer />
    </Web3ReactProvider>
  </AppProvider>,
  document.getElementById("root")
);
