document.addEventListener('DOMContentLoaded', function() {
    // Intercambio de imágenes (corregido)
    const busContainers = document.querySelectorAll('.detalle-autobus');

    busContainers.forEach(container => {
        const mainImage = container.querySelector('.imagenes-autobus img');
        const thumbnailImages = container.querySelectorAll('.imagenes-miniaturas img');

        thumbnailImages.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                const newMainSrc = this.src;
                const oldMainSrc = mainImage.src;

                mainImage.src = newMainSrc;
                thumbnail.src = oldMainSrc;

                const newMainAlt = this.alt;
                const oldMainAlt = mainImage.alt;
                mainImage.alt = newMainAlt;
                thumbnail.alt = oldMainAlt;
            });
        });
    });

    // Funcionalidad de búsqueda (corregido)
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', function(event) {
        event.preventDefault();
        const searchTerm = searchInput.value.toLowerCase();
        highlightResults(searchTerm);
        navigateToResult(searchTerm);
    });

    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            searchButton.click();
        }
    });

    searchInput.addEventListener('input', function() {
        if (searchInput.value === '') {
            removeHighlights();
        }
    });

    function highlightResults(searchTerm) {
        const allElements = document.querySelectorAll('body *');
        allElements.forEach(element => {
            if (element.childNodes.length > 0) {
                element.childNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.toLowerCase().includes(searchTerm)) {
                        const regex = new RegExp(searchTerm, 'gi');
                        const newHtml = node.textContent.replace(regex, '<span style="background-color: yellow;">$&</span>');
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newHtml;
                        Array.from(tempDiv.childNodes).forEach(newNode => {
                            element.insertBefore(newNode, node);
                        });
                        node.remove();
                    }
                });
            }
        });
    }

    function navigateToResult(searchTerm) {
        const allElements = document.querySelectorAll('span[style="background-color: yellow;"]');
        if (allElements.length > 0) {
            allElements[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            alert('No se encontraron coincidencias.');
        }
    }

    function removeHighlights() {
        const highlightedElements = document.querySelectorAll('span[style="background-color: yellow;"]');
        highlightedElements.forEach(element => {
            const parent = element.parentNode;
            parent.replaceChild(document.createTextNode(element.textContent), element);
            parent.normalize();
        });
    }
});