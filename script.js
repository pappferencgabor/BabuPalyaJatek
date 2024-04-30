let mezok = [];
let babuk = [];
let bombak = [];
let szabad = [];

let mezokid = [];
let babukid = [];
let bombakid = [];
let szabadid = [];

const ELEMENTS = {
    sorokSzamaRange: document.getElementById("sorokSzama"),
    sorokSzamaSpan: document.getElementById("sorokSpan"),
    oszolopokSzamaRange: document.getElementById("oszlopokSzama"),
    oszolopokSzamaSpan: document.getElementById("oszlopokSpan"),
    palya: document.getElementById("playground"),
    babuFelveszButton: document.getElementById("felveszBtn"),
    inditasButton: document.getElementById("inditasBtn")
}

function Inditas() {
    UjBomba();
    ELEMENTS.inditasButton.disabled = true;

    setInterval(function(){
        //console.log(babukid);
        babukid.forEach(babu => {
            //console.log(babu);
            let index = parseInt(babu.split("f")[1]);
    
            let lehetseges = [index-5, index+1, index+5, index-1];
            console.log(lehetseges);
            let lepheto = [];
    
            lehetseges.forEach(mezo => {
                if (mezo > -1 || mezo < ELEMENTS.sorokSzamaRange.value*ELEMENTS.oszolopokSzamaRange.value) {
                    lepheto.push(mezo);
                }
            });
    
            console.log(lepheto);
    
            if (lepheto.length > 0) {
                let newindex = lepheto[Math.floor(Math.random() * lepheto.length)];
                //console.log(newindex);
    
                //document.getElementById(newindex).innerHTML = "a"
                document.getElementById(`f${newindex}`).innerHTML = document.getElementById(`f${index}`).innerHTML;
                document.getElementById(`f${index}`).innerHTML = "";

                //szabadid.push(newindex);
                babukid.splice(babukid.indexOf(`f${index}`), 1);
                babukid.push(`f${newindex}`)
                szabadid.push(`f${index}`)
            }
            else {
                document.getElementById(`f${index}`).innerHTML = "";

                szabadid.push(`f${index}`);
                babukid.splice(babukid.indexOf(`f${index}`), 1);

                console.log(babuk.indexOf(`f${index}`));

                babuk.splice(babuk.indexOf(`f${index}`), 1);
                //console.log(babuk);
            }
            console.log("============================");
        });
    }, 1000);
}

function JatekVege() {

}

function PalyaGeneralas() {
    let sorokszama = ELEMENTS.sorokSzamaRange.value;
    let oszolopokszama = ELEMENTS.oszolopokSzamaRange.value;
    let palya = ELEMENTS.palya;

    palya.innerHTML = "";
    mezok = []

    palya.style.gridTemplateColumns = `repeat(${oszolopokszama}, 1fr)`;
    palya.style.gridTemplateRows = `repeat(${sorokszama}, 1fr)`;

    for (let i = 0; i < sorokszama*oszolopokszama; i++) {
        let div = document.createElement("div");
        div.setAttribute("class", "field");
        div.setAttribute("id", `f${i}`);
        
        palya.appendChild(div);
        mezok.push(div);
        szabad.push(div);


        szabadid.push(`f${i}`);
        mezokid.push(`f${i}`);
    }
}

function UjBabu() {
    if ((babuk.length / mezok.length) < 0.5) {
        let babu = Letrehoz("babu", babuk.length);
        let mezo = szabad[Math.floor(Math.random() * szabad.length)]
    
        babuk.push(mezo.id);
        szabad.splice(szabad.indexOf(mezo), 1);

        szabadid.splice(szabadid.indexOf(mezo.id), 1);
        babukid.push(mezo.id);

        mezo.innerHTML += babu;
    }
    else {
        ELEMENTS.babuFelveszButton.disabled = true;
    }
}

function UjBomba() {
    let bombakSzama = Math.ceil(ELEMENTS.oszolopokSzamaRange.value * ELEMENTS.sorokSzamaRange.value * 0.1);
    
    if (bombakSzama <= szabad.length) {
        for (let i = 0; i < bombakSzama; i++) {
            let bomba = Letrehoz("bomba", i);
            let mezo = szabad[Math.floor(Math.random() * szabad.length)]
        
            bombak.push(mezo.id);
            szabad.splice(szabad.indexOf(mezo), 1)

            szabadid.splice(szabadid.indexOf(mezo.id), 1);
            bombakid.push(mezo.id);

            mezo.innerHTML += bomba;
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
        return `<div class="dummy" id="d${hanyadik}"></div>`
    } else if (mit == "bomba") {
        return `<div class="bomb" id="b${hanyadik}"></div>`
    }
}


console.log(9%4);
console.log(14%4);