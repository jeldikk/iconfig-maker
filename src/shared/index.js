// const channels = {
//         FORMAT_CONVERSION: 'app:format',
//         FIELD_VALIDATION: 'field_validation:name',
//         NAVIGATE_TO : 'navigation',
//         OPEN_EDITDIALOG: 'openEditDialog',
//         SET_STATUS: 'statusbar:set',
//         GET_METAINFO: 'config:get:metainfo',
//         GET_FIELDLIST: 'config:get:fieldlist',
//         GET_FIELDINFO: 'config:get:fieldinfo',
//         GET_OUTPUINFO: 'config:get:outputinfo',
//         GET_CONFIGDATA: 'config:get:configdata',
//         RESET_CONFIG: 'config:reset',


//         DEL_FIELD: 'config:del:field',
//         EDIT_FIELD: 'config:edit:field',
//         ADD_FIELD: 'config:add:field',

//         EDIT_METAINFO: 'config:edit:metainfo',
//         ADD_METAINFO: 'config:add:metainfo',
//         REFRESH_APP: 'refresh:app',

        
        
//     }

const channels = {
    CONFIGURATION: 'configuration',
    FORMAT_CONVERSION: 'timestamp:formatting',
    NAVIGATE: 'navigation',
    OPEN_EDITDIALOG: 'open:dialog',
    STATUSBAR: 'statusbar:set',
    REFRESH_APP : 'refreshapp'
}

const operations = {
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    EDIT: 'edit',
    DELETE: 'delete',
}

const datatypes = {
    METAINFO: 'metainfo',
    FIELD: 'field',
    PLOT: 'plot'
}

// exports.Configuration = Configuration;
// exports.channels = channels;
exports.channels = channels;
exports.operations = operations;
exports.datatypes = datatypes;

