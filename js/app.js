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
    this.calcularRestante();
  }

  calcularRestante() {
    // iterar sobre el arreglo de gastos y definir cuanto hemos gastado
    const gastado = this.gastos.reduce(
      (total, gasto) => total + gasto.cantidad,
      0
    );

    this.restante = this.presupuesto - gastado;
  }

  eliminarGasto(id) {
    // devuelve en el arreglo la diferencia sin contar el id del parametro
    this.gastos = this.gastos.filter((gasto) => gasto.id !== id);
    this.calcularRestante();
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

    // Verificar si ya hay una alerta presente, mediante la referencia de la clase alert
    const alertaExistente = document.querySelector('.primario .alert');
    if (alertaExistente) {
      // Si ya hay una alerta, no agregamos otra
      alertaExistente.remove();
    }

    // Insertamos en el html
    document.querySelector('.primario').insertBefore(divMensaje, formulario);

    // quitar del Html
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }

  mostrarGastos(arregloGastos) {
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
      nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>`;

      // boton para borrar el gasto
      const btnBorrar = document.createElement('button');
      btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
      btnBorrar.innerHTML = 'Borrar &times'; //inner cuando usamos entidad &times
      btnBorrar.onclick = () => {
        eliminarGasto(id);
      };
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

  // actulizar el monto restante del html
  actualizarRestante(restante) {
    document.querySelector('#restante').textContent = restante;
  }

  // comprueba la validación visual cuando restamos el presupuesto
  comprobarPresupuesto(presupuestoObj) {
    // destructuramos
    const { presupuesto, restante } = presupuestoObj;
    const restanteDiv = document.querySelector('.restante');

    // 100 - 50
    if (presupuesto / 4 > restante) {
      restanteDiv.classList.remove('alert-restante', 'alert-warning');
      restanteDiv.classList.add('alert-danger');
    } else if (presupuesto / 2 > restante) {
      restanteDiv.classList.remove('alert-restante', 'alert-danger');
      restanteDiv.classList.add('alert-warning');
    } else {
      restanteDiv.classList.remove('alert-danger', 'alert-warning');
      restanteDiv.classList.add('alert-restante');
    }


    // si el total es 0 o menor
    if (restante <= 0) {
      interfasUsuario.imprimirAlerta('El presupuesto se ha agotado', 'error');
      // deshabilitar button
      formulario.querySelector("button[type='submit']").disabled = true;
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
  const { gastos, restante } = presupuesto;

  // mostramos los gastos acutlizados
  interfasUsuario.mostrarGastos(gastos);

  // Actualizar restante del html
  interfasUsuario.actualizarRestante(restante);

  // comprobamos el objeto presupuesto para validarlo visualmente en restante
  interfasUsuario.comprobarPresupuesto(presupuesto);

  // resetear formulario
  formulario.reset();
}

function eliminarGasto(id) {
  // Elimina del objeto
  presupuesto.eliminarGasto(id);

  // Elimina los gastos del html
  // destructurando array gastos del objeto presupuesto
  const { gastos,restante } = presupuesto;
  interfasUsuario.mostrarGastos(gastos);

  // Actualizar restante del html
  interfasUsuario.actualizarRestante(restante);

  // comprobamos el objeto presupuesto para validarlo visualmente en restante
  interfasUsuario.comprobarPresupuesto(presupuesto);
}
