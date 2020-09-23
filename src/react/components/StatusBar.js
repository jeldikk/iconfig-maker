import React, {useEffect, useState} from 'react'

import "./StatusBar.css"

import {channels} from "../../shared"
import {ipcRenderer} from "../App"

const StatusBar = ()=>{

    let [footerStatus, setFooterStatus] = useState('')

    useEffect(()=>{

        const set_status = (event, message)=>{
            setFooterStatus(message)
        }

        ipcRenderer.on(channels.SET_STATUS, set_status)

        return ()=>{
            ipcRenderer.removeListener(channels.SET_STATUS, set_status)
        }

    },[footerStatus])


    return (
        <footer className="footer-style">
            &gt; {footerStatus}
        </footer>
    )
}

export default StatusBar;