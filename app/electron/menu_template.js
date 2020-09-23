const {Menu} = require('electron');

const mainProcess = require("../main");


let menu_schema = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New',
                toolTip: 'New file',
                click: () =>{
                    console.log("new clicked");
                    mainProcess.NavigateToLink("/new-file");
                },
            },
            {
                label: 'Open',
                click: ()=>{
                    mainProcess.NavigateToLink("/open-file");
                }
            },
            {
                label: 'Add Field',
                click: ()=>{
                    // console.log("Add field button clicked");
                    mainProcess.createeditDialog("/add-field");
                }
            },
            {
                label: 'Quit',
                role: 'quit',
            }
        ]
    },
    {
        label: 'Help',
        submenu:[
            {
                label: 'reload',
                role: 'reload'
            }
        ]
    }
]

module.exports = {
    MenuTemplate : Menu.buildFromTemplate(menu_schema),
}