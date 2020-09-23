import React, {useState} from "react";

import { Card, Form } from "react-bootstrap";

import { useStatusInfo } from "../hooks";

const InterpolationInfo = () => {

    let [enabled, setEnabled] = useState(false);

    const onHeaderClick = (event)=>{
        setEnabled(!enabled);
    }

  console.log("interpolations starting");
  return (
    <>
      <Card className="shadow-lg">
        <Card.Header
          className="d-flex flex-row"
          onClick = {onHeaderClick}
          {...useStatusInfo("click to enable interpolation configuration")}
        >
          <Form.Check type="checkbox" label="" checked={enabled} onChange={(event)=>setEnabled(!enabled)} />
          <p className="font-weight-bolder mx-2 card-title">
            Interpolation Configuration
          </p>
        </Card.Header>
        {
            enabled ?
            <>
                <Card.Body>
                    <div className="text-center">Here goes the content of interpolation</div>
                </Card.Body>
            </> :
            null
        }
      </Card>
    </>
  );
};

export default InterpolationInfo;
