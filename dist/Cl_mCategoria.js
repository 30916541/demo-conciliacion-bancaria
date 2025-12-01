import Cl_mTablaWeb from "./tools/Cl_mTablaWeb.js";
export default class Cl_mCategoria extends Cl_mTablaWeb {
    _nombre = "";
    constructor({ id, creadoEl, alias, nombre } = {
        id: null,
        creadoEl: null,
        alias: null,
        nombre: "",
    }) {
        super({ id, creadoEl, alias });
        this._nombre = nombre;
    }
    set nombre(nombre) {
        this._nombre = nombre;
    }
    get nombre() {
        return this._nombre;
    }
    get nombreOK() {
        return this._nombre.length > 0;
    }
    get categoriaOK() {
        if (!this.nombreOK)
            return "Nombre";
        return true;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            nombre: this.nombre
        };
    }
}
