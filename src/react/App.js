import React, {useEffect, useState} from 'react';

import {Route, Switch, useHistory} from 'react-router-dom'



import Introduction from './main_pages/Introduction'
import MetaInfo from "./components/MetaInfo"
import EditField from "./dialogs/EditField"

import NewFile from "./main_pages/NewFile"
import OpenFile from "./main_pages/OpenFile"
import { channels } from '../shared';
import StatusBar from "./components/StatusBar"

//Style Imports
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

const {ipcRenderer} = window.require("electron")

let sample_field = {
  name: 'height',
  colno: 1,
  ftype: 'int',
  factor: 1,
  ifnull: null,
  nullval: "-------",
  label: 'Height',
  units: 'km'
}

const App = ()=>{

  let history = useHistory();
  let [footerStatus, setFooterStatus] = useState('default status')


  useEffect(() => {

    const onNavigation = (event, message)=>{
      
      // let history = useHistory();

      // history.push(message)
      console.log(message);
      history.push(message);

    }
    ipcRenderer.on(channels.NAVIGATE_TO,onNavigation)
    // console.log('navigation construction called')

    return () => {
      // console.log(' navigation destruction called');
      ipcRenderer.removeListener(channels.NAVIGATE_TO, onNavigation);
    }
  })

  useEffect(() => {

    const setStatusBar = (event, status)=>{
        // console.log("before setting the status")
        setFooterStatus(status)
    }
    ipcRenderer.on(channels.SET_STATUSBAR, setStatusBar);
    // console.log("statusbar construction called");

    return () => {
      // console.log('statusbar handler destruction')
      ipcRenderer.removeListener(channels.SET_STATUSBAR, setStatusBar)
    }

  }, [footerStatus])

  return (
    <>
      <Switch>
          <Route exact path="/">
            <Introduction setStatus={setFooterStatus} />
            <StatusBar footerStatus={footerStatus} />
          </Route>
          <Route path="/new-file">
            <NewFile />
            <StatusBar footerStatus={footerStatus} />
          </Route>
          <Route path="/open-file" component={OpenFile}>
            <OpenFile />
            <StatusBar footerStatus={footerStatus} />
          </Route>
          <Route path="/open-file/:fileid">
            <OpenFile />
            <StatusBar footerStatus={footerStatus} />
          </Route>
          <Route path="/add-field-config">
            <EditField field={sample_field} />
          </Route>
      </Switch>
    </>
  )
}

export default App;
