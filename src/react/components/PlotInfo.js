import React, { useState } from "react";

import { Card, Form, Button } from "react-bootstrap";
import { useStatusInfo } from "../hooks";

const PlotInfo = ({ data = [] }) => {
  let [enabled, setEnabled] = useState(false);

  const onCheckChange = (event) => {
    setEnabled(!enabled);
  };

  const onHeaderClick = (event) => {
    setEnabled(!enabled);
  };

  return (
    <>
      <Card className="shadow-lg">
        <Card.Header className="d-flex flex-row">
          <Form.Check
            type="checkbox"
            label=""
            checked={enabled}
            onChange={(event) => onCheckChange(event)}
            {...useStatusInfo(
              `click to ${
                enabled ? "disable" : "enable"
              } Plotting configuration`
            )}
          />
          <p
            className="font-weight-bolder mx-2 flex-grow-1 card-title"
            onClick={onHeaderClick}
            {...useStatusInfo(
              `click to ${
                enabled ? "disable" : "enable"
              } Plotting configuration`
            )}
          >
            Plot configuration
          </p>
          <Button
            variant="primary mx-3"
            {...useStatusInfo("click to Add new Plot")}
          >
            Add new Plot
          </Button>
        </Card.Header>
        {enabled ? (
          <Card.Body>
            <div className="text-center">Here goes the body of plot</div>
          </Card.Body>
        ) : null}
      </Card>
    </>
  );
};

export default PlotInfo;
