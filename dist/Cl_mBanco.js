import Cl_mCategoria from "./Cl_mCategoria.js";
import { categoriasData } from "./_data.js";
import Cl_mMovimiento from "./Cl_mMovimiento.js";
export default class Cl_mBanco {
    movimientos = [];
    categorias = [];
    saldoTotal = 0;
    constructor() {
        this.movimientos = [];
        this.categorias = [];
        this.saldoTotal = 0;
    }
    addMovimiento({ dtmovimiento, callback, }) {
        let movimiento = new Cl_mMovimiento(dtmovimiento);
        if (movimiento.movimientoOK !== true) {
            callback(movimiento.movimientoOK);
        }
        else {
            movimiento.id = Date.now();
            this.movimientos.push(movimiento);
            this.procesarMovimientos(movimiento);
            callback(false);
        }
    }
    editMovimiento({ dtmovimiento, callback, }) {
        if (!dtmovimiento.id) {
            callback("ID del movimiento no encontrado.");
            return;
        }
        let movimiento = new Cl_mMovimiento(dtmovimiento);
        const validacion = movimiento.movimientoOK;
        if (validacion !== true) {
            callback(validacion);
            return;
        }
        const index = this.movimientos.findIndex(m => m.id === dtmovimiento.id);
        if (index !== -1) {
            const oldMov = this.movimientos[index];
            if (oldMov) {
                this.saldoTotal -= oldMov.montoOperacion();
            }
            this.movimientos[index] = movimiento;
            this.procesarMovimientos(movimiento);
            callback(false);
        }
        else {
            callback("Movimiento no encontrado para editar.");
        }
    }
    deleteMovimiento({ dtmovimiento, callback, }) {
        let indice = this.movimientos.findIndex((movimiento) => movimiento.referencia === dtmovimiento.referencia);
        if (indice === -1)
            callback(`El movimiento ${dtmovimiento.referencia} no existe.`);
        else {
            const movimiento = this.movimientos[indice];
            if (movimiento) {
                this.saldoTotal -= movimiento.montoOperacion();
                this.movimientos.splice(indice, 1);
                callback(false);
            }
            else {
                callback(`Error inesperado: El movimiento ${dtmovimiento.referencia} no se pudo recuperar.`);
            }
        }
    }
    procesarMovimientos(movimiento) {
        this.saldoTotal += movimiento.montoOperacion();
    }
    SaldoActual() {
        return this.saldoTotal;
    }
    cargarBanco(callback) {
        this.llenarCategorias(categoriasData);
        callback(false);
    }
    llenarCategorias(categorias) {
        this.categorias = [];
        categorias.forEach((categoria) => {
            this.categorias.push(new Cl_mCategoria(categoria));
        });
    }
    llenarMovimientos(movimientos) {
        this.movimientos = [];
        this.saldoTotal = 0;
        movimientos.forEach((movimiento) => {
            let mov = new Cl_mMovimiento(movimiento);
            this.movimientos.push(mov);
            this.procesarMovimientos(mov);
        });
    }
    listarMovimientos() {
        return this.movimientos.map((movimiento) => movimiento.toJSON());
    }
    listarCategorias() {
        return this.categorias.map((categoria) => categoria.toJSON());
    }
}
