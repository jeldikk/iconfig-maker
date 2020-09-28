import {useState, useEffect} from 'react'
import {ipcRenderer} from "../App"
import {channels, operations, datatypes} from "../../shared"

const {remote} = window.require('electron');

const currentWindow = remote.getCurrentWindow();


export const useFieldDeleter = () => {
    return (field) =>{
        ipcRenderer.send(channels.CONFIGURATION,operations.DELETE, datatypes.FIELD, field)
    }
}

export const useStatusInfo = (status)=>{

    return {
        onMouseEnter: ()=>{
            ipcRenderer.sendTo(currentWindow.id, channels.STATUSBAR, status)
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

export const updateFieldList = (type)=>{
    
    let method = null;
    let datatype = null;
    console.log(type);
    switch(type){
        case 'delete':
            method=operations.DELETE
            datatype = datatypes.OUTPUTINFO
            break;
        case 'update':
            method = operations.UPDATE
            datatype = datatypes.OUTPUTINFO
            break
        default:
            return

    }
    return (arg)=>{
        ipcRenderer.send(channels.CONFIGURATION, method, datatype, arg)
    }
}

export const useTimeFormatter = () => {

    let [dateformat, setDateFormat] = useState('');
    let [fileformat, setFileFormat] = useState('')

    const convertTime = (specs, type)=>{
        ipcRenderer.send(channels.FORMAT_CONVERSION, type, specs)
    }

    useEffect(()=>{

        const onFormatConversion = (event, type, res)=>{
            if(type == 'file'){
                setFileFormat(res);
            }
            else{
                setDateFormat(res)
            }
        }

        ipcRenderer.on(channels.FORMAT_CONVERSION, onFormatConversion)

        return ()=>{
            ipcRenderer.removeListener(channels.FORMAT_CONVERSION, onFormatConversion)
        }
        
    }, [dateformat, fileformat])


    return [fileformat, dateformat, convertTime]
}

export const updateMetainfoHandler = (data)=>{

    return {
        onSubmit: (event)=>{
            console.log('submit handler called with data', data)
            event.preventDefault();
            ipcRenderer.send(channels.CONFIGURATION, operations.UPDATE, datatypes.METAINFO, data);
            currentWindow.close();

        }
    }

}

export const cancelButtonHandler = ()=>{
    currentWindow.close();
}