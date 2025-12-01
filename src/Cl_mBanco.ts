import Cl_mCategoria, { iCategoria } from "./Cl_mCategoria.js";
import { categoriasData } from "./_data.js";
import Cl_mMovimiento, { iMovimiento } from "./Cl_mMovimiento.js";

export default class Cl_mBanco {
    private movimientos: Cl_mMovimiento[] = [];
    private categorias: Cl_mCategoria[] = [];
    private saldoTotal: number = 0;

    constructor() {
        this.movimientos = [];
        this.categorias = [];
        this.saldoTotal = 0;
    }

    addMovimiento({
        dtmovimiento,
        callback,
    }: {
        dtmovimiento: iMovimiento;
        callback: (error: string | boolean) => void;
    }): void {
        let movimiento = new Cl_mMovimiento(dtmovimiento);

        if (movimiento.movimientoOK !== true) {
            callback(movimiento.movimientoOK as string);
        } else {

            movimiento.id = Date.now(); 
            this.movimientos.push(movimiento);
            this.procesarMovimientos(movimiento);
            callback(false);
        }
    }

    editMovimiento({
        dtmovimiento,
        callback,
    }: {
        dtmovimiento: iMovimiento;
        callback: (error: string | boolean) => void;
    }): void {

        if (!dtmovimiento.id) {
            callback("ID del movimiento no encontrado.");
            return;
        }

        let movimiento = new Cl_mMovimiento(dtmovimiento);

        const validacion = movimiento.movimientoOK;
        if (validacion !== true) {
            callback(validacion as string);
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
        } else {
            callback("Movimiento no encontrado para editar.");
        }
    }

    deleteMovimiento({
        dtmovimiento,
        callback,
    }: {
        dtmovimiento: iMovimiento;
        callback: (error: string | boolean) => void;
    }): void {
        let indice = this.movimientos.findIndex((movimiento: Cl_mMovimiento) => movimiento.referencia === dtmovimiento.referencia);
        if(indice === -1) callback(`El movimiento ${dtmovimiento.referencia} no existe.`);
        else {
            const movimiento = this.movimientos[indice];
            if (movimiento) {
                this.saldoTotal -= movimiento.montoOperacion();
                this.movimientos.splice(indice, 1);
                callback(false);
            } else {
                callback(`Error inesperado: El movimiento ${dtmovimiento.referencia} no se pudo recuperar.`);
            }
        }
    }

    procesarMovimientos(movimiento: Cl_mMovimiento){
        this.saldoTotal += movimiento.montoOperacion();
    }

    SaldoActual(): number {
        return this.saldoTotal;
    }

    cargarBanco(callback: (error: string | false) => void): void {

        this.llenarCategorias(categoriasData);

        callback(false);
    }

    llenarCategorias(categorias: iCategoria[]) {
        this.categorias = [];
        categorias.forEach((categoria: iCategoria) => {
            this.categorias.push(new Cl_mCategoria(categoria));
        });
    }

    llenarMovimientos(movimientos: iMovimiento[]) {
        this.movimientos = [];
        this.saldoTotal = 0;
        movimientos.forEach((movimiento: iMovimiento) => {
            let mov = new Cl_mMovimiento(movimiento);
            this.movimientos.push(mov);
            this.procesarMovimientos(mov);
        });
    }

    listarMovimientos(): iMovimiento[] {
        return this.movimientos.map((movimiento) => movimiento.toJSON());
    }

    listarCategorias(): iCategoria[] {
        return this.categorias.map((categoria) => categoria.toJSON());
    }
}