import {useState, useEffect} from 'react'
import {ipcRenderer} from "../App"
import {channels, operations, datatypes} from "../../shared"

const {remote} = window.require('electron');

const currentWindow = remote.getCurrentWindow();

// REFRESH_APP = channels.CONFIGURATION + operations.UPDATE

export const useFieldDeleter = () => {
    return (field) =>{
        ipcRenderer.send(channels.CONFIGURATION,operations.DELETE, datatypes.FIELD, field)
    }
}

export const useStatusInfo = (status)=>{

    return {
        onMouseEnter: ()=>{
            ipcRenderer.sendTo(currentWindow.id, channels.STATUSBAR,status)
        },
        onMouseLeave: ()=>{
            // console.log('on MouseLeave');
            ipcRenderer.sendTo(currentWindow.id, channels.STATUSBAR,'')
        }
    }
}

export const useMetaInfo = ()=>{
    return (metainfo_obj)=>{
        ipcRenderer.send(channels.CONFIGURATION,operations.EDIT,datatypes.METAINFO, metainfo_obj)
    }
}

export const useRefreshApp = (data = null)=>{

    let [configstate, setConfigState] = useState(data);

    useEffect(() => {
        
        const refreshHandler = (event, state)=>{
            // console.log("refresh handler called")
            setConfigState(state)
        }

        ipcRenderer.on(channels.REFRESH_APP, refreshHandler);

        return ()=>{
            ipcRenderer.removeListener(channels.REFRESH_APP, refreshHandler);
        }

    }, [configstate])

    return [configstate, setConfigState]
}

export const useEditDialog = () => {

    return (suburl, arg=null) => {
        ipcRenderer.send(channels.OPEN_EDITDIALOG, suburl, arg)
    }
}

// export const useInitConfig = ()=>{
//     const data = null;
//     ipcRenderer.once(channels.GET_CONFIGDATA,(event, message)=>{
        
//     })

//     return ()=>{
        
//     }


// }