const div = document.querySelector("#hraciaplocha")
const div_spodok = document.querySelector("#hraciaplocha_spodok")
let hoverOverElement;
let hoverOverElement_obrazok;
const uvod = document.getElementById("uvod")
const start = document.getElementById("start")
const main1 = document.getElementById("main1")
const spat = document.getElementById("spat")
const popis = document.getElementById("popis")
const popis_hry = document.getElementById("popis_hry")
const spat_popis = document.getElementById("spat_popis")
const spravne_riesenie = document.getElementById("napoveda")
const pomoc = document.getElementById("hraciaplocha_spodok_pomoc")
const riesenie = document.getElementById("riesenie")
const priklad_vysledok = document.getElementById("priklad_vysledok")
const priklad_priklad = document.getElementById("priklad_priklad")
const zivot = document.getElementById("zivot");
const uroven = document.getElementById("level");
const ukoncenie = document.getElementById("ukoncenie")
const ukonceni_text = document.getElementById("ukoncenie_text")

let pocet_zivotou = 3;
let cyklus;
let ktory = 0;
let koniec = 0;
let menuEnterTimer, menuLeaveTimer;
let mojjson;
let nums = [];
let vysledok_riesenia

function gotoLink(link){
    location.href = "pokyny.html";
}

/****************************************************************************************************************************************************************************************************************************/

var diffLevel = 0;
var priklady = ["./priklady/priklady1.json", "./priklady/priklady2.json", "./priklady/priklady3.json",];
var vysledky = ["./vysledky/vysledky1.json", "./vysledky/vysledky2.json", "./vysledky/vysledky3.json"];

var prikladyy = [`./priklady/priklady1/`, `./priklady/priklady2/`, `./priklady/priklady3/`,];
var vysledkyy = [`./vysledky/vysledky1/`, `./vysledky/vysledky2/`, `./vysledky/vysledky3/`];
/****************************************************************************************************************************************************************************************************************************/
/* EASY   MEDIUM   HARD TLACIDLO
/****************************************************************************************************************************************************************************************************************************/

let selectedItem1 = document.getElementById('easy');
let selectedItem2 = document.getElementById('medium');
let selectedItem3 = document.getElementById('hard');

function show(name) {
    document.getElementById(name).style.display = 'block';
}

function hide(name) {
    document.getElementById(name).style.display = 'none';

}

selectedItem1.onclick = function () {
    diffLevel = 1;
    show('medium');
    hide('easy');
    hide('hard');
}

selectedItem2.onclick = function () {
    diffLevel = 2;
    show('hard');
    hide('medium');
}

selectedItem3.onclick = function () {
    diffLevel = 0;
    show('easy');
    hide('hard');
}
/****************************************************************************************************************************************************************************************************************************/
/* EASY!   MEDIUM!   HARD TLACIDLO!
/****************************************************************************************************************************************************************************************************************************/


fetch(priklady[diffLevel])
        .then(response => response.json())
        .then(json => {
            mojjson = (Object.keys(json).length)
            for (let k = 0; k < mojjson; k++) {
                nums.push([k]);
            }
        })


function myFunc() {
    myFunc = function () { }; // kill it as soon as it was called
    localStorage.removeItem(cyklus)
    cyklus = [];

    let i = nums.length
    let j = 0;

    while (i--) {
        j = Math.floor(Math.random() * (i + 1));
        cyklus.push(nums[j]);
        nums.splice(j, 1);
    }
}
spravne_riesenie.addEventListener("click", function () {
    fetch(priklady[diffLevel])
        .then(res => res.json())
        .then(data => {
            data[cyklus[ktory]].forEach(image => {
                vysledok_riesenia = image.value;
            })
        })
    fetch(vysledky[diffLevel])
        .then(res => res.json())
        .then(data => {
            data[cyklus[ktory]].forEach(image => {
                if (image.value === vysledok_riesenia) {
                    riesenie.innerText = vysledok_riesenia;
                }
            })
        })
})

document.getElementById("znovu").addEventListener("click", function () {
    main1.style.display = "none";
    ukoncenie.style.display = "none";
    uvod.style.display = "flex";
    div.innerHTML = "";
    div_spodok.innerHTML = "";
    pocet_zivotou = 3;
    zivot.innerText = "❤️❤️❤️";
})

start.addEventListener("click", function () {

    main1.style.display = "flex"
    uvod.style.display = "none"
})

spat.addEventListener("click", function () {
    main1.style.display = "none"
    uvod.style.display = "flex"
})


function hlavny_cyklus_hry() {
    if (++koniec === 1) {
        myFunc();
        ktory_level(cyklus[ktory]);
    }
    else {
        return 0;
    }

}

function ktory_level(level){

    if (ktory === 10) {
        koniec = 0;
        ktory = 0;
        pocet_zivotou = 3;
        ukonceni_text.innerText = "Vyhral si Gratulujem"
        uroven.innerText = "Level: " + ktory;
        ukoncenie.style.display = "flex";
        zivot.innerText = "❤️❤️❤️";
    }
    else {
        fetch(vysledky[diffLevel])
            .then(res => res.json())
            .then(data => {
                data[level]
                    .forEach(addimages)
            })
        fetch(priklady[diffLevel])
            .then(res => res.json())
            .then(data => {
                data[level].forEach(image => {
                    const img = document.createElement("img");
                    img.src = prikladyy[diffLevel] + image.src;
                    img.value = image.value;
                    img.addEventListener("dragend", (event) => {
                        if (hoverOverElement === event.target.value) {
                            hoverOverElement_obrazok.style.display = "none"
                            img.style.display = "none"
                            div.innerHTML = "";
                            hoverOverElement_obrazok.style.border = "thick solid green"
                            uroven.innerText = "Level: " + ++ktory;
                            riesenie.innerText = "";
                            ktory_level(cyklus[ktory]);

                        } else {
                            hoverOverElement_obrazok.style.border = "medium solid red"
                            if (pocet_zivotou <= 1) {
                                koniec = 0;
                                ktory = 0;
                                pocet_zivotou = 4;
                                uroven.innerText = "Level: " + ktory;
                                ukonceni_text.innerText = "Prehral si"
                                ukoncenie.style.display = "flex";

                            }
                            if(pocet_zivotou === 3){
                                zivot.innerText = "❤️❤️";
                                --pocet_zivotou;
                            } else{
                                zivot.innerText = "❤️";
                                --pocet_zivotou;
                            }
                        }
                    })
                    img.addEventListener("touchstart", function () {
                        hoverOverElement = img.value;
                        hoverOverElement_obrazok = img;
                        hoverOverElement_obrazok.style.border = "medium solid green"
                    })
                    img.addEventListener('mouseenter', function () {
                        let thisItem = this;
                        clearTimeout(menuLeaveTimer);
                        thisItem.classList.remove('active');
                        menuEnterTimer = setTimeout(function () {
                            pomoc.style.display = "block";
                            pomoc.style.right = 80 + '%';
                            pomoc.style.top = 40 + '%';
                            thisItem.classList.add('active');
                        }, 500);

                    })

                    img.addEventListener('mouseleave', function () {
                        let thisItem = this;
                        clearTimeout(menuEnterTimer);
                        thisItem.classList.remove('active');
                        menuLeaveTimer = setTimeout(function () {
                            pomoc.style.display = "none";
                            pomoc.style.right = 0 + 'px';
                            pomoc.style.top = 0 + 'px';
                            thisItem.classList.add('active');
                        }, 100);
                    })
                    div_spodok.appendChild(img)
                })
            })
    }
}

const addimages = image => {
    const img = document.createElement("img")
    img.src = vysledkyy[diffLevel] + image.src;
    img.value = image.value;
    img.addEventListener("dragenter", function () {
        hoverOverElement = img.value
        hoverOverElement_obrazok = img;
    })
    img.addEventListener('touchend', e => {
        hoverOverElement_obrazok.style.border = "none"
        if (hoverOverElement === e.target.value) {
            hoverOverElement_obrazok.style.display = "none"
            img.style.display = "none"
            div.innerHTML = "";
            uroven.innerText = "Level: " + ++ktory;
            riesenie.innerText = "";
            ktory_level(cyklus[ktory]);
        }
        else {
            e.target.style.border = "medium solid red"
            if (pocet_zivotou <= 1) {
                koniec = 0;
                ktory = 0;
                pocet_zivotou = 3;
                zivot.innerText = "❤️❤️❤️";
                ukonceni_text.innerText = "Prehral si"
                ukoncenie.style.display = "flex";
                uroven.innerText = "Level: " + ktory;
            }
            if(pocet_zivotou === 3){
                zivot.innerText = "❤️❤️";
                --pocet_zivotou;
            } else{
                zivot.innerText = "❤️";
                --pocet_zivotou;
            }
        }
    })
    div.appendChild(img)
}



priklad_priklad.addEventListener("dragend", function () {
    priklad_vysledok.style.border = "medium solid green"
})
priklad_vysledok.addEventListener("dragenter", function () {

})
priklad_priklad.addEventListener("touchend", function () {

})
priklad_vysledok.addEventListener("touchstart", function () {
    priklad_vysledok.style.border = "medium solid green"
})

navigator.serviceWorker.register("./serviceworker.js")
    .then(function () {
        // console.log(reg)
    })
    .catch(function () {
        // console.log("error aaaa",err)
    })