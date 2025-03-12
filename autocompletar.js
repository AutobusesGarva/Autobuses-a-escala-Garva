document.addEventListener('DOMContentLoaded', function() {
    // Función para obtener los modelos de catalogo.html
    function obtenerModelos() {
        return fetch('catalogo.html')
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const modelos = Array.from(doc.querySelectorAll('.detalles-autobus h2'))
                    .map(h2 => h2.getAttribute('data-modelo'));
                return modelos;
            });
    }

    // Función para autocompletar el campo de modelo
    function autocompletarModelo(modelos) {
        const modeloInput = document.getElementById('modelo');
        let listaModelos = document.createElement('datalist');
        listaModelos.id = 'lista-modelos';

        modelos.forEach(modelo => {
            let opcion = document.createElement('option');
            opcion.value = modelo;
            listaModelos.appendChild(opcion);
        });

        modeloInput.parentNode.insertBefore(listaModelos, modeloInput.nextSibling);
        modeloInput.setAttribute('list', 'lista-modelos');
    }

    // Llama a las funciones
    obtenerModelos().then(modelos => autocompletarModelo(modelos));
});