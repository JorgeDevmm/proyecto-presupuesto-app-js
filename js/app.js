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

  nuevoGasto(objGasto) {
    this.gastos = [...this.gastos, objGasto];
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

  agregarGastolista(arregloGastos) {
    this.limpiarHtml(listaGastos);

    // Iterar sobre los gastos
    arregloGastos.forEach((gasto) => {
      const { cantidad, nombre, id } = gasto;

      // Crear un li
      const nuevoGasto = document.createElement('li');
      nuevoGasto.className =
        'list-group-item d-flex justify-content-between align-items-center';
      // nuevoGasto.setAttribute("data-id", id);
      nuevoGasto.dataset.id = id;

      // Agregar el HTML del gasto
      nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> ${cantidad} </span>`;

      // boton para borrar el gasto
      const btnBorrar = document.createElement('button');
      btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
      btnBorrar.innerHTML = 'Borrar &times'; //inner cuando usamos entidad &times
      nuevoGasto.appendChild(btnBorrar);

      // Agregar al HTML
      listaGastos.appendChild(nuevoGasto);
    });
  }

  // Eliminar elementos de la referencia de alertas
  limpiarHtml(referencia) {
    // si contenedor tiene al menos un elemento
    while (referencia.firstChild) {
      // eliminar un hijo por el primero
      referencia.removeChild(referencia.firstChild);
    }
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

  // leer los datos del formulario
  const nombre = document.querySelector('#gasto').value;
  const cantidad = Number(document.querySelector('#cantidad').value);

  // validar vacios y diferente a valores numericos y menor a cero
  if (nombre === '' || cantidad === '') {
    interfasUsuario.imprimirAlerta('Ambos son obligatorios', 'error');
    return;
  } else if (cantidad <= 0 || isNaN(cantidad)) {
    interfasUsuario.imprimirAlerta('Cantidad no valida', 'error');
    return;
  }

  // Generar un objeto literal con el gasto
  const gasto = {
    nombre,
    cantidad,
    id: Date.now(), //valor id de tipo fecha segundos
  };

  // añade un nuevo gasto
  presupuesto.nuevoGasto(gasto);

  //mostrar alerta de gasto agregado
  interfasUsuario.imprimirAlerta('Gasto agregado Correctamente');

  // destructurar presupuesto el arreglo de gastos
  const { gastos } = presupuesto;

  //Imprimir los gastos
  interfasUsuario.agregarGastolista(gastos);

  // resetear formulario
  formulario.reset();
}
