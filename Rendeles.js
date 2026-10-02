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

    // Getterek

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

    // Setterek

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
}