import React, { useState, useRef, useEffect } from "react";

import { Form, Col, Row, Button } from "react-bootstrap";

import { useTimeFormatter } from "../hooks";

const EditMetaInfo = ({ type = "new" }) => {
  let [delimiter, setDelimiter] = useState("comma");
  let [skiplines, setSkiplines] = useState(0);
  let [enabled, enableFilestamp] = useState(false);
  let [datetimeval, setDatetimeval] = useState("");
  let [fileformatval, setFileformatval] = useState("");

  let timerid = null;
  const datetime_response = useRef(null);
  let [fileformat, datetimeformat, convertFormat] = useTimeFormatter();

//   console.log('delimiter is ', delimiter)

  useEffect(() => {
    console.log("fileformat or datetimeforamat is changed");
  }, [fileformat, datetimeformat]);

  useEffect(() => {
    // convertFileFormat(fileformatval)
    convertFormat(fileformatval, "file");
  }, [fileformatval]);

  useEffect(() => {
    console.log("this is executed only because datetime val is changed");
    convertFormat(datetimeval, "datetime");
  }, [datetimeval]);

  const onFilestampleChange = (event) => {
    enableFilestamp(event.target.checked);
  };

  const onDateTimeFormatChange = (event) => {
    setDatetimeval(event.target.value);
  };

  const onFilenameFormatChange = (event) => {
    setFileformatval(event.target.value);
  };

  const validateSkiplines = (text) => {
    console.log('the text is ',text)
    if(!text){
        setSkiplines(0)
    }
    else{
        setSkiplines(parseInt(text));
    }
      
  }

  const renderRadiobuttons = () => {
    let limiters = [
      {
        name: "comma",
        label: "Comma",
      },
      {
        name: "tab",
        label: "Tab",
      },
      {
        name: "space",
        label: "Space",
      },
    ];

    return limiters.map((item, idx) => {
      return (
        <Form.Check
          key={item.name}
          inline
          type="radio"
          id={item.name}
          onChange={() => setDelimiter(item.name)}
          name="delimiter"
          value={item.name}
          className="mx-3"
          label={item.label}
          checked={item.name === delimiter}
        />
      );
    });
  };

  return (
    <>
      <Form className="p-3">
        <Form.Group className="border border-rounded p-3">
          <Form.Label className="font-weight-bold"> Delimiter :</Form.Label>
          <Col>
            {renderRadiobuttons()}
          </Col>
        </Form.Group>
        <Form.Group>
          <Form.Row>
            <Col xs={3}>
              <Form.Label className="font-weight-bold text-center">
                No. of lines to skip :
              </Form.Label>
            </Col>
            <Col cs={9}>
              <Form.Control type="text" size="sm" placeholder="skip lines" value={skiplines} onChange={(event)=>validateSkiplines(event.target.value)} />
              <Form.Text muted>
                minimum skip lines is 1(even header should be excluded)
              </Form.Text>
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group>
          <Form.Label className="font-weight-bold">DateTime format</Form.Label>
          <Form.Control
            type="input"
            size="sm"
            placeholder="datetime format"
            value={datetimeval}
            onChange={onDateTimeFormatChange}
          />
          <Form.Text
            ref={datetime_response}
            muted={datetimeformat.length === 0 ? true : false}
            className={`font-weight-bold text-${
              datetimeformat ? "success" : "danger"
            }`}
          >
            {datetimeformat
              ? `Probable format: ${datetimeformat}`
              : "Enter some python datetime specifier"}
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="checkbox"
            checked={enabled}
            onChange={(event) => enableFilestamp(event.target.checked)}
            className="d-inline mx-2"
          ></Form.Check>
          <Form.Label className="font-weight-bold">
            Timestamp in filename
          </Form.Label>
          {/* <br />
                    <Form.Check type="radio" id="True" inline label="True" />
                    <Form.Check type="radio" inline label="False" /> */}
        </Form.Group>
        <Form.Group>
          <Form.Label className="font-weight-bold">Filename format</Form.Label>
          <Form.Control
            type="input"
            size="sm"
            className={enabled ? "border-info" : "border-danger"}
            value={fileformatval}
            onChange={onFilenameFormatChange}
            placeholder="filestamp format"
            disabled={enabled ? false : true}
          />
          <Form.Text
            muted={fileformat.length < 5 ? true : false}
            className={`font-weight-bold text-${
              fileformat ? "success" : "danger"
            }`}
          >
            {fileformat
              ? `Probable format: ${fileformat}`
              : "Enter some datetime specifier"}{" "}
          </Form.Text>
        </Form.Group>

        <div className="d-flex flex-row">
          <Button variant="primary" className="mx-3">
            Submit
          </Button>
          <Button variant="danger" className="mx-3">
            Cancel
          </Button>
        </div>
      </Form>
    </>
  );
};

export default EditMetaInfo;
