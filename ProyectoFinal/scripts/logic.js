////////////////////////////////LEER SI EXISTEN DATOS ALMACENADOS////////////////////////////////
if (localStorage.cartera != undefined) {    
    leerDatos(JSON.parse(localStorage.cartera));
}

/////////////////////////////////PONER LOS DATOS EN SUS CLASES//////////////////////////////////
function leerDatos(data){
    for (const i in data) {
        if (i == 'Cripto') {
            for (const j of data[i]) {
               new Cripto(j.especie, j.unidades, j.precioIngreso, j.precioActual)
            }
        }
        else if (i == 'Acciones') {
            for (const j of data[i]) {
               new Acciones(j.especie, j.unidades, j.precioIngreso, j.precioActual)
            }
        }
        else if (i == 'Bonos') {
            for (const j of data[i]) {
               new Bonos(j.especie, j.unidades, j.precioIngreso, j.precioActual)
            }
        }
        else if (i == 'ETFs') {
            for (const j of data[i]) {
               new Etfs(j.especie, j.unidades, j.precioIngreso, j.precioActual)
            }
        }
    }
}

////////////////////////////////////GUARDAR LOS DATOS////////////////////////////////////
function saveData() {
    let datosLocales = {
        "Cripto": criptoLista,
        "Acciones": accionesLista,
        "Bonos": bonosLista,
        "ETFs": etfsLista
    }
    localStorage.setItem('cartera', JSON.stringify(datosLocales));
}