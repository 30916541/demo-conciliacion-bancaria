import Cl_mTablaWeb from "./tools/Cl_mTablaWeb.js";

export interface iMovimiento {
    id: number | null;
    creadoEl: string | null;
    alias: string | null;
    fechaHora: string;
    referencia: string;
    tipo: string;
    categoria: string;
    descripcion: string;
    monto: number;
}

export default class Cl_mMovimiento extends Cl_mTablaWeb{
    private _fechaHora = "";
    private _referencia = "";
    private _tipo = "";
    private _categoria = "";
    private _descripcion = "";
    private _monto = 0;
    
    constructor({
        id,
        creadoEl,
        alias,
        fechaHora,
        referencia,
        tipo,
        categoria,
        descripcion,
        monto,
    }: iMovimiento = {
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
        super({id, creadoEl, alias});
        this.fechaHora = fechaHora;
        this.referencia = referencia;
        this.tipo = tipo;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.monto = monto;
    }

    set fechaHora(fechaHora: string) {
        this._fechaHora = fechaHora;
    }

    get fechaHora(): string {
        return this._fechaHora;
    }

    set referencia(referencia: string) {
        this._referencia = referencia;
    }

    get referencia(): string {
        return this._referencia;
    }

    set tipo(tipo: string) {
        this._tipo = tipo;
    }

    get tipo(): string {
        return this._tipo;
    }

    set categoria(categoria: string) {
        this._categoria = categoria;
    }

    get categoria(): string {
        return this._categoria;
    }

    set descripcion(descripcion: string) {
        this._descripcion = descripcion;
    }

    get descripcion(): string {
        return this._descripcion;
    }

    set monto(monto: number) {
        this._monto = monto;
    }

    get monto(): number {
        return this._monto;
    }

    montoOperacion(): number {
        return this.tipo === "Cargo" ? -this._monto : this._monto;
    }

    get fechaHoraOK(): boolean {
        const regex = /^(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})$/;
        return regex.test(this._fechaHora);
    }

    get referenciaOK(): boolean {
        const regex = /^[A-Za-z]{3}-\d{3}$/;
        this._referencia = this._referencia.toUpperCase();
        return regex.test(this._referencia);
    } 

    get tipoOK(): boolean {
        return this._tipo === "Abono" || this._tipo === "Cargo";
    }

    get categoriaOK(): boolean {
        return this._categoria.length > 0;
    }

    get descripcionOK(): boolean {
        return this._descripcion.length > 0 && this._descripcion.length < 50;
    }

    get montoOK(): boolean {
        return this._monto > 0;
    }

    get movimientoOK(): string | true {
        if (!this.fechaHoraOK) return "Fecha y Hora";
        if (!this.referenciaOK) return "Referencia";
        if (!this.tipoOK) return "Tipo";
        if (!this.categoriaOK) return "Categoria";
        if (!this.descripcionOK) return "Descripcion";
        if (!this.montoOK) return "Monto";
        return true;
    }

    toJSON(): iMovimiento {
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