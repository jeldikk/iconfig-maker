import React from "react";

import "./FieldDetail.css";
import { Card, Alert } from "react-bootstrap";
import {useFieldDeleter} from "../hooks"

const {remote} = window.require('electron');

// const currentWindow = remote.getCurrentWindow();
const { Menu } = remote

// console.log('current window is')
// console.log(currentWindow);
// console.log("Menu is");
// console.log(Menu);;

// let fieldContextSelection = null;



const FieldDetail = ({ data = null, index}) => {

	const fieldDeleter = useFieldDeleter();


	const alertContextMenu = Menu.buildFromTemplate([
		{
			label: 'edit',
			click: ()=>{
					console.log('edit chosen')
			}
		},
		{
			label: 'delete',
			click: ()=>{
				console.log("delete functionality is called")
				fieldDeleter(data);
			}
		}
	]);

  const renderDetail = () => {
    return <Alert
      variant="danger"
      className="render-detail"
      key={data.name}
      onContextMenu={(event)=>{
			// setContext(data);
			alertContextMenu.popup();
      }}
      onClick={(event) => console.log("renderToast")}
    >
      <code>
		{`${index+1}. name: ${data.name}, colno: ${data.colno}, ftype: ${data.ftype}, label:${data.label}(${data.units})`}
      </code>
    </Alert>;
  };

  return (
    <>{data ? renderDetail() : <Card.Title>Add Some Fields</Card.Title>}</>
  );
};

export default FieldDetail;
