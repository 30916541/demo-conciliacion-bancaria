import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class Cl_vConciliacion extends Cl_vGeneral {
    _inArchivo;
    _btConciliar;
    _btRegresar;
    _tablaConciliacion;
    constructor(controlador) {
        super({ formName: "conciliacionForm" });
        this.controlador = controlador;
        this._inArchivo = document.getElementById("conciliacion_inArchivo");
        this._btConciliar = document.getElementById("conciliacion_btConciliar");
        this._btRegresar = document.getElementById("conciliacion_btRegresar");
        this._tablaConciliacion = document.getElementById("tablaConciliacion");
        this._btConciliar.onclick = () => this.procesarArchivo();
        this._btRegresar.onclick = () => this.controlador?.mostrarVistaPrincipal();
    }
    procesarArchivo() {
        const archivo = this._inArchivo.files?.[0];
        if (!archivo) {
            Swal.fire('Atención', 'Por favor seleccione un archivo JSON.', 'warning');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const contenido = e.target?.result;
                const datosBanco = JSON.parse(contenido);
                this.controlador?.realizarConciliacion(datosBanco);
            }
            catch (error) {
                Swal.fire('Error', 'Error al leer el archivo JSON. Asegúrese de que el formato sea correcto.', 'error');
                console.error(error);
            }
        };
        reader.readAsText(archivo);
    }
    llenarTablaConciliacion(resultados) {
        const tbody = document.getElementById("tablaConciliacion_body");
        if (!tbody)
            return;
        tbody.innerHTML = "";
        resultados.forEach(res => {
            const row = tbody.insertRow();
            const claseEstado = res.estado === "Conciliado" ? "status-success" : "status-error";
            row.innerHTML = `
                <td>${res.fechaHora}</td>
                <td>${res.categoria || "N/A"}</td>
                <td>${res.monto}</td>
                <td><span class="status-badge ${claseEstado}">${res.estado}</span></td>
                <td>
                    ${res.estado !== "Conciliado" ? `<button class="conciliar">Conciliar</button>` : ""}
                </td>
            `;
            if (res.estado !== "Conciliado") {
                const btnConciliar = row.querySelector(".conciliar");
                if (btnConciliar) {
                    btnConciliar.onclick = () => {
                        Swal.fire({
                            title: '¿Desea registrar este movimiento?',
                            text: "Se abrirá el formulario de registro con los datos precargados.",
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#388E3C',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí, registrar'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                this.controlador?.prepararConciliacionManual(res);
                            }
                        });
                    };
                }
            }
        });
    }
}
