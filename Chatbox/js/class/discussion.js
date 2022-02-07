class Discussion {
    id;
    name;
    pseudo;

    from = (datas) => {
        for (let prop in datas){
            this[prop] = datas[prop];
        }
    };

    getName = async (ajax) => {
        const datas = await ajax.post("getDiscussionName", {id: this.id });
        this.name = datas.discussion;
        return this.name;
    }

}

export default Discussion;