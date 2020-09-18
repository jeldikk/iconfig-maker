import React from 'react'

import {Card, Button} from 'react-bootstrap'

const FieldList = ({fields})=>{

    return (
        <>
            <Card className="shadow-lg">
                <Card.Header className="d-flex flex-row">
                    <h4 className="flex-grow-1 font-weight-bolder">Fields Information</h4>
                    <div>
                        <Button variant="primary mx-3">Add New Field</Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Title >About</Card.Title>
                    <Card.Text>
                        this is text of FieldList
                    </Card.Text>
                </Card.Body>
                
            </Card>
        </>
    )
}

export default FieldList