let montoCartera = 0;

let montoCripto = 0;
let montoAcciones = 0;
let montoBonos = 0;
let montoEtfs= 0;

let actLista = [];

class Activo {
    constructor(especie, unidades, precioIngreso, precioActual) {
        this.especie = especie;
        this.unidades = unidades;
        this.precioIngreso = precioIngreso;
        this.precioActual = precioActual;
        montoCartera += this.unidades * this.precioActual;
        actLista.push(this);
    }

    porcentajeDeCartera() {
        let x = Math.round(this.unidades * this.precioActual / montoCartera * 100);
        return (`${x}%`);        
    }

    variacion() {
        let z = Math.round((this.precioActual - this.precioIngreso) / this.precioIngreso * 100);
        return (`${z}%`);
    }
}

class Cripto extends Activo {
    constructor(especie, unidades, precioIngreso, precioActual) {
        super(especie, unidades, precioIngreso, precioActual)
        montoCripto += this.unidades * this.precioActual;
    }
    static porcentajeDeEspecie() {
        let x = Math.round(montoCripto / montoCartera * 100) ;
        return x;
    }
}
class Acciones extends Activo {
    constructor(especie, unidades, precioIngreso, precioActual) {
        super(especie, unidades, precioIngreso, precioActual)
        montoAcciones += this.unidades * this.precioActual;
    }
    static porcentajeDeEspecie() {
        let x = Math.round(montoAcciones / montoCartera * 100) ;
        return x;
    }
}
class Bonos extends Activo {
    constructor(especie, unidades, precioIngreso, precioActual) {
        super(especie, unidades, precioIngreso, precioActual)
        montoBonos += this.unidades * this.precioActual;
    }
    static porcentajeDeEspecie() {
        let x = Math.round(montoBonos / montoCartera * 100) ;
        return x;
    }
}
class Etfs extends Activo {
    constructor(especie, unidades, precioIngreso, precioActual) {
        super(especie, unidades, precioIngreso, precioActual)
        montoEtfs += this.unidades * this.precioActual;
    }
    static porcentajeDeEspecie() {
        let x = Math.round(montoEtfs / montoCartera * 100) ;
        return x;
    }
}

//PONER LOS DATOS EN SUS CLASES//
for (const i in datos) {
    if (i == 'Cripto') {
        for (const j of datos[i]) {
           new Cripto(j.especie, j.unidades, j.precioIngreso, j.precioActual)
        }
    }
    else if (i == 'Acciones') {
        for (const j of datos[i]) {
           new Acciones(j.especie, j.unidades, j.precioIngreso, j.precioActual)
        }
    }
    else if (i == 'Bonos') {
        for (const j of datos[i]) {
           new Bonos(j.especie, j.unidades, j.precioIngreso, j.precioActual)
        }
    }
    else if (i == 'ETFs') {
        for (const j of datos[i]) {
           new Etfs(j.especie, j.unidades, j.precioIngreso, j.precioActual)
        }
    }
}

////////////////////////////////// PIE CHART //////////////////////////////////

let carteraCanvas = document.getElementById("donut-chart__chart");

let actEspecies = ["Criptomonedas", "Acciones", "Bonos", "ETFs"];
let especiesColores = ["#e64c65", "#11a8ab", "#fcb150", "#4fc4f6"]

Chart.defaults.global.defaultFontFamily = "Ubuntu";
Chart.defaults.global.defaultFontSize = 18;

function RenderChart() {
    let especieData = [Cripto.porcentajeDeEspecie(), Acciones.porcentajeDeEspecie(), Bonos.porcentajeDeEspecie(), Etfs.porcentajeDeEspecie()];

    let actData = {
        labels: actEspecies,
        datasets: [
            {
                data: especieData,
                backgroundColor: especiesColores,
                borderColor : "#dbedf3"
            }]
    };

    new Chart(document.getElementById("donut-chart__chart"), {
        type: 'doughnut',
        data: actData,
        options: {
        legend: {
            display: false
        }
        }
    });
}

RenderChart();

////////////////////////////////// PIE CHART END //////////////////////////////////

/////////////////////////////////////// DOM ///////////////////////////////////////

function RenderEspPorcentajes() {
    document.getElementById("Cripto%").textContent = `${Cripto.porcentajeDeEspecie()}%`;
    document.getElementById("Acciones%").textContent = `${Acciones.porcentajeDeEspecie()}%`;
    document.getElementById("Bonos%").textContent = `${Bonos.porcentajeDeEspecie()}%`;
    document.getElementById("Etfs%").textContent = `${Etfs.porcentajeDeEspecie()}%`;
};

RenderEspPorcentajes();

if(actLista.length == 0) {
    document.getElementById('row1').className ="row justify-content-center align-items-center d-none";

    document.getElementById('wrapperForm').insertAdjacentHTML("afterbegin",`
        <h2 class="lista__titular rounded-sm" id="advertencia">Su Portafolio esta vacio, ingrese una nueva posicion</h2>
    `);
}

function RenderLista() {
    for (const i of actLista) {
        document.getElementById("tablaCuerpo").insertAdjacentHTML('beforeend',
        `<tr>
            <th scope="row"></th>
            <td class="text-left">${i.especie}</td>
            <td>${i.porcentajeDeCartera()}</td>
            <td>${i.variacion()}</td>
        </tr>`);
    }
}

RenderLista();

document.getElementById('form__btn').addEventListener("click", Validador);

function Validador() {
    if (document.getElementById('newEspecie').value && document.getElementById('newUnidades').value && document.getElementById('newPrecio').value != '') {
        Render();
    }
};

function Render() {
    let seleccionado = document.getElementById('ingresarOpciones').selectedIndex;

    if(actLista.length == 0) {
        document.getElementById('advertencia').remove();
    
        document.getElementById('row1').className ="row justify-content-center align-items-center";
    }

    let es = document.getElementById('newEspecie').value;
    let un = document.getElementById('newUnidades').value;
    let pn = document.getElementById('newPrecio').value;
    let pa = document.getElementById('newPrecio').value * 2;

    if (seleccionado === 0) {
        nuevo = new Cripto(es, un, pn, pa);        
    }
    else if (seleccionado === 1) {
        nuevo = new Acciones(es, un, pn, pa); 
    }
    else if (seleccionado === 2) {
        nuevo = new Bonos(es, un, pn, pa); 
    }
    else if (seleccionado === 3) {
        nuevo = new Etfs(es, un, pn, pa); 
    }    

    let listaNueva = document.createElement("tbody");
    listaNueva.id = "tablaCuerpo";
    document.getElementById('tablaCuerpo').replaceWith(listaNueva);
    
    RenderLista();

    document.getElementById('chartWrapper').remove();
    document.getElementById('donut-chart').insertAdjacentHTML('afterbegin',
        `<div class="wrapper" id="chartWrapper">
            <canvas id="donut-chart__chart"></canvas>
        </div>`
    );

    RenderChart(); 
    RenderEspPorcentajes();    
}

///////////////THEME///////////////
const btn = document.querySelector(".custom-control-input");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.toggle("dark-theme");
} else if (currentTheme == "light") {
  document.body.classList.toggle("light-theme");
}

btn.addEventListener("click", function () {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
    var theme = document.body.classList.contains("light-theme")
      ? "light"
      : "dark";
  } else {
    document.body.classList.toggle("dark-theme");
    var theme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";
  }
  localStorage.setItem("theme", theme);
});