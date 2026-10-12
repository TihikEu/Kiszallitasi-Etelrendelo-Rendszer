
// Tihi tesztelése: Levente osztályábol = Etelek.js

var etel = new Etelek("Kincses Adam", 3490, 1);

console.assert(etel.toString() === "Kincses Adam: 3490 Ft | 1 perc", "Hiba: a toString() metodusban! Lehetseges hibak: getter/setter metodusok vagy a costructor-ban rosszul meghivott setterek!");

// Levente tesztelése: Tihi osztályábol = Rendeles.js

var rendeles = new Rendeles("<strong>#</strong>0001", "Urmandczi Timea", "Vadasz utca 12., Tatabanya", "Keszul");

console.assert(rendeles.toString() === "<strong>#</strong>0001 Urmandczi Timea : Vadasz utca 12., Tatabanya | Keszul", "A konstruktor használata sikertelen volt!")

console.assert(rendeles.getId() === "<strong>#</strong>0001", "Hiba található a getId() függvény használatakor!")
console.assert(rendeles.getId() !== "0001", "Hiba található a getId() függvény használatakor!")

console.assert(rendeles.getUgyfelNev() === "Urmandczi Timea", "Hiba található a getUgyfelNev() függvény használatakor!")
console.assert(rendeles.getUgyfelNev() !== "Urmandczi Anna Timea", "Hiba található a getUgyfelNev() függvény használatakor!")

console.assert(rendeles.getCim() === "Vadasz utca 12., Tatabanya", "Hiba található a getCim() függvény használatakor!")
console.assert(rendeles.getCim() !== "Tata", "Hiba található a getCim() függvény használatakor!")

console.assert(rendeles.getStatusz() === "Keszul", "Hiba található a getStatusz() függvény használatakor!")
console.assert(rendeles.getStatusz() !== "Futarnal", "Hiba található a getStatusz() függvény használatakor!")

rendeles.setId("<strong>#</strong>0002")
console.assert(rendeles.getId() === "<strong>#</strong>0002", "Hiba található a setId() függvény használatakor!")
console.assert(rendeles.getId() !== "<strong>#</strong>0001", "Hiba található a setId() függvény használatakor!")

rendeles.setUgyfelNev("Kovacs Peter")
console.assert(rendeles.getUgyfelNev() === "Kovacs Peter", "Hiba található a setUgyfelNev() függvény használatakor!")
console.assert(rendeles.getUgyfelNev() !== "Urmandczi Timea", "Hiba található a setUgyfelNev() függvény használatakor!")

rendeles.setCim("Réti u. 1-5., Tatabanya")
console.assert(rendeles.getCim() === "Réti u. 1-5., Tatabanya", "Hiba található a setCim() függvény használatakor!")
console.assert(rendeles.getCim() !== "Vadasz utca 12., Tatabanya", "Hiba található a setCim() függvény használatakor!")

rendeles.setStatusz("Futarnal")
console.assert(rendeles.getStatusz() === "Futarnal", "Hiba található a setStatusz() függvény használatakor!")
console.assert(rendeles.getStatusz() !== "Keszul", "Hiba található a setStatusz() függvény használatakor!")
