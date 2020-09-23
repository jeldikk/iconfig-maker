


class Configuration{

    #meta_info;
    #field_info;
    #interpolation_info;
    #output_info;
    #plot_info;

    constructor(args){

        this.#meta_info = {
            delimiter: ',',
            skip_lines: null,
            field_count: 0,
            filename_format: null,
            datetime_format: null,
            timestamp_in_filename: false
        };

        this.#field_info = [
            {
                name: 'height',
                colno: 6,
                ftype: 'float',
                factor: 1,
                ifnull: null,
                nullval: null,
                label: 'Height',
                units: 'km'
            },
            {
                name: 'u',
                colno: 7,
                ftype: 'float',
                factor: 2,
                ifnull: null,
                nullval: null,
                label: 'Zonal Wind',
                units: 'mps'
            },
            {
                name: 'v',
                colno: 3,
                ftype: 'float',
                factor: 2,
                ifnull: null,
                nullval: null,
                label: 'Zonal Wind',
                units: 'mps'
            },
            {
                name: 'w',
                colno: 4,
                ftype: 'float',
                factor: 2,
                ifnull: null,
                nullval: null,
                label: 'Zonal Wind',
                units: 'mps'
            }
        ];

        this.#interpolation_info = {
            pivot: 'height',
            start: null,
            stop: null,
            step: null
        };

        this.#output_info = ['height', 'u', 'v', 'w'];

        this.#plot_info = [
            {
                mode: 'file',
                type: 'line',
                xaxis: null,
                yaxis: 'height',
                fields: ['u', 'v']
            },
            {
                mode: 'folder',
                type: 'contour',
                xaxis: 'filestamp',
                yaxis: 'height',
                fields: ['u', 'v', 'w']
            }
        ]
    }

    getConfigData(){

        return {
            'metainfo': this.#meta_info,
            'fieldinfo': this.#field_info,
            'outputinfo': this.#output_info,
            'interpolationinfo': this.#interpolation_info,
            'plotinfo': this.#plot_info
        }

    }

    getMetaInfo(){
        return this.#meta_info;
    }

    setMetaInfo(arg){
        this.#meta_info = arg;
    }

    getFieldsInfo(){
        return this.#field_info;
    }

    setFieldsInfo(arg){
        this.#field_info = arg;
    }

    getOutputInfo(){
        return this.#output_info;
    }

    setOutputInfo(arg){
        this.#output_info = arg;

    }

    getInterpolationInfo(){
        return this.#interpolation_info;
    }

    setInterpolationInfo(arg){
        this.#interpolation_info = arg;
    }


    getPlotInfo(){
        return this.#plot_info;
    }

    setPlotInfo(arg){
        this.#plot_info = arg;
    }

    getFieldNames(){

        // return Array.prototype.map((value, index)=> value.name, this.#field_info)
        return this.#field_info.map((value,idx) => value.name);
    }

    removeField(field){
        console.log('removing the field ', field);

        // let result = Array.prototype.filter((value, index)=>{
        //     return value.name != field.name
        // }, this.#field_info)

        // console.log(this.#field_info);

        this.#field_info = this.#field_info.filter((value,index) => value.name != field.name);
        this.updateInfos()

        this.#meta_info.field_count -= 1;
    }

    updateInfos(){
        let fieldnames = this.getFieldNames();

        // console.log("output_info before filter ", this.#output_info)
        // console.log("fieldnames are :", fieldnames)
        this.#output_info = this.#output_info.filter((value) => fieldnames.includes(value))

        // console.log('output_info after filter :', this.#output_info)

        // this.#meta_info.field_count-=1;
    }

    static create(){
        return new Configuration();
    }

    static readFromFile(filename){
        console.log("static function readFromFile")
    }

    static fromConfigData(data){
        console.log("from config data")
    }
}

exports.Configuration = Configuration;