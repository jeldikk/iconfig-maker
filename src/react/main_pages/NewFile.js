import React from 'react'


import MetaInfo from "./MetaInfo"
import FieldList from "./FieldList"


const NewFile = ()=>{
    return(
        <div className="p-3">
            <MetaInfo />
            <FieldList />
        </div>
    )  
}

export default NewFile