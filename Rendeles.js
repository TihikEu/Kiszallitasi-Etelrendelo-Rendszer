class Rendeles {
    #id;
    #ugyfelNev;
    #cim;
    #etelNev;
    #osszeg;
    #hatraidoPerc;
    #statusz;

    constructor(id, ugyfelNev, cim, etelNev, osszeg, hatraidoPerc, statusz) {
        this.setId(id);
        this.setUgyfelNev(ugyfelNev);
        this.setCim(cim);
        this.setEtelNev(etelNev);
        this.setOsszeg(osszeg);
        this.setHatraidoPerc(hatraidoPerc);
        this.setStatusz(statusz);

        if (this.#hatraidoPerc === 0) {
            this.#statusz = "Kiszallitva";
        }
    };

    // Getterek

    getId() {
        return this.#id;
    };
    getUgyfelNev() {
        return this.#ugyfelNev;
    };
    getCim() {
        return this.#cim;
    };
    getEtelNev() {
        return this.#etelNev;
    };
    getOsszeg() {
        return this.#osszeg;
    };
    getHatraidoPerc() {
        return this.#hatraidoPerc;
    };
    getStatusz() {
        return this.#statusz;
    };

    // Setterek

    setId(id) {
        this.#id = id;
    };

    setUgyfelNev(ugyfelNev) {
        this.#ugyfelNev = ugyfelNev;
    };

    setCim(cim) {
        this.#cim = cim;
    };

    setEtelNev(etelNev) {
        this.#etelNev = etelNev;
    };

    setOsszeg(osszeg) {
        this.#osszeg = parseInt(osszeg);
    };

    setHatraidoPerc(hatraidoPerc) {
        if (parseInt(hatraidoPerc) === 0) {
            this.#hatraidoPerc = parseInt(hatraidoPerc);
            this.#statusz = "Kiszallitva";
        } else {
            this.#hatraidoPerc = parseInt(hatraidoPerc);
        }
    };

    setStatusz(statusz) {
        if (statusz === "Kiszallitva") {
            this.#statusz = statusz;
            this.#hatraidoPerc = 0;
        } else {
            this.#statusz = statusz;
        }
    };
};