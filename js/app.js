// Variables
const formulario = document.querySelector('#agregar-gasto');
const listaGastos = document.querySelector('#gastos ul');

// Eventos
eventListeners();

function eventListeners() {
  document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}

// Classes
class Presupuesto {
  constructor(presupuesto) {
    // valor ingresado lo considere como numero
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
    this.gastos = [];
  }
}

class InterfasUsuario {
  // crear html de insertarPresupuesto
  insertarPresupuesto(objPresupuesto) {
    // destructuramos el objeto presupuesto
    const { presupuesto, restante } = objPresupuesto;

    //agregar los valores destructurados al contenido de la referencia
    document.querySelector('#total').textContent = presupuesto;
    document.querySelector('#restante').textContent = restante;
  }
}

// Instanciar
const interfasUsuario = new InterfasUsuario();
let presupuesto;

// Funciones

function preguntarPresupuesto() {
  // valor que daremos al atributo del objeto presupuesto
  const presupuestoUsuario = prompt('Cual es tu presupuesto');

  // validación
  if (
    presupuestoUsuario === '' ||
    presupuestoUsuario === null ||
    isNaN(presupuestoUsuario) ||
    preguntarPresupuesto <= 0
  ) {
    //se recargar la pagina, cuando damos cancelar o campo vacio aceptar
    window.location.reload();
  }

  // Presupuesto valido
  presupuesto = new Presupuesto(presupuestoUsuario);
  console.log(presupuesto);

  // crear html
  interfasUsuario.insertarPresupuesto(presupuesto);
}
