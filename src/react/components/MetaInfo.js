import React from "react";

import { Card, Button } from "react-bootstrap";

import {useStatusInfo, useEditDialog} from "../hooks"



const MetaInfo = ({ data = null}) => {
  // console.log("data is", data);
  console.log("MetaInfo is called");
  // const setMetaInfo = useMetaInfo();

  const openEditDialog = useEditDialog();

  const editClickHandler = (event, arg1, arg2)=>{
    
    console.log('edit click handler is here')
    
    // ipcRenderer.send(channels.EDIT)
    // ipcRenderer.send('OPEN_EDITDIALOG', '/edit-metainfo')
    openEditDialog('/edit-metainfo')

  }

  const renderBody = () => {
    if (!data) {
      return <Card.Title>when data is null</Card.Title>;
    } else {
      return Object.keys(data).map((key, index) => {
          return <p className="my-0" key={index}>
              <code key={key}>{`${key}:${data[key]}`}</code>
          </p>
      });
    }
  };

  
  return (
    <Card className="shadow my-4">
      <Card.Header className="d-flex flex-row">
        <p className="flex-grow-1 font-weight-bolder card-title">Meta Information</p>
        <div>
          <Button
            variant="primary mx-3"
            {...useStatusInfo("click to Add Meta Information")}
            disabled={data ? true : false}
          >
            Add
          </Button>
          <Button
            variant="secondary"
            disabled={data ? false : true}
            onClick={editClickHandler}
            {...useStatusInfo("click to Edit Meta Information")}
          >
            Edit
          </Button>
        </div>
      </Card.Header>
      <Card.Body>{renderBody()}</Card.Body>
    </Card>
  );
};

export default MetaInfo;
