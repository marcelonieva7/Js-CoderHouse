////////////////////////////////// PIE CHART //////////////////////////////////
function RenderChart() {
    $('#chartWrapper').replaceWith(
        `<div class="wrapper" id="chartWrapper">
            <canvas id="donut-chart__chart"></canvas>
        </div>`
    );

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

    new Chart($("#donut-chart__chart"), {
        type: 'doughnut',
        data: actData,
        options: {
            legend: {
                display: false
            }
        }
    });
}

/////////////////////////////////////// ALERTA DE CARTERA VACIA  ///////////////////////////////////////

const alertEmpty = `<h2 class="lista__titular rounded-sm col-10 b-shadow offset-md-1 emptyAlert" id="advertencia">Su Portafolio esta vacio, ingrese una nueva posicion</h2>`;

function checkEmptyList() {
    if (actLista.length === 0) {
        $('#row1-col').toggleClass("d-none", true);
        $('#row1-col2').toggleClass("d-none", true);
        $('#row4-col').toggleClass("d-none", true);
    
        $('#row1').append(alertEmpty);
        $('#row4').append(alertEmpty);
    }
}

;

/////////////////////////////////////// PORCENTAJES POR TIPO DE ESPECIE ///////////////////////////////////////

function RenderEspPorcentajes() {
    $(".esp-percentages").show();
    Cripto.porcentajeDeEspecie() === 0 ? $("#Cripto\\%").parent().toggleClass("d-none", true) : ($("#Cripto\\%").parent().toggleClass("d-none", false), $("#Cripto\\%").text(`${Cripto.porcentajeDeEspecie()}%`));
    Acciones.porcentajeDeEspecie() === 0 ? $("#Acciones\\%").parent().toggleClass("d-none", true) : ($("#Acciones\\%").parent().toggleClass("d-none", false), $("#Acciones\\%").text(`${Acciones.porcentajeDeEspecie()}%`));
    Bonos.porcentajeDeEspecie() === 0 ? $("#Bonos\\%").parent().toggleClass("d-none", true) : ($("#Bonos\\%").parent().toggleClass("d-none", false), $("#Bonos\\%").text(`${Bonos.porcentajeDeEspecie()}%`));
    Etfs.porcentajeDeEspecie() === 0 ? $("#Etfs\\%").parent().toggleClass("d-none", true) : ($("#Etfs\\%").parent().toggleClass("d-none", false), $("#Etfs\\%").text(`${Etfs.porcentajeDeEspecie()}%`));
};

/////////////////////////////////////// LISTA RESUMEN POR TIPO DE ESPECIE ///////////////////////////////////////

function renderTypeOf() {
    if (criptoLista.length !== 0) {
        $(`#typeCriptoRow`).remove();
        $("#typeBody").append(
            `<tr id="typeCriptoRow">
                <th scope="row" class="text-left">Criptomonedas</th>
                <td class="text-center">$${roundTwoDecimals(montoCripto)}</td>
                <td class="text-center">${Cripto.porcentajeDeEspecie()}%</td>
            </tr>
        `);
    }
    else {
        $(`#typeCriptoRow`).remove()
    }
    if (accionesLista.length !== 0) {
        $(`#typeAccionesRow`).remove();
        $(`#typeBody`).append(
            `<tr id="typeAccionesRow">
                <th scope="row" class="text-left">Acciones</th>
                <td class="text-center">$${roundTwoDecimals(montoAcciones)}</td>
                <td class="text-center">${Acciones.porcentajeDeEspecie()}%</td>
            </tr>
        `);
    }
    else {
        $(`#typeAccionesRow`).remove()
    }
    if (bonosLista.length !== 0) {
        $("#typeBonosRow").remove();
        $(`#typeBody`).append(
            `<tr id="typeBonosRow">
                <th scope="row" class="text-left">Bonos</th>
                <td class="text-center">$${roundTwoDecimals(montoBonos)}</td>
                <td class="text-center">${Bonos.porcentajeDeEspecie()}%</td>
            </tr>
        `);
    }
    else {
        $("#typeBonosRow").remove()
    }
    if (etfsLista.length !== 0) {
        $("#typeEtfsRow").remove();
        $(`#typeBody`).append(
            `<tr id="typeEtfsRow">
                <th scope="row" class="text-left">Etfs</th>
                <td class="text-center">$${roundTwoDecimals(montoEtfs)}</td>
                <td class="text-center">${Etfs.porcentajeDeEspecie()}%</td>
            </tr>
        `);
    }
    else {
        $("#typeEtfsRow").remove()
    }
}

/////////////////////////////////////// COTIZACIONES ///////////////////////////////////////

function renderModal(data, i, type) {
    let id = 0;
    $(`#${type}List--Body`).empty();
    for (const j of data[i]) {
        $(`#${type}List--Body`).append(
            `<tr>
                <th scope="row" class="text-left">${j.especie}</th>
                <td class="text-center">${j.precioActual}</td>
                <td class="text-center">${j.cierreAnterior}</td>
                <td class="text-center"><button type="button" id="btn${id}-${type}" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">...</button></td>
            </tr>
            `);
        $(`#btn${id}-${type}`).on("click", function() {
            x = $("#ingresarOpciones1");
            type === "cripto" ? x.prop('selectedIndex', 0) : type === "acciones" ? x.prop('selectedIndex', 1): type === "bonos" ? x.prop('selectedIndex', 2) : x.prop('selectedIndex', 3) ;
            $("#newEspecie1").val(j.especie);
            $("#newPrecio1").val(j.precioActual);
        });
        
        id += 1;            
    }
}

function renderCotizaciones() {
    for (const i in datos) {
        if (i === 'Cripto') {
            renderModal(datos, i, "cripto");
        }
        else if (i === 'Acciones') {
            renderModal(datos, i, "acciones");
        }
        else if (i === 'Bonos') {
            renderModal(datos, i, "bonos");
        }
        else if (i === 'ETFs') {
            renderModal(datos, i, "ETFs");
        }
    }
}

/////////////////////////////////////// AGREGAR TENENCIA ///////////////////////////////////////

function Render(n) {
    let seleccionado = $(`#ingresarOpciones${n}`).prop(`selectedIndex`);

    if(actLista.length === 0) {
        $('.emptyAlert').remove();    
        $('#row1-col').toggleClass("d-none")
        $('#row1-col2').toggleClass("d-none");
        $('#row4-col').toggleClass("d-none");
    }

    let es = $(`#newEspecie${n}`).val();
    let un = $(`#newUnidades${n}`).val();
    let pn = $(`#newPrecio${n}`).val();
    let pa = $(`#newPrecio${n}`).val() * 2;

    if (seleccionado === 0) {
        new Cripto(es, un, pn, pa);        
    }
    else if (seleccionado === 1) {
        new Acciones(es, un, pn, pa); 
    }
    else if (seleccionado === 2) {
        new Bonos(es, un, pn, pa); 
    }
    else if (seleccionado === 3) {
        new Etfs(es, un, pn, pa); 
    }

    saveData();   
}

/////////////////////////////////////// LISTA TENENCIAS ///////////////////////////////////////

function RenderLista() {
    $('#tablaCuerpo').empty();
    let id = 0;
        for (const i of actLista) {
            monto = roundTwoDecimals(i.unidades * i.precioActual);
        $("#tablaCuerpo").append(
        `<tr>
            <th class="text-left" scope="row">${i.especie}</th>
            <td>${i.unidades}</td>
            <td>$${monto}</td>
            <td class="d-none d-md-table-cell">${i.porcentajeDeCartera()}</td>
            <td>${i.variacion()}</td>
            <td><button type="button" id="btn-del${id}" class="btn btn-primary">X</button></td>
        </tr>`);
        
        $(`#btn-del${id}`).on("click", function() {
            i.borrar();
            RenderLista();
            checkEmptyList()
            saveData()
        });
        id += 1;
    }
}

/////////////////////////////////////THEME/////////////////////////////////////
const btn = $(".custom-control-input");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
    document.body.classList.toggle("dark-theme");
}
else if (currentTheme == "light") {
    document.body.classList.toggle("light-theme");
    btn.prop("checked", false);
}

btn.on("click", function () {
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