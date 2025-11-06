class GestorProyectos {
    constructor() {
        // Inicializar array de proyectos desde localStorage
        this.proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
        
        // Referencias a elementos del DOM
        this.formElements = {
            titulo: document.getElementById('proyectoTitulo'),
            descripcion: document.getElementById('proyectoDescripcion'),
            tecnologias: document.getElementById('proyectoTecnologias'),
            estado: document.getElementById('proyectoEstado'),
            enlace: document.getElementById('proyectoEnlace')
        };
        
        this.btnGuardar = document.getElementById('btnGuardarProyecto');
        this.listaProyectos = document.getElementById('listaProyectos');
        
        // Inicializar eventos
        this.inicializarEventos();
        // Mostrar proyectos existentes
        this.mostrarProyectos();
    }

    inicializarEventos() {
        this.btnGuardar.addEventListener('click', () => this.guardarProyecto());
    }

    guardarProyecto() {
        if (!this.validarFormulario()) {
            alert('Por favor complete todos los campos requeridos');
            return;
        }

        const proyecto = {
            id: Date.now(),
            titulo: this.formElements.titulo.value,
            descripcion: this.formElements.descripcion.value,
            tecnologias: this.formElements.tecnologias.value.split(',').map(tech => tech.trim()),
            estado: this.formElements.estado.value,
            enlace: this.formElements.enlace.value
        };

        this.proyectos.push(proyecto);
        this.actualizarStorage();
        this.mostrarProyectos();
        this.limpiarFormulario();
    }

    validarFormulario() {
        return this.formElements.titulo.value.trim() !== '' &&
               this.formElements.descripcion.value.trim() !== '' &&
               this.formElements.tecnologias.value.trim() !== '' &&
               this.formElements.enlace.value.trim() !== '';
    }

    mostrarProyectos() {
    this.listaProyectos.innerHTML = '';
    
    this.proyectos.forEach(proyecto => {
        const card = document.createElement('div');
        card.className = 'proyecto-card';
        card.innerHTML = `
            <div class="estado-badge estado-${proyecto.estado}">
                ${proyecto.estado.replace('_', ' ')}
            </div>
            <h3>${proyecto.titulo}</h3>
            <p>${proyecto.descripcion}</p>
            <p class="tecnologias">
                <strong>Tecnologías:</strong> ${proyecto.tecnologias.join(', ')}
            </p>
            <div class="acciones">
                <button onclick="gestorProyectos.editarProyecto(${proyecto.id})" class="btn-editar">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button onclick="gestorProyectos.eliminarProyecto(${proyecto.id})" class="btn-eliminar">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        `;
        this.listaProyectos.appendChild(card);
    });
}

editarProyecto(id) {
    const proyecto = this.proyectos.find(p => p.id === id);
    if (proyecto) {
        this.formElements.titulo.value = proyecto.titulo;
        this.formElements.descripcion.value = proyecto.descripcion;
        this.formElements.tecnologias.value = proyecto.tecnologias.join(', ');
        this.formElements.estado.value = proyecto.estado;
        this.formElements.enlace.value = proyecto.enlace;
        
        this.btnGuardar.innerHTML = '<i class="fas fa-save"></i> Actualizar Proyecto';
        this.btnGuardar.dataset.editId = id;
        
        this.formElements.titulo.scrollIntoView({ behavior: 'smooth' });
    }
}

eliminarProyecto(id) {
    if (confirm('¿Está seguro de eliminar este proyecto?')) {
        this.proyectos = this.proyectos.filter(proyecto => proyecto.id !== id);
        this.actualizarStorage();
        this.mostrarProyectos();
    }
}

actualizarStorage() {
    localStorage.setItem('proyectos', JSON.stringify(this.proyectos));
}

limpiarFormulario() {
    Object.values(this.formElements).forEach(element => {
        if (element.tagName === 'SELECT') {
            element.value = 'en_desarrollo';
        } else {
            element.value = '';
        }
    });
    
    // Restaurar el texto del botón si estaba en modo edición
    this.btnGuardar.innerHTML = '<i class="fas fa-save"></i> Guardar Proyecto';
    delete this.btnGuardar.dataset.editId;
}

// Modificar el método guardarProyecto existente
guardarProyecto() {
    if (!this.validarFormulario()) {
        alert('Por favor complete todos los campos requeridos');
        return;
    }

    const nuevoProyecto = {
        titulo: this.formElements.titulo.value,
        descripcion: this.formElements.descripcion.value,
        tecnologias: this.formElements.tecnologias.value.split(',').map(tech => tech.trim()),
        estado: this.formElements.estado.value,
        enlace: this.formElements.enlace.value
    };

    const editId = this.btnGuardar.dataset.editId;
    
    if (editId) {
        // Actualizar proyecto existente
        nuevoProyecto.id = parseInt(editId);
        const index = this.proyectos.findIndex(p => p.id === parseInt(editId));
        this.proyectos[index] = nuevoProyecto;
    } else {
        // Crear nuevo proyecto
        nuevoProyecto.id = Date.now();
        this.proyectos.push(nuevoProyecto);
    }

    this.actualizarStorage();
    this.mostrarProyectos();
    this.limpiarFormulario();
}

    actualizarStorage() {
        localStorage.setItem('proyectos', JSON.stringify(this.proyectos));
    }

    limpiarFormulario() {
        Object.values(this.formElements).forEach(element => {
            if (element.tagName === 'SELECT') {
                element.value = 'en_desarrollo';
            } else {
                element.value = '';
            }
        });
    }
}

// Inicializar el gestor cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.gestorProyectos = new GestorProyectos();
});