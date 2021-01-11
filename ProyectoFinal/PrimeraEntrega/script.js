let montoCartera = 100000;

class Activo {
    constructor(especie, unidades, precioIngreso, precioActual) {
        this.especie = especie;
        this.unidades = unidades;
        this.precioIngreso = precioIngreso;
        this.precioActual = precioActual;
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

let activo0 = new Activo('Bitcoin', 1, 21000, 40000)

document.getElementById("act0e").textContent = activo0.especie;
document.getElementById("act0p").textContent = activo0.porcentajeDeCartera();
document.getElementById("act0v").textContent = activo0.variacion();


let carteraCanvas = document.getElementById("donut-chart__chart");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;

let actData = {
    labels: [
        "Criptomonedas",
        "Acciones",
        "Bonos",
        "Otros"
    ],
    datasets: [
        {
            data: [21, 48, 9, 32],
            backgroundColor: [
                "#e64c65",
                "#11a8ab",
                "#fcb150",
                "#4fc4f6"
            ]
        }]
};

let pieChart = new Chart(carteraCanvas, {
  type: 'doughnut',
  data: actData,
  options: {
    legend: {
        display: false
    }
  }
});