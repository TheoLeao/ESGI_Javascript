class LocalStorage {
    key;

    constructor(key) {
        this.setKey(key);
    }

    setKey = (key) => (this.key = key.toUpperCase().replace(" ", "-"));

    saveDatas = (datas) => localStorage.setItem(this.key, JSON.stringify(datas));

    loadDatas = () => {
        const datas = localStorage.getItem(this.key);
        return datas == null ? {} : JSON.parse(datas);
    }

}

export default LocalStorage;