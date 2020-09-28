import React, { useState } from "react";

import { Card, Form, Button } from "react-bootstrap";

import {useStatusInfo, updateFieldList} from "../hooks"
import Checkbox from "./Checkbox"

const OutputInfo = ({ data = [], fieldList = [] }) => {
  let [enabled, setEnabled] = useState(false);

  let updateField = updateFieldList('update');
  let deleteField = updateFieldList('delete')

  let getFieldList = updateFieldList()

  const onHeaderClick = (event) => {
    setEnabled(!enabled);
  };

  const onChangeHandler = (enabled, label)=>{

    if(enabled){
      updateField(label)
    }
    else{
      deleteField(label)
    }

  }

  const renderContent = ()=>{

    if(data.length === 0){
      return <div className="text-center">Add Some fields to appear</div>
    }

    return fieldList.map((value, idx)=>{
      return <Checkbox key={value} label={value} enabled={data.includes(value) ? true : false} onChangeHandler={onChangeHandler}/>
    })

  }

  return (
    <>
      <Card className="shadow-lg">
        <Card.Header className="d-flex flex-row" onClick={onHeaderClick} {...useStatusInfo(`click to ${enabled ? 'disabled' : 'enable'} Output configuration`)}>
          <Form.Check
            type="checkbox"
            label=""
            checked={enabled}
            onChange={(event)=>setEnabled(!enabled)}
          />
          <p className="font-weight-bolder mx-2 card-title">
            Output configuration
          </p>
        </Card.Header>
          {
            enabled ?
            <>
              <Card.Body className="d-flex flex-row justify-content-around">
              {
                renderContent()
              }
              </Card.Body>
            </> :
            null
          }
      </Card>
    </>
  );
};

export default OutputInfo;
