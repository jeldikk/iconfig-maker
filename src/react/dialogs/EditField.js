import React, {useState, useRef} from 'react'
import {channels} from "../../shared"
import {Form, Button, Container, Col, Row} from 'react-bootstrap'

import {ipcRenderer} from "../App"


const {remote} = window.require('electron')

// console.log(remote);

const currentWindow = remote.getCurrentWindow();
// console.log(ipcRenderer);

const FIELD_INFO = {
    name: {

    }
}

const EditField = ({field={}})=>{

    const [name, setName] = useState(field.name ? field.name : '');
    const [colno, setColno] = useState(field.colno ? field.colno : '');
    const [ftype, setFtype] = useState(field.ftype ? field.ftype : '');
    const [factor, setFactor] = useState( field.factor ? field.factor : '');
    const [ifnull, setIfnull] = useState(field.ifnull ? field.ifnull : '');
    const [nullval, setNullval] = useState(field.nullval ? field.nullval : '');
    const [label, setLabel] = useState(field.label ? field.label : '');
    const [units, setUnits] = useState(field.units ? field.units : '')

    const factorHelp = useRef();
    

    const onAddFieldFormSubmit = (event) => {
        event.preventDefault();
        currentWindow.close();
    }

    const onNameChange = (event) => {
        console.log("changed text is :", event.target.value);

        let mod_val = event.target.value;
        ipcRenderer.send(channels.FIELD_VALIDATION, mod_val);
        setName(event.target.value);
    }

    const onColnoChange = (event) => {

        let val = parseInt(event.target.value);
        if(!val){
            setColno('');
        }else{
            setColno(val);
        }
    }

    const factorValidation = (event) => {

        let commonClassname = "font-weight-bold form-text text"

        if(event.target.value === ''){
            
            factorHelp.current.className = commonClassname+'-muted'
            factorHelp.current.innerHTML = "multiplication factor before storing the sample"
            setFactor('')
        }
        else{
            
            let parsedVal = parseFloat(event.target.value);
            // console.log(parsedVal)
            if(!parsedVal){
                // console.log('parseval error')
                factorHelp.current.innerHTML = "Choose some positive number > 0"
                factorHelp.current.className = commonClassname+"-danger"
                setFactor(event.target.value);

            }
            else{
                factorHelp.current.innerHTML = "property validated"
                factorHelp.current.className = commonClassname+"-success"
                setFactor(parsedVal);
            }
        }

        

    }


    return (
        <Container fluid>
            <Form onSubmit={onAddFieldFormSubmit}>
                <Row className="mt-3 p-1">
                    <Col xs={6}>
                        <Form.Group controlId="editField_name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="name" value={name} onChange={onNameChange} />
                            <Form.Text className="text-muted">
                                unique meaningful name
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="editField_colno">
                            <Form.Label>Column No</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="colno" onChange={onColnoChange} value={colno} />
                            <Form.Text className="text-muted text-info">
                                column number you want to map, ( range : 1 ... n)
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="editField_ftype">
                            <Form.Label>Field type</Form.Label>
                            <Form.Control size="sm" as="select" custom>
                                <option value="none">select field</option>
                                <option value="int">Integer</option>
                                <option value="float">Float</option>
                                <option value="datetime">Datetime</option>
                            </Form.Control>
                            <Form.Text className="text-muted">
                                choose one of the field type
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="editField_factor">
                            <Form.Label>Factor</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="factor (default: 1)" value={factor} onChange={factorValidation} />
                            <Form.Text ref={factorHelp} className="text-muted">
                                
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group controlId="editField_ifnull">
                            <Form.Label>Complement Value</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="ifnull (default: null)" value={ifnull} onChange={event => setIfnull(event.target.value)} />
                            <Form.Text className="text-muted">
                                Value to be used if error occurs while parsing
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="editField_nullval">
                            <Form.Label>Possible Null Value</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="nullval (default: null)" value={nullval} onChange={event => setNullval(event.target.value)} />
                            <Form.Text className="text-muted">
                                How instrument represent null data
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="editField_label">
                            <Form.Label>Label alias for field</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="label (default: null)" value={label} onChange={event => setLabel(event.target.value)} />
                            <Form.Text className="text-muted">
                                Name string to be used while plotting or file write
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="editField_units">
                            <Form.Label>Units</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="units (default: null)" value={units} onChange={event => setUnits(event.target.value)} />
                            <Form.Text className="text-muted">
                                field measuring units 
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="p-1">
                    <Col xs={4}>
                        <Button type="button" variant="outline-secondary" size="lg" block disabled={field ? false : true}>Save Edits</Button>
                    </Col>
                    <Col xs={4}>
                        <Button type="submit" variant="outline-primary" size="lg" block>Add Field</Button>
                    </Col>
                    <Col xs={4}>
                        <Button type="button" variant="outline-danger" size="lg" block>clear</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )

}

export default EditField;