class Etelek{
    #etelNev;
    #osszeg;
    #hatraidoPerc;

    constructor(etelnev, osszeg, hatraidoPerc){
        this.setEtelNev(etelnev);
        this.setOsszeg(osszeg);
        this.setHatraidoPerc(hatraidoPerc);
    }

    // Getterek

    getEtelNev() {
        return this.#etelNev;
    };
    getOsszeg() {
        return this.#osszeg;
    };
    getHatraidoPerc() {
        return this.#hatraidoPerc;
    };

    // Setterek

    setEtelNev(etelNev) {
        this.#etelNev = etelNev;
    };

    setOsszeg(osszeg) {
        this.#osszeg = parseInt(osszeg);
    };

    setHatraidoPerc(hatraidoPerc) {
        this.#hatraidoPerc = parseInt(hatraidoPerc);
        
    };


}