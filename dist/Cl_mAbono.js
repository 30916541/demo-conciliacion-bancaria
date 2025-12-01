import Cl_mMovimiento from "./Cl_mMovimiento.js";
export default class Cl_mAbono extends Cl_mMovimiento {
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
            tipo: "Abono"
        });
    }
    montoOperacion() {
        return this.monto;
    }
    toJSON() {
        return {
            ...super.toJSON(),
        };
    }
}
