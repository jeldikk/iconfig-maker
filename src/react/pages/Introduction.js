import React from "react";
import { Jumbotron, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useStatusInfo} from "../hooks"

import "./Introduction.css";

// import { channels } from "../../shared";

// const { ipcRenderer, remote } = window.require("electron");

// import {ipcRenderer} from "../App"

// const {remote} = window.require('electron');
// let currentWindow = remote.getCurrentWindow();
// console.log(currentWindow.id);

const Introduction = ({setStatus}) => {

  return (
    <Jumbotron fluid className="h-100">
      <div className="d-flex flex-column h-100">
        <Container className="text-center flex-grow-1">
          <h1 className="font-weight-bold text-monospace">ismartcsv</h1>
          <h3>
            A smart way to work with scientific <code>csv</code>
          </h3>
          <p>
            Esse aute consectetur mollit ex voluptate cupidatat dolore duis ad
            quis do. Voluptate irure do qui officia dolor in proident occaecat
            elit deserunt. Ullamco minim fugiat commodo est laboris occaecat do
            minim aliqua officia laborum do. Ea adipisicing reprehenderit labore
            dolor pariatur. Commodo nulla deserunt voluptate sit ullamco in.
          </p>
          <p>
            Cupidatat et veniam excepteur aliqua eiusmod ut minim adipisicing
            labore proident ipsum nisi ea minim. Est occaecat qui est excepteur
            voluptate Lorem enim nisi velit consectetur velit ad ipsum. Pariatur
            minim voluptate id esse.
          </p>
        </Container>
        <ul className="list-unstyled">
          <li className="mb-3">
            <Link to="/new-file" className="text-decoration-none">
              <Button
                variant="primary"
                size="lg"
                block
                // onClick={()=>setStatusInfo('')}
                {...useStatusInfo("click to Add a New File")}
              >
                Create New File
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/open-file" className="text-decoration-none">
              <Button
                variant="info"
                size="lg"
                block
                {...useStatusInfo("click to edit a file")}
                >
                Open File
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </Jumbotron>
  );
};

// function sendStatusMessage(message) {
//   //   console.log("sendSynchronousMessage is called");
// //   ipcRenderer.sendToHost(channels.SET_STATUSBAR, message);
//     ipcRenderer.sendTo(currentWindow.id, channels.SET_STATUSBAR, message)
// }

export default Introduction;
