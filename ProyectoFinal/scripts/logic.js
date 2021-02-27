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


function roundTwoDecimals(num) {
    num = num * 100;
    num = Math.round(num);
    num = num / 100;
    return num;
}

///////////////////////////////////////////AJAX///////////////////////////////////////////
function updateData(data, callback) {
    for (const a in data) {
        for (const s of data[a]) {
            $.ajax({
            url: `https://finnhub.io/api/v1/quote?symbol=${s.ticker}&token=c0hi55f48v6phn6t4k80`,
            type: "GET",
            crossDomain: true,
            success: function(response) {
                // console.log("success")    
                s.precioActual = response.c;
                s.cierreAnterior = response.pc;

                
                callback;

                $(".spinner-grow").hide();
            },
      
            error: function() {
                console.log("error");
            }
      
            });
        }
    }
};

// setInterval(() => {updateData(datos)}, 60000);

// setTimeout(updateData(datos),510)