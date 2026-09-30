var rendelesek = [
    new Rendeles("<strong>#</strong>0001", "Kovacs Bela", "Fo utca 12., Tatabanya", "Margherita pizza", 3490, 7, "Futarnal")
];

const $ = s => document.querySelector(s);

function kiir() {
    szallitasokErteke();
    aktivSzallitasok();
    atlagIdo();
    szallitasiZonak();
    legkozelebbiHatarido();

    $("tbody").innerHTML = "";

    if (rendelesek.length != 0) {
        $("tbody").classList.remove("d-none");
        $(".nincs-rendeles").classList.add("d-none");
        var x = "";
        for (let i = 0; i < rendelesek.length; i++) {
            if (statuszEgyezik(rendelesek[i]) && szovegEgyezik(rendelesek[i], i)) x += tableSor(rendelesek[i], i);
        }
        if (x.length !== 0) {
            $("tbody").innerHTML = x;
        } else {
            $("tbody").classList.add("d-none");
            $(".nincs-rendeles").innerHTML = "Nincs Talalat!";
            $(".nincs-rendeles").classList.remove("d-none");
        }
    } else {
        $("tbody").classList.add("d-none");
        $(".nincs-rendeles").innerHTML = "Nincs Rendeles!";
        $(".nincs-rendeles").classList.remove("d-none");
    }
};

// Methodok

// Methodok: Rendeles ID

var rId = (rendelesek.length + 1);

function rendelesId() {
    var x = "<strong>#</strong>";
    for (let i = 0; i < (4 - String(rId).length); i++) {
        x += "0";
    }
    x += String(rId);
    rId++;
    return x;
};

// Methodok: Tabla tr + rendelesId()

function tableSor(rendeles) {
    var ido = rendeles.getHatraidoPerc() === 0 ? '<span class="fw-bold text-dark">—</span>' : rendeles.getHatraidoPerc() + " perc";
    return `<tr data-bs-toggle="modal" data-bs-target="#exampleModalToggle">
                <td class="form-text p-3">${rendeles.getId()}</td>
                <td class="form-text p-3">${rendeles.getUgyfelNev()}</td>
                <td class="form-text p-3">${rendeles.getCim()}</td>
                <td class="form-text p-3">${rendeles.getEtelNev()}</td>
                <td class="form-text p-3">${rendeles.getOsszeg()} Ft</td>
                <td class="form-text p-3">${ido}</td>
                <td class="form-text p-3">${rendeles.getStatusz()}</td>
            </tr>`;
};

// Methodok: Szallitasok osszeg

function szallitasokErteke() {
    var osszeg = 0;
    for (let i = 0; i < rendelesek.length; i++) {
        osszeg += rendelesek[i].getOsszeg();
    }
    $(".osszeg").innerHTML = "<span class='fs-4 fw-bold'>" + osszeg.toLocaleString("hu-HU", { style: "currency", currency: "HUF" });
};

// Methodok: Aktiv szallitasok

function aktivSzallitasok() {
    var db = 0, futarDb = 0;
    for (let i = 0; i < rendelesek.length; i++) {
        if (rendelesek[i].getStatusz() === "Keszul") db++;
        else if (rendelesek[i].getStatusz() === "Futarnal") db++, futarDb++;
    }
    if (db !== 0) {
        $(".aktiv").innerHTML = "<span class='fs-4 fw-bold'>" + db + "</span><br>Aktiv";
    } else {
        $(".aktiv").innerHTML = "<span class='fs-4 fw-bold'><i class='bi bi-dash-lg'></i></span><br>Aktiv";
    }
    if (futarDb !== 0) {
        $(".futar").innerHTML = "<span class='fs-4 fw-bold'>" + futarDb + "</span><br>Futarnal";
    } else {
        $(".futar").innerHTML = "<span class='fs-4 fw-bold'><i class='bi bi-dash-lg'></i></span><br>Futarnal";
    }
};

// Methodok: Atlagido

function atlagIdo() {
    var ido = 0;
    var db = 0;
    for (let i = 0; i < rendelesek.length; i++) {
        if (rendelesek[i].getStatusz() !== "Kiszallitva") {
            ido += rendelesek[i].getHatraidoPerc();
            db++;
        }
    }
    var atlag = parseInt(ido / db);
    if (isNaN(atlag)) {
        $(".atlagIdo").innerHTML = "<span class='fs-4 fw-bold'><i class='bi bi-dash-lg fw-bold'></i></span><br>Atlagos hatralevo ido";
    } else {
        $(".atlagIdo").innerHTML = "<span class='fs-4 fw-bold'>" + atlag + " p</span><br>Atlagos hatralevo ido";
    }
};

// Methodok: Szallitasi zonak

function szallitasiZonak() {
    var zonak = [];
    for (let i = 0; i < rendelesek.length; i++) {
        var r = rendelesek[i];
        if (!zonak.includes(r.getCim())) {
            zonak.push(r.getCim());
        }
    }
    if (zonak.length !== 0) {
        $(".szallitasiZonak").innerHTML = "<span class='fs-4 fw-bold'>" + zonak.length + "</span><br>Aktiv szallitasi zonak";
    } else {
        $(".szallitasiZonak").innerHTML = "<span class='fs-4 fw-bold'><i class='bi bi-dash-lg'></i></span><br>Aktiv szallitasi zonak";
    }
};

// Methodok: Legkozelebbi = legkisebb hatarido

function legkozelebbiHatarido() {
    var lgkHatarido = null;

    for (let i = 0; i < rendelesek.length; i++) {
        var r = rendelesek[i];
        if (r.getStatusz() != "Kiszallitva" && r.getHatraidoPerc() != 0) {
            if (lgkHatarido == null || r.getHatraidoPerc() < lgkHatarido.getHatraidoPerc()) {
                lgkHatarido = r;
            }
        }
    }

    if (lgkHatarido == null) {
        $(".legkozelebbi-ido").innerHTML = "<span class='fs-4 fw-bold'><i class='bi bi-dash-lg'></i></span><br>Ido";
        $(".legkozelebbi-id").innerHTML = "<span class='fs-4 fw-bold'><i class='bi bi-dash-lg'></i></span><br>ID";
    } else {
        $(".legkozelebbi-ido").innerHTML = "<span class='fs-4 fw-bold'>" + lgkHatarido.getHatraidoPerc() + " p</span><br>Ido";
        $(".legkozelebbi-id").innerHTML = "<span class='fs-4 fw-bold'>" + lgkHatarido.getId() + "</span><br>ID";
    }
};

// Torles

var torlendoId = -1;

function idBeallit(i) {
    torlendoId = i;
};

$(".torol").addEventListener("click", () => {
    rendelesek.splice(torlendoId, 1);
    kiir();
});

// Kereses

function statuszEgyezik(r) {
    return $(".keres-select").value === "Osszes" || $(".keres-select").value === r.getStatusz();
};

function szovegEgyezik(r) {
    var kereses = $(".kereses").value.trim().toLowerCase();
    return kereses === ""
        || r.getUgyfelNev().toLowerCase().includes(kereses)
        || r.getCim().toLowerCase().includes(kereses)
        || r.getEtelNev().toLowerCase().includes(kereses);
};

// Ai

$(".keres-select").addEventListener("change", kiir);
if ($(".kereses")) $(".kereses").addEventListener("input", kiir);

//

kiir();