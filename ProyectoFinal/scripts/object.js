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

    borrar() {
        let isNumber = (element) => element.especie === this.especie;
        let iOd = actLista.findIndex(isNumber);
        actLista.splice(iOd, 1);

        if (this instanceof Cripto) {
            montoCripto -= (this.precioActual * this.unidades);
            let inxOfList = criptoLista.findIndex(isNumber);
            criptoLista.splice(inxOfList,1);
        }
        else if (this instanceof Acciones) {
            montoAcciones -= (this.precioActual * this.unidades);
            let inxOfList = accionesLista.findIndex(isNumber);
            accionesLista.splice(inxOfList,1);
        }
        else if (this instanceof Bonos) {
            montoBonos -= (this.precioActual * this.unidades);
            let inxOfList = bonosLista.findIndex(isNumber);
            bonosLista.splice(inxOfList,1);
        }
        else if (this instanceof Etfs) {
            montoEtfs -= (this.precioActual * this.unidades);
            let inxOfList = etfsLista.findIndex(isNumber);
            etfsLista.splice(inxOfList,1);
        }
        montoCartera -= (this.unidades * this.precioActual)
    }
}

class Cripto extends Activo {
    constructor(especie, unidades, precioIngreso, precioActual) {
        super(especie, unidades, precioIngreso, precioActual)
        montoCripto += this.unidades * this.precioActual;
        criptoLista.push(this);
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
        accionesLista.push(this);
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
        bonosLista.push(this);
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
        etfsLista.push(this);
    }
    static porcentajeDeEspecie() {
        let x = Math.round(montoEtfs / montoCartera * 100) ;
        return x;
    }
}