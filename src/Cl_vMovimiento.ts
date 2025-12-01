import Cl_vGeneral from "./tools/Cl_vGeneral.js";
import Cl_controlador from "./Cl_controlador.js";

export default class Cl_vMovimiento extends Cl_vGeneral {
    private _inFechaHora: HTMLInputElement;
    private _inReferencia: HTMLInputElement;
    private _inCategoria: HTMLSelectElement;
    private _inDescripcion: HTMLInputElement;
    private _inMonto: HTMLInputElement;
    private _btRegistrar: HTMLButtonElement;
    private _btActualizar: HTMLButtonElement;
    private _btCancelar: HTMLButtonElement;
    private _lblTipoMovimiento: HTMLElement;
    private _tipoMovimiento: string = "";
    private _movimientoId: number | null = null;
    private _desdeConciliacion: boolean = false;

    constructor(controlador: Cl_controlador) {
        super({ formName: "movimientoForm" });
        this.controlador = controlador;

        this._inFechaHora = document.getElementById("movimientoForm_inFechaHora") as HTMLInputElement;
        this._inReferencia = document.getElementById("movimientoForm_inReferencia") as HTMLInputElement;
        this._inCategoria = document.getElementById("movimientoForm_inCategoria") as HTMLSelectElement;
        this._inDescripcion = document.getElementById("movimientoForm_inDescripcion") as HTMLInputElement;
        this._inMonto = document.getElementById("movimientoForm_inMonto") as HTMLInputElement;
        this._btRegistrar = document.getElementById("movimientoForm_btRegistrarMovimiento") as HTMLButtonElement;
        this._btActualizar = document.getElementById("movimientoForm_btActualizarMovimiento") as HTMLButtonElement;
        this._btCancelar = document.getElementById("movimientoForm_btCancelarMovimiento") as HTMLButtonElement;
        this._lblTipoMovimiento = document.getElementById("movimientoForm_lblTipoMovimiento") as HTMLElement;

        this._btRegistrar.onclick = () => this.registrar();
        this._btActualizar.onclick = () => this.actualizar();
        this._btCancelar.onclick = () => {
            this.show({ ver: false });
            this.controlador?.mostrarVistaPrincipal();
        };
    }

    prepararFormulario(tipo: string) {
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

    cargarFormulario(movimiento: any) {
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
        } else {
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
    llenarCategorias(categorias: any[]) {
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
    prellenarFormulario(movimiento: any) {
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