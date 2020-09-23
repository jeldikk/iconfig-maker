import React from 'react'
import {useState, useEffect} from 'react'
import {channels, operations, datatypes} from "../../shared"
import MetaInfo from "../components/MetaInfo"
import FieldList from "../components/FieldList"
import OutputInfo from "../components/OutputInfo"
import InterpolationInfo from "../components/InterpolationInfo"
import PlotInfo from "../components/PlotInfo"

// import {useStatusInfo} from "../hooks"
import {useRefreshApp} from "../hooks"

import {ipcRenderer} from "../App"

const config_template = {
    metainfo: null,
    fieldinfo: [],
    outputinfo: [],
    interpolationinfo: null,
    plotinfo: []
}


const NewFile = ({data=null})=>{

    // let [configstate, setConfigState] = useState(data);
    let [configstate, setConfigState] = useRefreshApp(data)


    if(!configstate){

        ipcRenderer.once(channels.CONFIGURATION,(event, method, dtype, arg)=>{
            console.log("data on initconfig is ");
            console.log(arg);
            setConfigState(arg)
          })
        console.log("config value is null")
        ipcRenderer.send(channels.CONFIGURATION, operations.READ, 'default', 'default')

    }

    // useEffect(()=>{

    //     const refreshHandler = (event, message)=>{
    //         setConfigState(message);
    //         console.log('got data from main.js')
    //         console.log(message);
    //     }

    //     ipcRenderer.on(channels.REFRESH_APP,refreshHandler);
    
    //     return ()=>{
    //       ipcRenderer.removeListener(channels.REFRESH_APP, refreshHandler)
    //     }
    
    //   },[configstate])

    return(
        <>
            <MetaInfo data={configstate ? configstate.metainfo : null}/>
            <FieldList data={configstate ? configstate.fieldinfo : []}/>
            <OutputInfo data={configstate ? configstate.outputinfo : []} />
            <InterpolationInfo data={configstate ? configstate.interpolationinfo : null}/>
            <PlotInfo data={configstate ? configstate.plotinfo : []}/>
        </>
    )
}

export default NewFile