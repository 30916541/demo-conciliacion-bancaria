import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class Cl_vMovimiento extends Cl_vGeneral {
    _inFechaHora;
    _inReferencia;
    _inCategoria;
    _inDescripcion;
    _inMonto;
    _btRegistrar;
    _btActualizar;
    _btCancelar;
    _lblTipoMovimiento;
    _tipoMovimiento = "";
    _movimientoId = null;
    _desdeConciliacion = false;
    constructor(controlador) {
        super({ formName: "movimientoForm" });
        this.controlador = controlador;
        this._inFechaHora = document.getElementById("movimientoForm_inFechaHora");
        this._inReferencia = document.getElementById("movimientoForm_inReferencia");
        this._inCategoria = document.getElementById("movimientoForm_inCategoria");
        this._inDescripcion = document.getElementById("movimientoForm_inDescripcion");
        this._inMonto = document.getElementById("movimientoForm_inMonto");
        this._btRegistrar = document.getElementById("movimientoForm_btRegistrarMovimiento");
        this._btActualizar = document.getElementById("movimientoForm_btActualizarMovimiento");
        this._btCancelar = document.getElementById("movimientoForm_btCancelarMovimiento");
        this._lblTipoMovimiento = document.getElementById("movimientoForm_lblTipoMovimiento");
        this._btRegistrar.onclick = () => this.registrar();
        this._btActualizar.onclick = () => this.actualizar();
        this._btCancelar.onclick = () => {
            this.show({ ver: false });
            this.controlador?.mostrarVistaPrincipal();
        };
    }
    prepararFormulario(tipo) {
        this.show();
        this._tipoMovimiento = tipo;
        this._lblTipoMovimiento.textContent = tipo;
        this._inFechaHora.value = "";
        this._inReferencia.value = "";
        this._inCategoria.value = "";
        this._inDescripcion.value = "";
        this._inMonto.value = "";
        this._desdeConciliacion = false;
        this._btRegistrar.classList.remove("hidden");
        this._btActualizar.classList.add("hidden");
        this._inReferencia.disabled = false;
    }
    cargarFormulario(movimiento) {
        this.show();
        this._tipoMovimiento = movimiento.tipo;
        this._lblTipoMovimiento.textContent = movimiento.tipo;
        this._inFechaHora.value = movimiento.fechaHora;
        this._inReferencia.value = movimiento.referencia;
        this._inCategoria.value = movimiento.categoria;
        this._inDescripcion.value = movimiento.descripcion;
        this._inMonto.value = movimiento.monto;
        this._movimientoId = movimiento.id;
        this._desdeConciliacion = false;
        this._btRegistrar.classList.add("hidden");
        this._btActualizar.classList.remove("hidden");
        this._btActualizar.onclick = () => this.actualizar();
    }
    ocultarFormulario() {
        this.show({ ver: false });
    }
    registrar() {
        const movimiento = {
            id: null,
            creadoEl: null,
            alias: null,
            fechaHora: this._inFechaHora.value,
            referencia: this._inReferencia.value,
            categoria: this._inCategoria.value,
            descripcion: this._inDescripcion.value,
            monto: parseFloat(this._inMonto.value),
            tipo: this._tipoMovimiento
        };
        if (this._desdeConciliacion) {
            this.controlador?.agregarMovimientoDesdeConciliacion(movimiento);
        }
        else {
            this.controlador?.agregarMovimiento(movimiento);
        }
    }
    actualizar() {
        console.log("Botón actualizar presionado");
        const movimiento = {
            id: this._movimientoId,
            creadoEl: null,
            alias: null,
            fechaHora: this._inFechaHora.value,
            referencia: this._inReferencia.value,
            categoria: this._inCategoria.value,
            descripcion: this._inDescripcion.value,
            monto: parseFloat(this._inMonto.value),
            tipo: this._tipoMovimiento
        };
        console.log("Enviando movimiento a actualizar:", movimiento);
        this.controlador?.actualizarMovimiento(movimiento);
    }
    llenarCategorias(categorias) {
        this._inCategoria.innerHTML = "";
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Seleccione la categoría";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.hidden = true;
        this._inCategoria.appendChild(defaultOption);
        categorias.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat.nombre;
            option.textContent = cat.nombre;
            this._inCategoria.appendChild(option);
        });
    }
    prellenarFormulario(movimiento) {
        this.show();
        this._tipoMovimiento = movimiento.tipo;
        this._lblTipoMovimiento.textContent = movimiento.tipo;
        this._inFechaHora.value = movimiento.fechaHora || "";
        this._inReferencia.value = movimiento.referencia || "";
        this._inCategoria.value = movimiento.categoria || "";
        this._inDescripcion.value = movimiento.descripcion || "";
        this._inMonto.value = movimiento.monto || "";
        this._desdeConciliacion = movimiento.desdeConciliacion || false;
        this._btRegistrar.classList.remove("hidden");
        this._btActualizar.classList.add("hidden");
    }
}
