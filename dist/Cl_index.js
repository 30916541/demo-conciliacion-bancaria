import Cl_controlador from "./Cl_controlador.js";
import Cl_mBanco from "./Cl_mBanco.js";
import Cl_vBanco from "./Cl_vBanco.js";
export default class Cl_index {
    constructor() {
        let modelo = new Cl_mBanco();
        modelo.cargarBanco((error) => {
            if (error) {
                alert(error);
                throw new Error(error);
            }
            let vista = new Cl_vBanco();
            let controlador = new Cl_controlador(modelo, vista);
            vista.controlador = controlador;
            vista.actualizarSaldo(modelo.SaldoActual());
            vista.mostrarVistaPrincipal();
        });
    }
}
