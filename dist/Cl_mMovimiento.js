import Cl_mTablaWeb from "./tools/Cl_mTablaWeb.js";
export default class Cl_mMovimiento extends Cl_mTablaWeb {
    _fechaHora = "";
    _referencia = "";
    _tipo = "";
    _categoria = "";
    _descripcion = "";
    _monto = 0;
    constructor({ id, creadoEl, alias, fechaHora, referencia, tipo, categoria, descripcion, monto, } = {
        id: null,
        creadoEl: null,
        alias: null,
        fechaHora: "",
        referencia: "",
        tipo: "",
        categoria: "",
        descripcion: "",
        monto: 0,
    }) {
        super({ id, creadoEl, alias });
        this.fechaHora = fechaHora;
        this.referencia = referencia;
        this.tipo = tipo;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.monto = monto;
    }
    set fechaHora(fechaHora) {
        this._fechaHora = fechaHora;
    }
    get fechaHora() {
        return this._fechaHora;
    }
    set referencia(referencia) {
        this._referencia = referencia;
    }
    get referencia() {
        return this._referencia;
    }
    set tipo(tipo) {
        this._tipo = tipo;
    }
    get tipo() {
        return this._tipo;
    }
    set categoria(categoria) {
        this._categoria = categoria;
    }
    get categoria() {
        return this._categoria;
    }
    set descripcion(descripcion) {
        this._descripcion = descripcion;
    }
    get descripcion() {
        return this._descripcion;
    }
    set monto(monto) {
        this._monto = monto;
    }
    get monto() {
        return this._monto;
    }
    montoOperacion() {
        return this.tipo === "Cargo" ? -this._monto : this._monto;
    }
    get fechaHoraOK() {
        const regex = /^(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})$/;
        return regex.test(this._fechaHora);
    }
    get referenciaOK() {
        const regex = /^[A-Za-z]{3}-\d{3}$/;
        this._referencia = this._referencia.toUpperCase();
        return regex.test(this._referencia);
    }
    get tipoOK() {
        return this._tipo === "Abono" || this._tipo === "Cargo";
    }
    get categoriaOK() {
        return this._categoria.length > 0;
    }
    get descripcionOK() {
        return this._descripcion.length > 0 && this._descripcion.length < 50;
    }
    get montoOK() {
        return this._monto > 0;
    }
    get movimientoOK() {
        if (!this.fechaHoraOK)
            return "Fecha y Hora";
        if (!this.referenciaOK)
            return "Referencia";
        if (!this.tipoOK)
            return "Tipo";
        if (!this.categoriaOK)
            return "Categoria";
        if (!this.descripcionOK)
            return "Descripcion";
        if (!this.montoOK)
            return "Monto";
        return true;
    }
    toJSON() {
        return {
            id: this.id,
            creadoEl: this.creadoEl,
            alias: this.alias,
            fechaHora: this.fechaHora,
            tipo: this.tipo,
            referencia: this.referencia,
            categoria: this.categoria,
            descripcion: this.descripcion,
            monto: this.monto,
        };
    }
}
