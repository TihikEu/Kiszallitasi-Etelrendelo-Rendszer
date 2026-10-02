var rendelesek = [
    new Rendeles("<strong>#</strong>0001", "Urmandczi Timea", "Vadasz utca 12., Tatabanya", "Futarnal"),
    new Rendeles("<strong>#</strong>0002", "Kovacs Bela", "Fo utca 12., Tatabanya", "Futarnal")
];

var rendelt_etelek = [
    new Etelek("Kincses Adam", 3490, 7),
    new Etelek("Margarita pizza", 3490, 43)
];

const $ = s => document.querySelector(s);

const SuccessModal = new bootstrap.Modal('#SuccessModal', {
    keyboard: false
});

const ErrorModal = new bootstrap.Modal('#ErrorModal', {
    keyboard: false
});

var torlendoId = -1, szerkesztId = -1;

function kiir() {
    statuszCheck();
    idRefress();

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
            if (statuszEgyezik(rendelesek[i]) && szovegEgyezik(rendelesek[i], rendelt_etelek[i])) x += tableSor(rendelesek[i], rendelt_etelek[i], i);
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

// Methodok: Status korigacio

function statuszCheck() {
    for (let i = 0; i < rendelesek.length; i++) {
        if (rendelt_etelek[i].getHatraidoPerc() < 1) {
            rendelesek[i].setStatusz("Kiszallitva");
        }
        if (rendelesek[i].getStatusz() == "Kiszallitva") {
            rendelt_etelek[i].setHatraidoPerc(0);
        }
    }
}

// Methodok: ID refress

function idRefress() {
    for (let i = 0; i < rendelesek.length; i++) {
        rendelesek[i].setId("<strong>#</strong>" + String(i + 1).padStart(4, "0"));
    }
}

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

// Methodok: Tabla tr

function tableSor(rendeles, rendelt_etelek, index) {
    var ido = rendelt_etelek.getHatraidoPerc() === 0 ? '<span class="fw-bold text-dark">—</span>' : rendelt_etelek.getHatraidoPerc() + " perc";
    return `<tr data-bs-toggle="modal" data-bs-target="#exampleModalToggle" onclick="idBeallit(${index})">
                <td class="form-text p-3">${rendeles.getId()}</td>
                <td class="form-text p-3">${rendeles.getUgyfelNev()}</td>
                <td class="form-text p-3">${rendeles.getCim()}</td>
                <td class="form-text p-3">${rendelt_etelek.getEtelNev()}</td>
                <td class="form-text p-3">${rendelt_etelek.getOsszeg()} Ft</td>
                <td class="form-text p-3">${ido}</td>
                <td class="form-text p-3">${rendeles.getStatusz()}</td>
            </tr>`;
};

// Methodok: Szallitasok osszeg

function szallitasokErteke() {
    var osszeg = 0;
    for (let i = 0; i < rendelesek.length; i++) {
        osszeg += Number(rendelt_etelek[i].getOsszeg());
    }
    $(".osszeg").innerHTML = "<span class='fs-4 fw-bold'>" + osszeg.toLocaleString("hu-HU", { style: "currency", currency: "HUF" }) + "</span>";
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
            ido += Number(rendelt_etelek[i].getHatraidoPerc());
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
    if (zonak.length != 0) {
        $(".szallitasiZonak").innerHTML = "<span class='fs-4 fw-bold'>" + zonak.length + "</span><br>Aktiv szallitasi zonak";
    } else {
        $(".szallitasiZonak").innerHTML = "<span class='fs-4 fw-bold'><i class='bi bi-dash-lg'></i></span><br>Aktiv szallitasi zonak";
    }
};

// Methodok: Legkozelebbi = legkisebb hatarido

function legkozelebbiHatarido() {
    var lgkHatarido = null;
    var lgkHatarId = "";

    for (let i = 0; i < rendelesek.length; i++) {
        var r = rendelt_etelek[i];
        if (rendelesek[i].getStatusz() != "Kiszallitva" && r.getHatraidoPerc() != 0) {
            if (lgkHatarido == null || r.getHatraidoPerc() < lgkHatarido.getHatraidoPerc()) {
                lgkHatarido = r;
                lgkHatarId = rendelesek[i].getId();
            }
        }
    }

    if (lgkHatarido == null) {
        $(".legkozelebbi-ido").innerHTML = "<span class='fs-4 fw-bold'><i class='bi bi-dash-lg'></i></span><br>Ido";
        $(".legkozelebbi-id").innerHTML = "<span class='fs-4 fw-bold'><i class='bi bi-dash-lg'></i></span><br>ID";
    } else {
        $(".legkozelebbi-ido").innerHTML = "<span class='fs-4 fw-bold'>" + lgkHatarido.getHatraidoPerc() + " p</span><br>Ido";
        $(".legkozelebbi-id").innerHTML = "<span class='fs-4 fw-bold'>" + lgkHatarId + "</span><br>ID";
    }
};

// Form reset

function urlapAlaphelyzet() {
    $(".ugyfelNev").value = "";
    $(".szallitasiCim").value = "";
    $(".statusz").value = "Keszul";

    $(".etelNev").value = "";
    $(".input_osszeg").value = "";
    $(".hataraidPerc").value = "";

    $(".hozzaadas").classList.remove("d-none");
    $(".mentes").classList.add("d-none");

    szerkesztId = -1;
    torlendoId = -1;
};

// Ai

$(".uj-rendeles").addEventListener("click", () => urlapAlaphelyzet());
$(".megse").addEventListener("click", () => urlapAlaphelyzet());

// Szerkesztes

$(".szerkeszt").addEventListener("click", () => {
    $(".ugyfelNev").value = rendelesek[szerkesztId].getUgyfelNev();
    $(".szallitasiCim").value = rendelesek[szerkesztId].getCim();
    $(".statusz").value = rendelesek[szerkesztId].getStatusz();

    $(".etelNev").value = rendelt_etelek[szerkesztId].getEtelNev();
    $(".input_osszeg").value = rendelt_etelek[szerkesztId].getOsszeg();
    $(".hataraidPerc").value = rendelt_etelek[szerkesztId].getHatraidoPerc();

    $(".hozzaadas").classList.add("d-none");
    $(".mentes").classList.remove("d-none");
});

// Input ellenorzes

function inputUres(x, y) {
    if (String(x) === "") {
        return "<p>A(z) <strong>'" + y + "'</strong> input nem lehet ures!</p>";
    }
    return "";
};

// Input ellenorzes: String

function szovegesInputEllenoriz(x, y) {
    var jo = true;
    var helyesek = " .,-0123456789áéíóöőúüű";

    for (let i = 0; i < x.length; i++) {
        var betu = x[i].toLowerCase();
        var angolBetu = (betu >= "a" && betu <= "z");

        if (!angolBetu && !helyesek.includes(betu)) {
            jo = false;
        }
    }

    if (!jo) {
        return "<p>A(z) <strong>'" + y + "'</strong> input csak a magyar abc kis- es nagybetuit, szamokat, SPACE-t, kotojelet '-', pontot '.' es vesszot ',' tartalmazhat!</p>";
    } else {
        return "";
    }
}

// Input ellenorzes: Number

function egeszSzam(x, y) {
    if (!Number.isInteger(Number(x))) {
        return "<p>A(z) <strong>'" + y + "'</strong> input csak egesz szam lehet!</p>";
    } else {
        return "";
    }
};

// Input ellenorzes: Form

function urlapEllenoriz(rendelo_neve, rendelo_cime, etel_neve, etel_ara, etel_ido) {
    var hiba = "";

    var szovegesek = [
        [rendelo_neve, "Megrendelo Neve"],
        [rendelo_cime, "Kiszallitas cim"],
        [etel_neve, "Etel neve"]
    ];

    for (let [ertek, nev] of szovegesek) {
        hiba += inputUres(ertek, nev) || szovegesInputEllenoriz(ertek, nev);
    }

    var szamok = [
        [etel_ara, "Osszeg ( Ft )"],
        [etel_ido, "Kiszallitasi Ido ( Perc )"]
    ];

    for (let [ertek, nev] of szamok) {
        hiba += inputUres(ertek, nev) || egeszSzam(ertek, nev);
    }

    $("#ErrorModal .modal-body").innerHTML = hiba;
    return hiba === "";
};

// Mentes

$(".mentes").addEventListener("click", () => {
    var rendelo_neve = $(".ugyfelNev").value;
    var rendelo_cime = $(".szallitasiCim").value;
    var rendeles_statusza = $(".statusz").value;

    var etel_neve = $(".etelNev").value;
    var etel_ara = $(".input_osszeg").value;
    var etel_ido = $(".hataraidPerc").value;

    var valtozott = (
        rendelo_neve !== rendelesek[szerkesztId].getUgyfelNev() ||
        rendelo_cime !== rendelesek[szerkesztId].getCim() ||
        rendeles_statusza !== rendelesek[szerkesztId].getStatusz() ||

        etel_neve !== rendelt_etelek[szerkesztId].getEtelNev() ||
        Number(etel_ara) !== Number(rendelt_etelek[szerkesztId].getOsszeg()) ||
        Number(etel_ido) !== Number(rendelt_etelek[szerkesztId].getHatraidoPerc())
    );

    var helyes = urlapEllenoriz(rendelo_neve, rendelo_cime, etel_neve, etel_ara, etel_ido);

    if (helyes && !valtozott) {
        $("#ErrorModal .modal-body").innerHTML = "<p class='m-0'>Nem tortent szerkesztes!</p>";
        ErrorModal.show();
    } else if (helyes && valtozott) {
        rendelesek[szerkesztId].setUgyfelNev(rendelo_neve);
        rendelesek[szerkesztId].setCim(rendelo_cime);
        rendelesek[szerkesztId].setStatusz(rendeles_statusza);

        rendelt_etelek[szerkesztId].setEtelNev(etel_neve);
        rendelt_etelek[szerkesztId].setOsszeg(Number(etel_ara));
        rendelt_etelek[szerkesztId].setHatraidoPerc(Number(etel_ido));

        $("#SuccessModal .modal-title").innerHTML = "Mentes";
        $("#SuccessModal .modal-body").innerHTML = "<p class='m-0'>Sikeresen mentve!</p>";

        urlapAlaphelyzet();
        kiir();

        SuccessModal.show();
    } else {
        ErrorModal.show();
    }
});

// Torles

function idBeallit(i) {
    $("#exampleModalToggle .modal-body").innerHTML = `<p class="m-0">Rendeles ID: ${rendelesek[i].getId()}</p>`;

    torlendoId = i;
    szerkesztId = i;
};

$(".torol").addEventListener("click", () => {
    rendelesek.splice(torlendoId, 1);
    rendelt_etelek.splice(torlendoId, 1);

    torlendoId = -1;
    szerkesztId = -1;
    kiir();
});

// Uj rendeles hozzaadas

$(".hozzaadas").addEventListener("click", () => {
    var rendelo_neve = $(".ugyfelNev").value;
    var rendelo_cime = $(".szallitasiCim").value;
    var rendeles_statusza = $(".statusz").value;

    var etel_neve = $(".etelNev").value;
    var etel_ara = $(".input_osszeg").value;
    var etel_ido = $(".hataraidPerc").value;

    var helyes = urlapEllenoriz(rendelo_neve, rendelo_cime, etel_neve, etel_ara, etel_ido);

    if (helyes) {
        var rendeles = new Rendeles(rendelesId(), rendelo_neve, rendelo_cime, rendeles_statusza);
        var etel = new Etelek(etel_neve, Number(etel_ara), Number(etel_ido));

        rendelesek.push(rendeles);
        rendelt_etelek.push(etel);

        urlapAlaphelyzet();
        kiir();

        $("#SuccessModal .modal-title").innerHTML = "Sikeres felvétel!";
        $("#SuccessModal .modal-body").innerHTML = "<p>Sikeresen hozzáadtuk a(z) <span class='success_rendeles'>" + rendeles.getId() + "</span> rendelést a listába!</p>";

        SuccessModal.show();
    } else {
        ErrorModal.show();
    }
});

// Kereses

function statuszEgyezik(r) {
    return $(".keres-select").value === "Osszes" || $(".keres-select").value === r.getStatusz();
};

function szovegEgyezik(r, e) {
    var kereses = $(".kereses").value.trim().toLowerCase();
    return kereses === ""
        || r.getUgyfelNev().toLowerCase().includes(kereses)
        || r.getCim().toLowerCase().includes(kereses)
        || e.getEtelNev().toLowerCase().includes(kereses);
};

// Kereses esemenyek | Ai

$(".keres-select").addEventListener("change", kiir);
if ($(".kereses")) $(".kereses").addEventListener("input", kiir);

kiir();