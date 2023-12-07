// Variables
const formulario = document.querySelector('#agregar-gasto');
const listaGastos = document.querySelector('#gastos ul');

// Eventos
eventListeners();

function eventListeners() {
  document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

  formulario.addEventListener('submit', agregarGasto);
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

  imprimirAlerta(mensaje, tipo) {
    // Creamos el div html
    const divMensaje = document.createElement('div');

    // asignamos clases
    divMensaje.classList.add('text-center', 'alert');

    // validamos el tipo
    if (tipo === 'error') {
      divMensaje.classList.add('alert-danger');
    } else {
      divMensaje.classList.add('alert-success');
    }
    // asignar el cotenido del mensaje al content delhtml
    divMensaje.textContent = mensaje;

    // Insertamos en el html
    document.querySelector('.primario').insertBefore(divMensaje, formulario);

    // quitar del Html
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }
}

// Instanciar
let presupuesto;
const interfasUsuario = new InterfasUsuario();

// Funciones

function preguntarPresupuesto() {
  // valor que daremos al atributo del objeto presupuesto
  const presupuestoUsuario = prompt('Cual es tu presupuesto');

  // validación
  if (
    presupuestoUsuario === '' ||
    presupuestoUsuario === null ||
    isNaN(presupuestoUsuario) ||
    presupuestoUsuario <= 0
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

function agregarGasto(e) {
  e.preventDefault();

  const gasto = document.querySelector('#gasto').value;
  const cantidad = document.querySelector('#cantidad').value;

  if (gasto === '' || cantidad === '') {
    interfasUsuario.imprimirAlerta('Ambos son obligatorios', 'error');
    return;
  } else if (cantidad <= 0 || isNaN(cantidad)) {
    interfasUsuario.imprimirAlerta('Cantidad no valida', 'error');
    return;
  }

  console.log(`Agregando gasto`);
}
