import React from 'react'

import {channels} from "../../shared"
import {ipcRenderer} from "../App"

const useDeleter = ()=>{

    return (field)=>{
        ipcRenderer.on(channels.DEL_FIELD, field);
    }
}