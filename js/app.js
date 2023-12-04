// Variables
const formulario = document.querySelector('#agregar-gasto');
const listaGastos = document.querySelector('#gastos ul');

// Eventos
eventListeners();

function eventListeners() {
  document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}

// Classes

// Funciones

function preguntarPresupuesto() {
  const presupuestoUsuario = prompt('Cual es tu presupuesto');

  if (
    presupuestoUsuario === '' ||
    presupuestoUsuario === null ||
    isNaN(presupuestoUsuario) ||
    preguntarPresupuesto <= 0
  ) {
    //se recargar la pagina, cuando damos cancelar o campo vacio aceptar
    window.location.reload();
  }
}
