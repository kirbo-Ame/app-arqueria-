// ==========================================
// VARIABLES
// ==========================================

let puntajes = [];
let numeroRonda = 1;
let cantidadFlechas = 6;
let historial = [];


// ==========================================
// INICIAR APLICACIÓN
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // Obtener cantidad de flechas
    const selector = document.getElementById("numeroFlechas");

    if (selector) {

        cantidadFlechas = Number(selector.value);

        selector.addEventListener("change", function () {

            cantidadFlechas = Number(this.value);

            // Reiniciar puntajes al cambiar
            // la cantidad de flechas
            puntajes = [];

            actualizarTodo();

        });
    }


    // Cargar información guardada
    cargarPerfil();

    cargarHistorial();

    actualizarTodo();

});


// ==========================================
// ACTUALIZAR TODA LA APLICACIÓN
// ==========================================

function actualizarTodo() {

    actualizarTextoRonda();

    crearTabla();

    actualizarEstadisticas();

}


// ==========================================
// ACTUALIZAR TEXTO DE RONDA
// ==========================================

function actualizarTextoRonda() {

    const ronda = document.getElementById("numeroRonda");

    const flecha = document.getElementById("flechaActual");

    const totalFlechas =
        document.getElementById("totalFlechas");


    if (ronda) {

        ronda.textContent = numeroRonda;

    }


    if (flecha) {

        flecha.textContent = puntajes.length + 1;

    }


    if (totalFlechas) {

        totalFlechas.textContent = cantidadFlechas;

    }

}


// ==========================================
// AGREGAR PUNTAJE
// ==========================================

function agregarPuntaje() {

    const input = document.getElementById("puntaje");


    if (!input) {

        alert("No se encontró el campo de puntaje.");

        return;

    }


    const valor = input.value.trim();


    if (valor === "") {

        alert("Escribe un puntaje.");

        return;

    }


    const puntaje = Number(valor);


    if (isNaN(puntaje)) {

        alert("Escribe un número válido.");

        return;

    }


    if (puntaje < 0 || puntaje > 10) {

        alert("El puntaje debe estar entre 0 y 10.");

        return;

    }


    if (puntajes.length >= cantidadFlechas) {

        alert("La ronda ya está completa.");

        return;

    }


    // Guardar puntaje
    puntajes.push(puntaje);


    // Limpiar campo
    input.value = "";


    // Actualizar pantalla
    actualizarTodo();


    // Volver a colocar el cursor
    input.focus();

}


// ==========================================
// CREAR TABLA
// ==========================================

function crearTabla() {

    const encabezado =
        document.getElementById("encabezadoTabla");

    const cuerpo =
        document.getElementById("tablaPuntajes");

    const filaTotal =
        document.getElementById("filaTotal");


    // Verificar que existan los elementos
    if (!encabezado || !cuerpo || !filaTotal) {

        console.error(
            "No se encontraron los elementos de la tabla."
        );

        return;

    }


    // ======================================
    // LIMPIAR TABLA
    // ======================================

    encabezado.innerHTML = "";

    cuerpo.innerHTML = "";

    filaTotal.innerHTML = "";


    // ======================================
    // ENCABEZADOS
    // ======================================

    const thRonda = document.createElement("th");

    thRonda.textContent = "Ronda";

    encabezado.appendChild(thRonda);


    // Crear F1, F2, F3...
    for (let i = 0; i < cantidadFlechas; i++) {

        const th = document.createElement("th");

        th.textContent = "F" + (i + 1);

        encabezado.appendChild(th);

    }


    // Encabezado TOTAL
    const thTotal = document.createElement("th");

    thTotal.textContent = "Total";

    encabezado.appendChild(thTotal);


    // ======================================
    // FILA DE PUNTAJES
    // ======================================

    const fila = document.createElement("tr");


    // --------------------------------------
    // NÚMERO DE RONDA
    // --------------------------------------

    const celdaRonda = document.createElement("td");

    celdaRonda.textContent = numeroRonda;

    fila.appendChild(celdaRonda);


    // ======================================
    // FLECHAS
    // ======================================

    for (let i = 0; i < cantidadFlechas; i++) {

        const celda = document.createElement("td");

        const input = document.createElement("input");


        input.type = "number";

        input.min = "0";

        input.max = "10";

        input.className = "casilla-puntaje";

        input.placeholder = "-";


        // Mostrar puntaje existente
        if (puntajes[i] !== undefined) {

            input.value = puntajes[i];

        }


        // ----------------------------------
        // CAMBIAR PUNTAJE DIRECTAMENTE
        // ----------------------------------

        input.addEventListener(
            "change",
            function () {

                // Si está vacío
                if (this.value === "") {

                    return;

                }


                const nuevoValor =
                    Number(this.value);


                // Validar
                if (
                    nuevoValor < 0 ||
                    nuevoValor > 10 ||
                    isNaN(nuevoValor)
                ) {

                    alert(
                        "El puntaje debe estar entre 0 y 10."
                    );

                    this.value = "";

                    return;

                }


                // Guardar nuevo valor
                puntajes[i] = nuevoValor;


                // Actualizar aplicación
                actualizarTodo();

            }
        );


        celda.appendChild(input);

        fila.appendChild(celda);

    }


    // ======================================
    // TOTAL DE LA RONDA
    // ======================================

    const celdaTotal =
        document.createElement("td");


    const total = puntajes.reduce(
        function (suma, numero) {

            return suma + numero;

        },
        0
    );


    celdaTotal.textContent = total;

    celdaTotal.className = "total-ronda";


    fila.appendChild(celdaTotal);


    // Agregar fila de puntajes
    cuerpo.appendChild(fila);


    // ======================================
    // FILA TOTAL GENERAL
    // ======================================

    const tituloTotal =
        document.createElement("td");


    tituloTotal.textContent = "TOTAL";

    tituloTotal.className = "total-general";


    // Aplicar estilos directamente
    // para asegurar que se vea
    tituloTotal.style.backgroundColor = "#E1FDFE";

    tituloTotal.style.color = "#211828";

    tituloTotal.style.fontWeight = "bold";

    tituloTotal.style.textAlign = "center";


    filaTotal.appendChild(tituloTotal);


    // ======================================
    // PUNTAJES DE CADA FLECHA
    // ======================================

    for (let i = 0; i < cantidadFlechas; i++) {

        const celda =
            document.createElement("td");


        celda.className = "total-general";


        // Aplicar estilo directamente
        celda.style.backgroundColor = "#E1FDFE";

        celda.style.color = "#211828";

        celda.style.fontWeight = "bold";

        celda.style.textAlign = "center";


        // Mostrar puntaje
        if (puntajes[i] !== undefined) {

            celda.textContent = puntajes[i];

        } else {

            celda.textContent = "-";

        }


        filaTotal.appendChild(celda);

    }


    // ======================================
    // TOTAL FINAL
    // ======================================

    const totalFinal =
        document.createElement("td");


    totalFinal.textContent = total;

    totalFinal.className = "total-general";


    // Aplicar estilo directamente
    totalFinal.style.backgroundColor = "#E1FDFE";

    totalFinal.style.color = "#211828";

    totalFinal.style.fontWeight = "bold";

    totalFinal.style.textAlign = "center";


    filaTotal.appendChild(totalFinal);


    // ======================================
    // ESTILO DE TODA LA FILA TOTAL
    // ======================================

    filaTotal.style.backgroundColor = "#E1FDFE";

    filaTotal.style.color = "#211828";

}


// ==========================================
// ESTADÍSTICAS
// ==========================================

function actualizarEstadisticas() {

    // Calcular total
    const total = puntajes.reduce(
        function (suma, numero) {

            return suma + numero;

        },
        0
    );


    // Calcular promedio
    let promedio = 0;


    if (puntajes.length > 0) {

        promedio = total / puntajes.length;

    }


    // Calcular máximo
    let maximo = 0;


    if (puntajes.length > 0) {

        maximo = Math.max(...puntajes);

    }


    // Contar X
    const cantidadX = puntajes.filter(
        function (numero) {

            return numero === 10;

        }
    ).length;


    // Obtener elementos
    const elementoTotal =
        document.getElementById("total");

    const elementoPromedio =
        document.getElementById("promedio");

    const elementoMaximo =
        document.getElementById("maximo");

    const elementoX =
        document.getElementById("cantidadX");


    // Mostrar total
    if (elementoTotal) {

        elementoTotal.textContent = total;

    }


    // Mostrar promedio
    if (elementoPromedio) {

        elementoPromedio.textContent =
            promedio.toFixed(2);

    }


    // Mostrar máximo
    if (elementoMaximo) {

        elementoMaximo.textContent = maximo;

    }


    // Mostrar cantidad X
    if (elementoX) {

        elementoX.textContent = cantidadX;

    }

}


// ==========================================
// GUARDAR PERFIL
// ==========================================

function guardarPerfil() {

    const nombre =
        document
            .getElementById("nombreArquero")
            .value
            .trim();


    const tipoArco =
        document
            .getElementById("tipoArco")
            .value;


    const categoria =
        document
            .getElementById("categoria")
            .value;


    const distancia =
        document
            .getElementById("distancia")
            .value;


    // Validar nombre
    if (nombre === "") {

        alert(
            "Escribe tu nombre antes de guardar."
        );

        return;

    }


    // Crear perfil
    const perfil = {

        nombre: nombre,

        tipoArco: tipoArco,

        categoria: categoria,

        distancia: distancia

    };


    // Guardar en localStorage
    localStorage.setItem(
        "perfilArquero",
        JSON.stringify(perfil)
    );


    alert(
        "¡Perfil guardado correctamente!"
    );

}


// ==========================================
// CARGAR PERFIL
// ==========================================

function cargarPerfil() {

    const datos =
        localStorage.getItem("perfilArquero");


    if (!datos) {

        return;

    }


    const perfil =
        JSON.parse(datos);


    // Obtener elementos
    const nombre =
        document.getElementById(
            "nombreArquero"
        );

    const tipoArco =
        document.getElementById(
            "tipoArco"
        );

    const categoria =
        document.getElementById(
            "categoria"
        );

    const distancia =
        document.getElementById(
            "distancia"
        );


    // Cargar nombre
    if (nombre) {

        nombre.value = perfil.nombre;

    }


    // Cargar tipo de arco
    if (tipoArco) {

        tipoArco.value = perfil.tipoArco;

    }


    // Cargar categoría
    if (categoria) {

        categoria.value = perfil.categoria;

    }


    // Cargar distancia
    if (distancia) {

        distancia.value = perfil.distancia;

    }

}


// ==========================================
// TERMINAR RONDA
// ==========================================

function terminarRonda() {

    // Verificar que estén todas las flechas
    if (puntajes.length < cantidadFlechas) {

        alert(
            "Todavía faltan " +
            (cantidadFlechas - puntajes.length) +
            " flechas."
        );

        return;

    }


    // Obtener datos del arquero
    const nombre =
        document
            .getElementById("nombreArquero")
            .value
            .trim();


    const tipoArco =
        document
            .getElementById("tipoArco")
            .value;


    const categoria =
        document
            .getElementById("categoria")
            .value;


    const distancia =
        document
            .getElementById("distancia")
            .value;


    // ======================================
    // CALCULAR ESTADÍSTICAS
    // ======================================

    const total = puntajes.reduce(
        function (suma, numero) {

            return suma + numero;

        },
        0
    );


    const promedio =
        total / puntajes.length;


    const maximo =
        Math.max(...puntajes);


    const cantidadX =
        puntajes.filter(
            function (numero) {

                return numero === 10;

            }
        ).length;


    // ======================================
    // CREAR ENTRENAMIENTO
    // ======================================

    const entrenamiento = {

        fecha:
            new Date().toLocaleDateString(
                "es-MX"
            ),

        nombre:
            nombre || "Arquero",

        tipoArco:
            tipoArco,

        categoria:
            categoria,

        distancia:
            distancia,

        ronda:
            numeroRonda,

        puntajes:
            [...puntajes],

        total:
            total,

        promedio:
            promedio,

        maximo:
            maximo,

        x:
            cantidadX

    };


    // Guardar en historial
    historial.push(entrenamiento);

    guardarHistorial();


    alert(
        "¡Ronda terminada y guardada!"
    );


    // Pasar a la siguiente ronda
    numeroRonda++;

    puntajes = [];


    // Actualizar pantalla
    actualizarTodo();

    mostrarHistorial();

}


// ==========================================
// GUARDAR HISTORIAL
// ==========================================

function guardarHistorial() {

    localStorage.setItem(
        "historialArchery",
        JSON.stringify(historial)
    );

}


// ==========================================
// CARGAR HISTORIAL
// ==========================================

function cargarHistorial() {

    const datos =
        localStorage.getItem(
            "historialArchery"
        );


    if (datos) {

        historial =
            JSON.parse(datos);

    }


    mostrarHistorial();

}


// ==========================================
// MOSTRAR HISTORIAL
// ==========================================

function mostrarHistorial() {

    const contenedor =
        document.getElementById(
            "historial"
        );


    if (!contenedor) {

        return;

    }


    contenedor.innerHTML = "";


    // Si no hay historial
    if (historial.length === 0) {

        contenedor.textContent =
            "Todavía no hay entrenamientos guardados.";

        return;

    }


    // Mostrar más reciente primero
    const lista =
        [...historial].reverse();


    lista.forEach(
        function (entrenamiento) {

            const elemento =
                document.createElement("div");


            elemento.className =
                "entrenamiento";


            elemento.innerHTML = `

                <strong>
                    📅 ${entrenamiento.fecha}
                </strong>

                <p>
                    👤 ${entrenamiento.nombre}
                </p>

                <p>
                    🏹 ${entrenamiento.tipoArco}
                </p>

                <p>
                    🏆 ${entrenamiento.categoria}
                </p>

                <p>
                    📏 ${entrenamiento.distancia}
                </p>

                <p>
                    🎯 Ronda ${entrenamiento.ronda}
                </p>

                <p>
                    💯 Total: ${entrenamiento.total}
                </p>

                <p>
                    📊 Promedio:
                    ${entrenamiento.promedio.toFixed(2)}
                </p>

                <p>
                    🥇 Máximo:
                    ${entrenamiento.maximo}
                </p>

                <p>
                    ❌ X:
                    ${entrenamiento.x}
                </p>

            `;


            contenedor.appendChild(elemento);

        }
    );

}


// ==========================================
// REINICIAR
// ==========================================

function reiniciar() {

    const confirmar =
        confirm(
            "¿Seguro que quieres reiniciar la ronda actual?"
        );


    if (!confirmar) {

        return;

    }


    puntajes = [];

    numeroRonda = 1;


    actualizarTodo();

}