import React, {useEffect} from 'react';

import {Route, Switch, useHistory} from 'react-router-dom'



import Introduction from './pages/Introduction'
import EditMetaInfo from "./dialogs/EditMetaInfo"
import EditField from "./dialogs/EditField"


import NewFile from "./pages/NewFile"
import OpenFile from "./pages/OpenFile"
import { channels } from '../shared';
import StatusBar from "./components/StatusBar"

//Style Imports
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

export const {ipcRenderer} = window.require("electron");

// console.log(channels);

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
  // let [configstate, setConfigState] = useState(null)

  // useEffect(()=>{
  //   ipcRenderer.on(channels.GET_CONFIGDATA,)
  // },[])


  useEffect(() => {

    // This is for navigation from Menu(mainProcess) to react-router's useHistory(renderProcess)
    const onNavigation = (event, message)=>{
      
      console.log(message);
      history.push(message);

    }

    ipcRenderer.on(channels.NAVIGATE,onNavigation)

    // ipcRenderer.

    console.log('navigation construction called')


    return () => {
      console.log(' navigation destruction called');
      ipcRenderer.removeListener(channels.NAVIGATE, onNavigation);
    }
  },[history])

  // useEffect(()=>{

  //   ipcRenderer.on(channels.REFRESH_APP,(event, message)=>{
  //     // console.log(arg1);
  //     // console.log(arg2);
  //     setConfigState(message);
  //     console.log('got data from main.js')
  //     console.log(message);
  //     return ()=>{
  //       console.log('destruction happens in argument based useEffect too')
  //     }
  //   })

  //   ipcRenderer.once(channels.GET_CONFIGDATA,(event, message)=>{
  //     console.log("data on initconfig is ");
  //     console.log(message);
  //     setConfigState(message)
  //   })

  //   if(!configstate){
  //     ipcRenderer.send(channels.GET_CONFIGDATA,"from App.js")
  //   }

  // },[configstate])


  return (
      <Switch>
          <Route exact path="/">
            <div className="app-div-wrapper">
              <Introduction />
            </div>
            <StatusBar />
          </Route>
          <Route path="/new-file">
            {/* <div className="app-div-wrapper"> */}
              <NewFile />

            <StatusBar />
          </Route>
          <Route path="/open-file">
            <OpenFile />
            <StatusBar />
          </Route>
          <Route path="/open-file/:fileId">
            <OpenFile />
            <StatusBar />
          </Route>
          <Route path="/add-field">
            <EditField field={sample_field} />
          </Route>
          <Route path="/edit-metainfo">
            <EditMetaInfo />
          </Route>
      </Switch>
  )
}

export default App;
// export const ipcRenderer;


