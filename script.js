let listMezok = [];
let listSzabadok = [];
let listBabuk = [];
let listBombak = [];

const ELEMENTS = {
    sorokSzamaRange: document.getElementById("sorokSzama"),
    sorokSzamaSpan: document.getElementById("sorokSpan"),
    oszolopokSzamaRange: document.getElementById("oszlopokSzama"),
    oszolopokSzamaSpan: document.getElementById("oszlopokSpan"),
    palya: document.getElementById("playground"),
    babuFelveszButton: document.getElementById("felveszBtn"),
    inditasButton: document.getElementById("inditasBtn"),
    logUl: document.getElementById("log")
}

function Inditas() {
    UjBomba();
    ELEMENTS.inditasButton.disabled = true;

    let interval = setInterval(function(){
        let babbukszama = listBabuk.length;
        if (babbukszama === 0) {
            clearInterval(interval);
            return;
        }

        let ujBabuk = {}; // Ideiglenes tároló az új bábuk pozícióinak

        for (let i = 0; i < babbukszama; i++) {
            let babu = listBabuk[i];
            let col = parseInt(document.getElementById(`mezo${babu}`).style.gridColumn);
            let row = parseInt(document.getElementById(`mezo${babu}`).style.gridRow);
            let mezo = `${col}-${row}`;

            let lehetseges = [
                `${col}-${row - 1}`,
                `${col + 1}-${row}`,
                `${col}-${row + 1}`,
                `${col - 1}-${row}`
            ];

            let lepheto = [];

            lehetseges.forEach(mezo => {
                if (listMezok.includes(mezo) && !listBabuk.includes(mezo)) {
                    lepheto.push(mezo);
                }
            });

            if (lepheto.length > 0) {
                let newmezo = lepheto[Math.floor(Math.random() * lepheto.length)];

                if (listBombak.includes(newmezo)) {
                    // Ha bombára lépett, a bábu eltűnik
                    ELEMENTS.logUl.innerHTML += `<li></li>`
                    document.getElementById(`mezo${mezo}`).innerHTML = "";
                } else {
                    // Ha üres mezőre lépett, mozgatjuk a bábut
                    document.getElementById(`mezo${newmezo}`).innerHTML = document.getElementById(`mezo${mezo}`).innerHTML;
                    document.getElementById(`mezo${mezo}`).innerHTML = "";

                    ujBabuk[babu] = newmezo;
                }
            }
        }

        // Frissítjük a listBabuk tömböt az új pozíciókkal
        Object.keys(ujBabuk).forEach(babu => {
            listBabuk.splice(listBabuk.indexOf(babu), 1);
            listBabuk.push(ujBabuk[babu]);
        });

        // Ellenőrizzük az utolsó bábú helyzetét
        if (listBabuk.length === 1 && listBombak.includes(listBabuk[0])) {
            // Ha az utolsó bábú bombára lép, akkor játék vége
            clearInterval(interval);
        }
    }, 2000);
}






function JatekVege() {

}

function PalyaGeneralas() {
    let sorokszama = ELEMENTS.sorokSzamaRange.value;
    let oszolopokszama = ELEMENTS.oszolopokSzamaRange.value;
    let palya = ELEMENTS.palya;

    palya.innerHTML = "";
    mezok = []

    palya.style.gridTemplateRows = `repeat(${sorokszama}, 1fr)`;
    palya.style.gridTemplateColumns = `repeat(${oszolopokszama}, 1fr)`;

    let babuindex = 0;
    for (let sorIndex = 0; sorIndex < sorokszama; sorIndex++) {
        for (let oszlopIndex = 0; oszlopIndex < oszolopokszama; oszlopIndex++) {
            let div = document.createElement("div");
            div.setAttribute("class", "field");
            div.setAttribute("id", `mezo${oszlopIndex+1}-${sorIndex+1}`);

            div.style.gridColumn = `${oszlopIndex+1} / span 1`;
            div.style.gridRow = `${sorIndex+1} / span 1`;

            console.log(oszlopIndex+1, sorIndex+1);

            listMezok.push(`${oszlopIndex+1}-${sorIndex+1}`);
            listSzabadok.push(`${oszlopIndex+1}-${sorIndex+1}`);
            
            palya.appendChild(div);

            babuindex++;
        }
    }
}

function UjBabu() {
    if ((listBabuk.length / listMezok.length) < 0.5) {
        let babu = Letrehoz("babu", listBabuk.length);
        let mezo = listSzabadok[Math.floor(Math.random() * listSzabadok.length)];

        listBabuk.push(mezo);
        listSzabadok.splice(listSzabadok.indexOf(mezo), 1);

        document.getElementById(`mezo${mezo}`).innerHTML += babu;
    }
    else {
        ELEMENTS.babuFelveszButton.disabled = true;
    }
}

function UjBomba() {
    let bombakSzama = Math.ceil(ELEMENTS.oszolopokSzamaRange.value * ELEMENTS.sorokSzamaRange.value * 0.1);
    
    if (bombakSzama <= listSzabadok.length) {
        for (let i = 0; i < bombakSzama; i++) {
            let bomba = Letrehoz("bomba", i);
            let mezo = listSzabadok[Math.floor(Math.random() * listSzabadok.length)]
        
            listBombak.push(mezo);
            listSzabadok.splice(listSzabadok.indexOf(mezo), 1)

            document.getElementById(`mezo${mezo}`).innerHTML += bomba;
        }
    }
    else {
        alert("ha ezt látni, akkor baj van xd")
    }
}

function ModositSpan(elem) {
    if (elem.id == "oszlopokSzama") { ELEMENTS.oszolopokSzamaSpan.innerHTML = elem.value; }
    else if (elem.id == "sorokSzama") { ELEMENTS.sorokSzamaSpan.innerHTML = elem.value; }
}

function Letrehoz(mit, hanyadik) {
    if (mit == "babu") {
        return `<div class="dummy"></div>`
    } else if (mit == "bomba") {
        return `<div class="bomb"></div>`
    }
}