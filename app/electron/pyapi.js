const path = require('path')
const {PythonShell} = require("python-shell")

const pythonPath = path.join(`${__dirname}`, "../../tools/venv/bin/python")

let options = {
    pythonPath: pythonPath,
    pythonOptions : ['-u'],
    scriptPath: path.join(`${__dirname}`,'../../tools/'),
}


exports.getFormattedDatetime = function get_formatted_datetime(format_specs, callback){
    let exec_options = {
        ...options,
        mode: 'text',
        args: ['-f', format_specs]
    }

    // console.log(exec_options);
    PythonShell.run("time2str.py", exec_options, (err, result)=>{
        if(err) throw err;

        callback(result)
    })
}

