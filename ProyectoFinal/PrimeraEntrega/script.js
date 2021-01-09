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