import React from "react";

import { Card, Button } from "react-bootstrap";

import FieldDetail from "./FieldDetail";

import {useStatusInfo} from "../hooks"

let selectedFieldContext = null;

const FieldList = ({ data = [], setStatus }) => {

    const setContext = (field)=>{
      selectedFieldContext = field;
    }

    const renderFields = ()=>{

        return data.map((field, index)=>{
            return <FieldDetail key={field.name} index={index} data={field} setContext={setContext}  />
        })
    }

  return (
    <>
      <Card className="shadow-lg">
        <Card.Header className="d-flex flex-row">
          <p className="flex-grow-1 font-weight-bolder card-title">Fields Information</p>
          <div>
            <Button
              variant="primary mx-3"
              {...useStatusInfo("click to Add New Field")}
            >
              Add New Field
            </Button>
          </div>
        </Card.Header>
        {data.length === 0 ? (
          <Card.Body>
            <Card.Title>About</Card.Title>
            <Card.Text>this is text of FieldList</Card.Text>
          </Card.Body>
        ) : (
          <Card.Body>
            {renderFields()}
          </Card.Body>
        )}
      </Card>
    </>
  );
};

export default FieldList;
