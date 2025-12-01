import Cl_mTablaWeb from "./tools/Cl_mTablaWeb.js";

export interface iCategoria {
    id: number | null;
    creadoEl: string | null;
    alias: string | null;
    nombre: string;
}

export default class Cl_mCategoria extends Cl_mTablaWeb {
    private _nombre: string = "";

    constructor({
        id,
        creadoEl,
        alias,
        nombre
    }: iCategoria = {
        id: null,
        creadoEl: null,
        alias: null,
        nombre: "",
    }) {
        super({id, creadoEl, alias});
        this._nombre = nombre;
    }

    set nombre(nombre: string) {
        this._nombre = nombre;
    }

    get nombre(): string {
        return this._nombre;
    }

    get nombreOK(): boolean {
        return this._nombre.length > 0;
    }

    get categoriaOK(): string | boolean {
        if (!this.nombreOK) return "Nombre";
        return true;
    }

    toJSON(): iCategoria {
        return {
            ...super.toJSON(),
            nombre: this.nombre
        };
    }
}