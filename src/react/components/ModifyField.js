import React from 'react'
import {useParams} from 'react-router-dom'


const ModifyField = ()=>{

    const {id} = useParams();


    return <h1>Modify Field {id} </h1>
}

export default ModifyField;