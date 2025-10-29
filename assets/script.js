// Función para cargar los partials
async function includeHTML(selector, url) {
    const el = document.querySelector(selector);
    if (!el) return;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error ${res.status} cargando ${url}`);
        el.innerHTML = await res.text();
    } catch (e) {
        console.error('Error cargando partial:', e);
    }
}

// Función para manejar la navegación (tu código existente mejorado)
function initNavigation() {
    const list = document.querySelectorAll('.list');
    function activeLink() {
        list.forEach((item) => item.classList.remove('active'));
        this.classList.add('active');
    }
    list.forEach((item) => item.addEventListener('click', activeLink));
}

// Función principal que ejecuta todo cuando carga la página
document.addEventListener('DOMContentLoaded', async () => {
    // Primero cargamos los partials
    await includeHTML('#nav-placeholder', 'partials/nav.html');
    await includeHTML('#social-placeholder', 'partials/social.html');    
    await includeHTML('#footer-placeholder', 'partials/footer.html');
    
    // Después inicializamos la navegación
    initNavigation();
    
    // Marcamos el item activo según la página actual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.list').forEach((item) => {
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
});

//boton descargar CV
document.getElementById('descargaCV').addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = 'assets/CV/CV-LeandroViceconte-Sistemas.pdf';
    link.download = 'CV_Leandro_Viceconte.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});