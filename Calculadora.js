document.addEventListener("DOMContentLoaded", () => {
    const selectCarrera = document.getElementById("carrera");
    const btnCalcular = document.getElementById("calculateBtn");
    const resultDiv = document.getElementById("result");
    let carreras = {};  // Guardará el JSON cargado

    // Cargar el JSON de carreras
    async function cargarCarreras() {
        try {
            const response = await fetch("Carreras.json");
            if (!response.ok) throw new Error("Error al cargar los datos");

            carreras = await response.json();
            llenarSelectCarreras();
        } catch (error) {
            console.error("Error:", error);
            selectCarrera.innerHTML = "<option value=''>Error al cargar carreras</option>";
        }
    }

    // Llenar el select con las carreras
    function llenarSelectCarreras() {
        selectCarrera.innerHTML = '<option value="">Seleccionar carrera</option>';
        // Ordenar las carreras alfabéticamente
        const sortedCarreras = Object.keys(carreras).sort();
    
        sortedCarreras.forEach(carrera => {
            const option = document.createElement("option");
            option.value = carrera;
            option.textContent = carrera;
            selectCarrera.appendChild(option);
        });
    }

    // Calcular el coeficiente
    function calcularCoeficiente(creditosObtenidos, promedio, totalCreditos) {
        return ((creditosObtenidos / totalCreditos) * 90 + promedio).toFixed(2);
    }

    // Manejar el cálculo cuando se presiona el botón
    btnCalcular.addEventListener("click", () => {
        const carreraSeleccionada = selectCarrera.value;
        const creditosObtenidos = parseFloat(document.getElementById("credits").value);
        const promedio = parseFloat(document.getElementById("average").value);

        if (!carreraSeleccionada) {
            resultDiv.innerHTML = "<p class='error'>Por favor, selecciona una carrera.</p>";
            return;
        }
        if (isNaN(creditosObtenidos) || creditosObtenidos <= 0) {
            resultDiv.innerHTML = "<p class='error'>Ingrese créditos válidos.</p>";
            return;
        }
        if (isNaN(promedio) || promedio <= 0) {
            resultDiv.innerHTML = "<p class='error'>Ingrese un promedio válido.</p>";
            return;
        }

        const totalCreditos = carreras[carreraSeleccionada];
        const coeficiente = calcularCoeficiente(creditosObtenidos, promedio, totalCreditos);

        resultDiv.innerHTML = `<p>Tu coeficiente es: <strong>${coeficiente}</strong></p>`;
    });

    // Cargar carreras al iniciar
    cargarCarreras();

});

