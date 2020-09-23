import React from 'react'

import {Form} from 'react-bootstrap'

const Checkbox = ({label})=>{

    return <div className="d-flex flex-row justify-content-left">
        <Form.Check type="checkbox" />
        <p className="text-monospace"><code>{label}</code></p>
    </div>
}

export default Checkbox;