import React, {useState} from 'react'

import {Form} from 'react-bootstrap'
// import {updateFieldList} from "../hooks"

const Checkbox = ({label, enabled, onChangeHandler})=>{

    let [checked, setChecked] = useState(enabled);

    const onChangeFunc = (event)=>{
        // setchecked(!checked);
        console.log(event.target.value);
        // onChangeHandler(event.target.value);
        console.log(event.target.checked);
        onChangeHandler(event.target.checked, label)
        setChecked(!checked);
    }

    return <div className="d-flex flex-row justify-content-left">
        <Form.Check type="checkbox" checked={checked} value={label} onChange={onChangeFunc} />
        <p className="text-monospace"><code>{label}</code></p>
    </div>
}

export default Checkbox;