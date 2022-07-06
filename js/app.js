

function Seguro(vehiculo, year, tipo){
    this.vehiculo = vehiculo;
    this.year =  year;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro =  function(){

   let cantidad;
   const base = 2000;

   switch(this.vehiculo){
    case '1':
            cantidad = base * 1.5;
            break;
    case '2':
            cantidad = base * 2.0;
            break;
    case '3':
            cantidad = base * 2.5;
            break;
    default:
        break;
   }

    const diferencia = new Date().getFullYear() - this.year;

    cantidad -= ((diferencia * 3) * cantidad)/100;

   if(this.tipo === 'basico'){
       cantidad *= 1.30;
   }else{
        cantidad *= 1.50;
   }

   return cantidad;
}

function UI(){  }

UI.prototype.llenarOpciones = () =>{
    const max = new Date().getFullYear(),
          min = max -20;
    
    const selectYear = document.querySelector('#year');

    for(let i = max; i>min; i--){
        let option =  document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

UI.prototype.mostrarMensaje = (mensaje,tipo) => {
    const div = document.createElement('div');
    if(tipo === 'error'){
        div.classList.add('mensaje','error');
    }else{
        div.classList.add('mensaje','correcto');
    }
    
    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));


}

UI.prototype.mostrarResultado = (total,seguro) =>{

    const {vehiculo, year, tipo} = seguro;
    let txtvehiculo;
    switch(vehiculo){
        case '1':
            txtvehiculo = 'moto';
            break;
        case '2':
            txtvehiculo = 'auto';
            break;   
        case '3':
            txtvehiculo = 'utilitario';
            break;
        default:
            break;
    }


    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
    <p class='header'> Tu Resumen </p>
    <p class='font-bold'> vehiculo: <span class='font-normal'> ${txtvehiculo}</span> </p>
    <p class='font-bold'> Año: <span class='font-normal'> ${year}</span> </p>
    <p class='font-bold'> Tipo: <span class='font-normal capitalize'> ${tipo}</span> </p>
    <p class='font-bold'> Total: <span class='font-normal'> $${total}</span> </p>

        `;
    const resultadoDiv = document.querySelector('#resultado');
    


        resultadoDiv.appendChild(div);


}

const ui = new UI();


document.addEventListener('DOMContentLoaded', ()=>{
    ui.llenarOpciones();
});

eventListeners();

function eventListeners(){
    
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();


    const vehiculo = document.querySelector('#vehiculo').value;

    const year = document.querySelector('#year').value;

    const tipo = document.querySelector('input[name=tipo]:checked').value;

    if(vehiculo === '' || year === '' || tipo === ''){
        Swal.fire({
            icon: 'error',
            title: 'error',
            text: 'todos los campos son obligatorios',
            showConfirmButton:'cool'
        })
        return;
    }

    const resultados = document.querySelector('#resultado div');
    if(resultados != null){
        resultados.remove();
    }

    const seguro = new Seguro(vehiculo, year, tipo);
    const total = seguro.cotizarSeguro();

    ui.mostrarResultado(total, seguro);


}