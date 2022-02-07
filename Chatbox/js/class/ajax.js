class AJAX {
    url;
    settings;

    constructor() {
        this.url =
            "http://localhost:8000/php/controller.php?action=";
        this.settings = {
            method: "POST",
            body: ({}),
        };
    }

    formatDatas = (datas) => {
        const formDatas = new FormData();
        for (let prop in datas){
            formDatas.append(prop, datas[prop]);
        }
        return formDatas;
    };

    post = async (route, datas = {}) => {
        this.settings.body = JSON.stringify(datas);
        //console.log(this.settings.body);
        const response = await fetch(this.url + route, this.settings);
        return await response.json();
    };

}

export default AJAX;