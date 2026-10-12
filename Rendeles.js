class Rendeles {
    #id;
    #ugyfelNev;
    #cim;
    #statusz;

    constructor(id, ugyfelNev, cim, statusz) {
        this.setId(id);
        this.setUgyfelNev(ugyfelNev);
        this.setCim(cim);
        this.setStatusz(statusz);
    }

    getId() {
        return this.#id;
    }
    getUgyfelNev() {
        return this.#ugyfelNev;
    }
    getCim() {
        return this.#cim;
    }
    getStatusz() {
        return this.#statusz;
    }

    setId(id) {
        this.#id = id;
    }
    setUgyfelNev(ugyfelNev) {
        this.#ugyfelNev = ugyfelNev;
    }
    setCim(cim) {
        this.#cim = cim;
    }
    setStatusz(statusz) {
        this.#statusz = statusz;
    }

    toString() {
        return this.getId() + " " + this.getUgyfelNev() + " : " + this.getCim() + " | " + this.getStatusz();
    }

}
