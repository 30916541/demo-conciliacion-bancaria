import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class Cl_vBanco extends Cl_vGeneral {
    _btAgregarAbono;
    _btAgregarCargo;
    _btConciliar;
    _btVerMovimientos;
    _lblSaldoTotal;
    _secMovimientoBancarios;
    _secOperaciones;
    _secSaldoTotal;
    _secTablaMovimientos;
    _secVistaConciliacion;
    _secVistaDetalle;
    _divAgregarMovimiento;
    constructor(controlador) {
        super({ formName: "banco" });
        if (controlador)
            this.controlador = controlador;
        this._btAgregarAbono = document.getElementById("agregarMovimiento_btAgregarAbono");
        this._btAgregarCargo = document.getElementById("agregarMovimiento_btAgregarCargo");
        this._divAgregarMovimiento = document.getElementById("agregarMovimiento");
        this._btConciliar = document.getElementById("agregarMovimiento_btConciliar");
        this._btVerMovimientos = document.getElementById("saldoTotal_btnVerMovimientos");
        this._lblSaldoTotal = document.getElementById("saldoTotal_pSaldoTotal");
        const btRegresarTablaMovimientos = document.getElementById("tablaMovimientos_btRegresar");
        const btnFiltrar = document.getElementById("btn_aplicar_filtros");
        const btnLimpiar = document.getElementById("btn_limpiar_filtros");
        this._secMovimientoBancarios = document.getElementById("movimientoBancarios");
        this._secOperaciones = document.getElementById("operaciones");
        this._secSaldoTotal = document.getElementById("saldoTotal");
        this._secTablaMovimientos = document.getElementById("tablaMovimientos");
        this._secVistaConciliacion = document.getElementById("vistaConciliacion");
        this._secVistaDetalle = document.getElementById("vistaDetalle");
        this._btAgregarAbono.onclick = () => this.controlador?.mostrarRegistrarMovimiento("Abono");
        this._btAgregarCargo.onclick = () => this.controlador?.mostrarRegistrarMovimiento("Cargo");
        this._btConciliar.onclick = () => this.controlador?.mostrarConciliacion();
        this._btVerMovimientos.onclick = () => this.controlador?.mostrarTablaMovimientos();
        if (btRegresarTablaMovimientos)
            btRegresarTablaMovimientos.onclick = () => this.controlador?.mostrarVistaPrincipal();
        if (btnFiltrar)
            btnFiltrar.onclick = () => this.controlador?.mostrarTablaMovimientos();
        if (btnLimpiar)
            btnLimpiar.onclick = () => {
                document.getElementById("filtro_busqueda").value = "";
                document.getElementById("filtro_categoria").value = "";
                document.getElementById("filtro_tipo").value = "";
                document.getElementById("filtro_fecha_inicio").value = "";
                document.getElementById("filtro_fecha_fin").value = "";
                this.controlador?.mostrarTablaMovimientos();
            };
        this.mostrarVistaPrincipal();
    }
    mostrarVistaPrincipal() {
        this.ocultarTodo();
        this._secMovimientoBancarios.style.display = "block";
        this._divAgregarMovimiento.style.display = "flex";
        this._secOperaciones.style.display = "block";
        this._secSaldoTotal.style.display = "block";
    }
    mostrarRegistrarMovimiento() {
        this.ocultarTodo();
        this._secMovimientoBancarios.style.display = "block";
        this._divAgregarMovimiento.style.display = "none";
    }
    mostrarConciliacion() {
        this.ocultarTodo();
        this._secVistaConciliacion.style.display = "block";
    }
    mostrarTablaMovimientos() {
        this.ocultarTodo();
        this._secTablaMovimientos.style.display = "block";
        const filtroCategoria = document.getElementById("filtro_categoria");
        if (filtroCategoria && filtroCategoria.options.length <= 1) {
        }
    }
    mostrarDetalle() {
        this.ocultarTodo();
        this._secVistaDetalle.style.display = "block";
    }
    ocultarTodo() {
        if (this._secMovimientoBancarios)
            this._secMovimientoBancarios.style.display = "none";
        if (this._secOperaciones)
            this._secOperaciones.style.display = "none";
        if (this._secSaldoTotal)
            this._secSaldoTotal.style.display = "none";
        if (this._secTablaMovimientos)
            this._secTablaMovimientos.style.display = "none";
        if (this._secVistaConciliacion)
            this._secVistaConciliacion.style.display = "none";
        if (this._secVistaDetalle)
            this._secVistaDetalle.style.display = "none";
    }
    actualizarSaldo(saldo) {
        this._lblSaldoTotal.textContent = saldo.toFixed(2) + " Bs";
    }
    llenarTablaMovimientos(movimientos) {
        const tbody = document.getElementById("tablaMovimientos_body");
        if (!tbody)
            return;
        tbody.innerHTML = "";
        const busqueda = document.getElementById("filtro_busqueda")?.value.toLowerCase() || "";
        const categoria = document.getElementById("filtro_categoria")?.value || "";
        const tipo = document.getElementById("filtro_tipo")?.value || "";
        const fechaInicio = document.getElementById("filtro_fecha_inicio")?.value;
        const fechaFin = document.getElementById("filtro_fecha_fin")?.value;
        const movimientosFiltrados = movimientos.filter(mov => {
            const cumpleBusqueda = !busqueda ||
                (mov.referencia && mov.referencia.toLowerCase().includes(busqueda)) ||
                (mov.descripcion && mov.descripcion.toLowerCase().includes(busqueda));
            const cumpleCategoria = !categoria || mov.categoria === categoria;
            const cumpleTipo = !tipo || mov.tipo === tipo;
            let cumpleFecha = true;
            if (fechaInicio || fechaFin) {
                const partes = mov.fechaHora.split(' ')[0].split('-');
                if (partes.length === 3) {
                    const fechaMov = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`);
                    if (fechaInicio) {
                        const fInicio = new Date(fechaInicio);
                        if (fechaMov < fInicio)
                            cumpleFecha = false;
                    }
                    if (fechaFin && cumpleFecha) {
                        const fFin = new Date(fechaFin);
                        if (fechaMov > fFin)
                            cumpleFecha = false;
                    }
                }
            }
            return cumpleBusqueda && cumpleCategoria && cumpleTipo && cumpleFecha;
        });
        movimientosFiltrados.forEach(mov => {
            const row = tbody.insertRow();
            const claseMonto = mov.tipo === "Cargo" ? "monto-cargo" : (mov.tipo === "Abono" ? "monto-abono" : "");
            row.innerHTML = `
                <td>${mov.fechaHora}</td>
                <td>${mov.categoria}</td>
                <td class="${claseMonto}">${mov.monto}</td>
                <td></td>
            `;
            const cellAcciones = row.cells[3];
            if (cellAcciones) {
                const btnVer = document.createElement("button");
                btnVer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
                btnVer.className = "ver";
                btnVer.title = "Ver";
                btnVer.onclick = () => this.controlador?.verMovimiento(mov);
                cellAcciones.appendChild(btnVer);
                const btnEditar = document.createElement("button");
                btnEditar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
                btnEditar.className = "editar";
                btnEditar.title = "Editar";
                btnEditar.onclick = () => this.controlador?.editarMovimiento(mov);
                cellAcciones.appendChild(btnEditar);
                const btnEliminar = document.createElement("button");
                btnEliminar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`;
                btnEliminar.className = "eliminar";
                btnEliminar.title = "Eliminar";
                btnEliminar.onclick = () => this.controlador?.eliminarMovimiento(mov);
                cellAcciones.appendChild(btnEliminar);
            }
        });
    }
    llenarFiltroCategorias(categorias) {
        const filtroCategoria = document.getElementById("filtro_categoria");
        if (!filtroCategoria)
            return;
        const seleccionActual = filtroCategoria.value;
        filtroCategoria.innerHTML = "";
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Todas";
        filtroCategoria.appendChild(defaultOption);
        categorias.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat.nombre;
            option.textContent = cat.nombre;
            filtroCategoria.appendChild(option);
        });
        if (seleccionActual) {
            filtroCategoria.value = seleccionActual;
        }
    }
}
