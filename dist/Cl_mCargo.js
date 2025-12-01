import Cl_mMovimiento from "./Cl_mMovimiento.js";
export default class Cl_mCargo extends Cl_mMovimiento {
    constructor({ id, creadoEl, alias, fechaHora, referencia, categoria, descripcion, monto }) {
        super({
            id,
            creadoEl,
            alias,
            fechaHora,
            referencia,
            categoria,
            descripcion,
            monto,
            tipo: "Cargo"
        });
    }
    montoOperacion() {
        return -this.monto;
    }
    toJSON() {
        return {
            ...super.toJSON(),
        };
    }
}
