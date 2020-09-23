import React from 'react'

import {Form, Col, Row, Button} from 'react-bootstrap'

const EditMetaInfo = ({type='new'})=>{

    switch(type){
        case 'new':
            // do if new metainfo dialog is requested
        case 'edit':
            // get data from mainProcess and distribute the stuff
    }

    return(
        <>
            <h3 className="text-center">Edit MetaInfo</h3>
            <Form className="p-3">
                {/* <fieldset> */}
                <Form.Group className="border border-rounded p-3">
                    <Form.Label className="font-weight-bold"> Delimiter :</Form.Label>
                    <Col>
                        <Form.Check inline type="radio" id="comma" name="delimiter" value="comma" className="mx-3" label="Comma( , )" />
                        <Form.Check inline type="radio" id="tab" name="delimiter" value="tab" className="mx-3" label="Tab( \t )" /> 
                        <Form.Check inline type="radio" id="space" name="delimiter" value="space" className="mx-3" label="Space(' ')" />
                    </Col>
                </Form.Group>
                <Form.Group>
                            {/* <Form.Label className="font-weight-bold">skip lines :</Form.Label> */}
                    <Form.Control type="text" size="sm"  placeholder="Enter the number of lines to skip" />
                    <Form.Text muted>minimum skip lines is 1(even header should be excluded)</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="font-weight-bold">DateTime format</Form.Label>
                    <Form.Control type="input" size="sm" placeholder="datetime format" />
                    <Form.Text muted>this is invalid form</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="font-weight-bold">Is Timestamp in filename</Form.Label>
                    <br />
                    <Form.Check type="radio" id="True" inline label="True" />
                    <Form.Check type="radio" inline label="False" />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="font-weight-bold">Filename format</Form.Label>
                    <Form.Control type="input" size="sm" placeholder="filestamp format" />
                    <Form.Text muted>This is just a help text</Form.Text>
                </Form.Group>
        
                    
                <Button variant="primary" size="lg">This is button</Button>
            </Form> 
        </>
    )

}

export default EditMetaInfo;