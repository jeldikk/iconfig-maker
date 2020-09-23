import React, { useState } from "react";

import { Card, Form, Button } from "react-bootstrap";

import {useStatusInfo} from "../hooks"
import Checkbox from "./Checkbox"

const OutputInfo = ({ data = [] }) => {
  let [enabled, setEnabled] = useState(false);

  const onHeaderClick = (event) => {
    setEnabled(!enabled);
  };

  const renderContent = ()=>{

    if(data.length === 0){
      return <div className="text-center">Add Some fields to appear</div>
    }

    return data.map((value, idx)=>{
      return <Checkbox key={value} label={value} />
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
