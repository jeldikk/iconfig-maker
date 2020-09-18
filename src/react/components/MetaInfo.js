import React from 'react'

import {Card, Button} from 'react-bootstrap'

const {ipcRenderer} = window.require('electron');

const MetaInfo = ({data = null})=>{
    return (
        <Card className="shadow-lg my-4">
            <Card.Header className="d-flex flex-row">
                <h4 className="flex-grow-1 font-weight-bolder">Meta Information</h4>
                <div>
                    <Button variant="primary mx-3">Add</Button>
                    <Button variant="secondary" disabled={data ? false : true }>Edit</Button>
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Title >About</Card.Title>
                <Card.Text>
                    click here
                </Card.Text>
            </Card.Body>
        </Card>
    )
}



export default MetaInfo;