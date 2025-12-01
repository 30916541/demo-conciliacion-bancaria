import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class Cl_vCategoria extends Cl_vGeneral {
    _inNombre;
    _btRegistrar;
    _btActualizar;
    _btCancelar;
    _btRegresar;
    _tablaCategorias;
    _categoriaId = null;
    constructor(controlador) {
        super({ formName: "categoriaForm" });
        this.controlador = controlador;
        this._inNombre = document.getElementById("categoriaForm_inNombre");
        this._btRegistrar = document.getElementById("categoriaForm_btRegistrar");
        this._btActualizar = document.getElementById("categoriaForm_btActualizar");
        this._btCancelar = document.getElementById("categoriaForm_btCancelar");
        this._btRegresar = document.getElementById("categoriaForm_btRegresar");
        this._tablaCategorias = document.getElementById("tablaCategorias");
        this._btRegistrar.onclick = () => this.registrar();
        this._btActualizar.onclick = () => this.actualizar();
        this._btRegresar.onclick = () => this.controlador?.mostrarVistaPrincipal();
        this._btCancelar.onclick = () => this.prepararFormulario();
    }
    prepararFormulario() {
        this._inNombre.value = "";
        this._categoriaId = null;
        this._btRegistrar.classList.remove("hidden");
        this._btActualizar.classList.add("hidden");
        this._btCancelar.classList.add("hidden");
        this._btRegresar.classList.remove("hidden");
        this._inNombre.focus();
    }
    cargarFormulario(categoria) {
        this._inNombre.value = categoria.nombre;
        this._categoriaId = categoria.id;
        this._btRegistrar.classList.add("hidden");
        this._btActualizar.classList.remove("hidden");
        this._btCancelar.classList.remove("hidden");
        this._btRegresar.classList.add("hidden");
    }
    registrar() {
        const categoria = {
            id: null,
            creadoEl: null,
            alias: null,
            nombre: this._inNombre.value
        };
        this.controlador?.agregarCategoria(categoria);
        this.prepararFormulario();
    }
    actualizar() {
        const categoria = {
            id: this._categoriaId,
            creadoEl: null,
            alias: null,
            nombre: this._inNombre.value
        };
        this.controlador?.actualizarCategoria(categoria);
        this.prepararFormulario();
    }
    llenarTablaCategorias(categorias) {
        const tbody = document.getElementById("tablaCategorias_body");
        if (!tbody)
            return;
        tbody.innerHTML = "";
        categorias.forEach(cat => {
            const row = tbody.insertRow();
            const cellNombre = row.insertCell();
            cellNombre.textContent = cat.nombre;
            const cellAcciones = row.insertCell();
            const btnEditar = document.createElement("button");
            btnEditar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
            btnEditar.className = "editar";
            btnEditar.title = "Editar";
            btnEditar.onclick = () => this.controlador?.editarCategoria(cat);
            cellAcciones.appendChild(btnEditar);
            const btnEliminar = document.createElement("button");
            btnEliminar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`;
            btnEliminar.className = "eliminar";
            btnEliminar.title = "Eliminar";
            btnEliminar.onclick = () => this.controlador?.eliminarCategoria(cat);
            cellAcciones.appendChild(btnEliminar);
        });
    }
}
