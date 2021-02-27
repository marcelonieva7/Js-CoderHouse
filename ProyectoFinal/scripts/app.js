///////////////////////////////////////////COMPONENTS///////////////////////////////////////////
const ComponentHome = {
    render: function() {
       return `<div class="row justify-content-center align-items-center" id="row1">
                <div class="offset-md-1 col-10 col-md-6 col-lg-5" id="row1-col">
                    <section class="donut-chart-block b-shadow">
                        <h2 class="donut-chart-block__titular">Cartera por Tipo de Especie</h2>
                        <div class="spinner-grow" role="status" id="spinner">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="donut-chart" id="donut-chart">
                            <div class="wrapper" id="chartWrapper">
                                <canvas id="donut-chart__chart"></canvas>
                            </div>
                        </div>
                        <ul class="esp-percentages justify-content-center horizontal-list">
                            <li>
                                <p class="esp0 esp scnd-font-color">Cripto</p>
                                <p class="esp-percentage" id="Cripto%"></p>
                            </li>
                            <li>
                                <p class="esp1 esp scnd-font-color">Acciones</p>
                                <p class="esp-percentage" id="Acciones%"></p>
                            </li>
                            <li>
                                <p class="esp3 esp scnd-font-color">Bonos</p>
                                <p class="esp-percentage" id="Bonos%"></p>
                            </li>
                            <li>
                                <p class="esp2 esp scnd-font-color">ETFs</p>
                                <p class="esp-percentage" id="Etfs%"></p>
                            </li>
                        </ul>
                    </section>
                </div>            
                <div class="offset-md-1 offset-lg-0 col-md-8 col-lg-6" id="row1-col2">
                    <section class="lista b-shadow overflow-hidden align-items-center">
                        <h2 class="lista__titular w-100">Detalle por tipo de especie</h2>
                        <table class="lista-tabla table">
                            <thead class="lista-tabla-filtro">
                            <tr>
                                <th scope="col" class="text-left">Tipo especie</th>
                                <th scope="col">Monto</th>
                                <th scope="col">% Sobre Total</th>
                            </tr>
                            </thead>
                            <tbody id="typeBody">
                            </tbody>
                        </table>
                    </section>
                </div>          
            </div>`;
        
    },
    renderJS: function() {
        $(".esp-percentages").hide()
        RenderChart();
        RenderEspPorcentajes();
        renderTypeOf();
        checkEmptyList();
    }
 }

const componentPage1 = {
    render: function() {
        return `<div class="row justify-content-center align-items-center" id ="row2">
                    <div class="offset-md-1 col-md-6 col-lg-5" id="wrapperForm">
                        <form id="form1" class="b-shadow" action="#row2">
                        <h2 class="form__titular">Ingresar Nueva Posición</h2>
                            <div class="form-group">
                            <label for="exampleFormControlSelect1">Tipo de Especie</label>
                            <select class="form-control" id="ingresarOpciones0">
                                <option>Criptomoneda</option>
                                <option>Acciones</option>
                                <option>Bonos</option>
                                <option>ETFs</option>
                            </select>
                            </div>
                            <div class="form-group">
                            <label for="exampleFormControlInput1">Especie</label>
                            <input type="text" class="form-control" id="newEspecie0" placeholder="Bitcoin, Apple, etc." required>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput2">Unidades</label>
                                <input type="number" class="form-control" id="newUnidades0" placeholder="Ej. 10.5" required>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput3">Precio por unidad</label>
                                <input type="number" class="form-control" id="newPrecio0" placeholder="$" required>
                            </div>
                            <button type="submit" class="btn btn-danger" id="form__btn0">Ingresar</button>
                        </form>
                    </div>
               </div>`
    },
    renderJS: function() {
        $("#form1").on("submit", function(event) {
            event.preventDefault();
            $(`#newEspecie0`).val() && $(`#newUnidades0`).val() && $(`#newPrecio0`).val() != '' ? Render(0) : undefined;
        });
    }
}

const componentPage2 = {
    render: function() {
        return `<div class="row justify-content-center align-items-center" id="row3">
                    <div class="offset-md-1 col-md-10" id="row3col">
                        <div class="accordion b-shadow" id="accordionExample">
                            <div class="card border-0">
                            <div class="card-header" id="headingOne">
                                <h2 class="mb-0">
                                <button class="text-decoration-none btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Criptomonedas
                                </button>
                                </h2>
                            </div>                  
                            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div class="card-body h-100 p-0">
                                    <table class="criptoList table">
                                        <thead id="encabezado" class="lista-tabla-filtro">
                                        <tr>
                                            <th scope="col" class="text-left"">Especie</th>
                                            <th scope="col" class="text-center">Precio</th>
                                            <th scope="col" class="text-center">Cierre ant.</th>
                                            <th scope="col" class="text-center">Operar</th>
                                        </tr>
                                        </thead>
                                        <tbody id="criptoList--Body">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            </div>
                            <div class="card border-0">
                            <div class="card-header" id="headingTwo">
                                <h2 class="mb-0">
                                <button class="text-decoration-none btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Acciones
                                </button>
                                </h2>
                            </div>
                            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                <div class="card-body h-100 p-0">
                                <table class="accionesList table">
                                    <thead id="encabezado" class="lista-tabla-filtro">
                                    <tr>
                                        <th scope="col class="text-left"">Especie</th>
                                        <th scope="col" class="text-center">Precio</th>
                                        <th scope="col" class="text-center">Cierre ant.</th>
                                        <th scope="col" class="text-center">Operar</th>
                                    </tr>
                                    </thead>
                                    <tbody id="accionesList--Body">
                                    </tbody>
                                </table>
                            </div>
                            </div>
                            </div>
                            <div class="card border-0">
                            <div class="card-header" id="headingThree">
                                <h2 class="mb-0">
                                <button class="text-decoration-none btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Bonos
                                </button>
                                </h2>
                            </div>
                            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                <div class="card-body h-100 p-0">
                                <table class="bonosList table">
                                    <thead id="encabezado" class="lista-tabla-filtro">
                                    <tr>
                                        <th scope="col class="text-left"">Especie</th>
                                        <th scope="col" class="text-center">Precio</th>
                                        <th scope="col" class="text-center">Cierre ant.</th>
                                        <th scope="col" class="text-center">Operar</th>
                                    </tr>
                                    </thead>
                                    <tbody id="bonosList--Body">
                                    </tbody>
                                </table>
                                </div>
                            </div>
                            </div>
                            <div class="card border-0">
                                <div class="card-header" id="headingFour">
                                <h2 class="mb-0">
                                    <button class="text-decoration-none btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    ETFs
                                    </button>
                                </h2>
                                </div>
                                <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                                <div class="card-body h-100 p-0">
                                    <table class="ETFsList table">
                                        <thead id="encabezado" class="lista-tabla-filtro">
                                        <tr>
                                            <th scope="col class="text-left"">Especie</th>
                                            <th scope="col" class="text-center">Precio</th>
                                            <th scope="col" class="text-center">Cierre ant.</th>
                                            <th scope="col" class="text-center">Operar</th>
                                        </tr>
                                        </thead>
                                        <tbody id="ETFsList--Body">
                                        </tbody>
                                    </table>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content border-0 rounded-lg overflow-hidden">
                                <div class="modal-header p-0 border-0">
                                    <h2 class="form__titular">Ingresar Nueva Posición
                                    <button type="button" class="close py-0" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </h2>
                                </div>
                                <div class="modal-body p-0">
                                <form id="form2" class="mt-0 rounded-0" action="#row3">
                                    <div class="form-group">
                                    <label for="exampleFormControlSelect1">Tipo de Especie</label>
                                    <select class="form-control" id="ingresarOpciones1">
                                        <option disabled>Criptomoneda</option>
                                        <option disabled>Acciones</option>
                                        <option disabled>Bonos</option>
                                        <option disabled>ETFs</option>
                                    </select>
                                    </div>
                                    <div class="form-group">
                                    <label for="exampleFormControlInput1">Especie</label>
                                    <input type="text" class="form-control" id="newEspecie1" readonly>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleFormControlInput2">Unidades</label>
                                        <input type="number" class="form-control" id="newUnidades1" placeholder="Ej. 10.5" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleFormControlInput3">Precio por unidad</label>
                                        <input type="number" class="form-control" id="newPrecio1" readonly>
                                    </div>
                                    <button type="submit" class="btn btn-danger" id="form__btn1">Ingresar</button>
                                </form>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
    },
    renderJS: function() {
        $("#form2").on("submit", function(event) {
            event.preventDefault();
            $('#newUnidades1').val() != '' ? (Render(1), $('#exampleModal').modal('hide')) : undefined ; 
        });
        renderCotizaciones();
    }
}

const componentPage3 = {
    render: function() {
        return `<div class="row justify-content-center align-items-center" id="row4">
                    <div class="offset-md-1 offset-lg-1 col-md-10" id="row4-col">
                        <section class="lista b-shadow overflow-hidden align-items-center">
                            <h2 class="lista__titular w-100">Tenencia detallada</h2>
                            <table class="lista-tabla table">
                                <thead id="encabezado" class="lista-tabla-filtro">
                                <tr>
                                    <th scope="col" class="text-left">Esp</th>
                                    <th scope="col">Uni.</th>
                                    <th scope="col">Monto</th>
                                    <th scope="col" class="d-none d-md-table-cell">% Sobre Total</th>
                                    <th scope="col">Rdo</th>
                                    <th scope="col">Borrar</th>
                                </tr>
                                </thead>
                                <tbody id="tablaCuerpo">
                                </tbody>
                            </table>
                        </section>
                    </div>          
                </div>`
    },
    renderJS: function() {
        checkEmptyList()
        RenderLista();
    }
}

const componentError = {
    render: function() {
        return `<div class="row justify-content-center align-items-center">
                    <div class="offset-md-1 col-md-10">
                    <h2 class="lista__titular rounded-sm b-shadow emptyAlert">Error, la pagina solicitada no existe</h2>
                    </div>          
                </div>`;
    }
 }

const routes = [
    {
       path: '/',
       component: ComponentHome
    },
    {
       path: '/page1',
       component: componentPage1 
    },
    {
       path: '/page2',
       component: componentPage2
    },
    {
        path: '/page3',
        component: componentPage3
    }
]

const parseLocation = function() {
    return location.hash.slice(1).toLowerCase() || "/"
}
 
const findComponent = function(path, routes) {
   return routes.find(route => route.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined
}
 
function router() {
    const path = parseLocation()
    const {component = componentError} = findComponent(path, routes) || {}
    $("#app").html(component.render())
    updateData(datos, component.renderJS())
}

function changeRout() {
    $("#app").fadeOut("fast");
    setTimeout(function(){
        router();
        $("#app").fadeIn("slow");},500)
}

router();
window.addEventListener("hashchange", changeRout)