const $grafica = document.querySelector('#grafica1')

const informamesa = document.querySelector('.info-mesas')






function mostrarInfo(){

  let eleccion = document.getElementById('tipoConsultaEleccion')
  let tipoeleccion = eleccion.value
  let departamento = document.getElementById('tipoConsultaDepartamento')
  let tipodepartamento = departamento.value
  let municipio = document.getElementById('tipoConsultaMunicipio')
  let tipomunicipio = municipio.value

fetch(`https://votosgt.azurewebsites.net/api/votos?d=${tipodepartamento}&m=${tipomunicipio}&te=${tipoeleccion}`, {method: 'GET'})
.then (respuesta => respuesta.json())
.then(respuesta => JSON.parse(respuesta))
.then(response => {
const array = response.MESASPROCESADAS
array.forEach(mesa => {
  const titulo = document.createElement('h3')
  titulo.textContent = mesa.D + ':'

  const cantidadmesas = document.createElement('h4')
  cantidadmesas.textContent = mesa.MESASPRO

  const titulo2 = document.createElement('h3')
  titulo2.textContent = ('Mesas no procesadas:')

  const cantidadmesasno = document.createElement('h4')
  cantidadmesasno.textContent = mesa.MESASFALT

  const titulo3 = document.createElement('h3')
  titulo3.textContent = ('Total de Mesas:')

  const cantidadmesastotal = document.createElement('h4')
  cantidadmesastotal.textContent = parseInt(mesa.MESASFALT) + parseInt(mesa.MESASPRO) 

  informamesa.appendChild(titulo)
  informamesa.appendChild(cantidadmesas)
  informamesa.appendChild(titulo2)
  informamesa.appendChild(cantidadmesasno)
  informamesa.appendChild(titulo3)
  informamesa.appendChild(cantidadmesastotal)
})}
)



fetch(`https://votosgt.azurewebsites.net/api/votos?d=${tipodepartamento}&m=${tipomunicipio}&te=${tipoeleccion}`, {method: 'GET'})
.then (respuesta => respuesta.json())
.then(respuesta => JSON.parse(respuesta))
.then(response => {
const array = response.VOTOS
let etiquetas = []
for (let i=0; i<array.length; i++){
  etiquetas[i] = array[i].S
}
let cantidadvotos = []
for (let i=0; i<array.length; i++){
  cantidadvotos[i] = array[i].V
}
let colorfondo = []
for (let i=0; i<array.length; i++){
  colorfondo[i] = array[i].C
}
const datosvotos2022 = {
  label: 'Votos por Organización Pólitica',
  data: cantidadvotos,
  backgroundColor: colorfondo,
  borderColor: 'rgba(0,0,0,1)',
  borderWidth: 1,
}
new Chart($grafica, {
  type: 'bar', //Tipo de Grafica
  data: {
      labels: etiquetas,
      datasets: [
          datosvotos2022,
          //Aca podrian ir mas datos
      ]
  },
  options: {
      indexAxis: 'x',
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
})
  
}

)


const $grafica2 = document.querySelector('#grafica2')

fetch(`https://votosgt.azurewebsites.net/api/votos?d=${tipodepartamento}&m=${tipomunicipio}&te=${tipoeleccion}`, {method: 'GET'})
.then (respuesta => respuesta.json())
.then(respuesta => JSON.parse(respuesta))
.then(response => {
const array = response.PARTICIPACION
let etiquetas = []
for (let i=0; i<array.length; i++){
  etiquetas[i] = array[i].D
}
let cantidadvotos = []
for (let i=0; i<array.length; i++){
  cantidadvotos[i] = array[i].V
}
let colorfondo = []
for (let i=0; i<array.length; i++){
  colorfondo[i] = array[i].C
}
const datosvotos2022 = {
  label: 'Votos por Organización Pólitica',
  data: cantidadvotos,
  backgroundColor: colorfondo,
  borderColor: 'rgba(0,0,0,1)',
  borderWidth: 1,
}
new Chart($grafica2, {
  type: 'doughnut', //Tipo de Grafica
  data: {
      labels: etiquetas,
      datasets: [
          datosvotos2022,
          //Aca podrian ir mas datos
      ]
  },
  options: {
      indexAxis: 'x',
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
})
  
}

)


const graficaheader = document.querySelector('.header-consulta')

fetch(`https://votosgt.azurewebsites.net/api/votos?d=${tipodepartamento}&m=${tipomunicipio}&te=${tipoeleccion}`, {method: 'GET'})
.then (respuesta => respuesta.json())
.then(respuesta => JSON.parse(respuesta))
.then(response => {
  
  const tiposeleccion = document.createElement('h3')
  tiposeleccion.textContent = response.NTE
  
  const breakpoint = document.createElement('br')

  const nivelConsulta = document.createElement('h4')
  nivelConsulta.textContent = response.NMUN + ', ' + response.NDEP

  const FechayHora = document.createElement('h5')
  FechayHora.textContent = 'Fecha y Hora ' + response.FECHAHORA

  graficaheader.appendChild(tiposeleccion)
  graficaheader.appendChild(breakpoint)
  graficaheader.appendChild(nivelConsulta)
  graficaheader.appendChild(FechayHora)
  } 
)


fetch(`https://votosgt.azurewebsites.net/api/votos?d=${tipodepartamento}&m=${tipomunicipio}&te=${tipoeleccion}`, {method: 'GET'})
.then (respuesta => respuesta.json())
.then(respuesta => JSON.parse(respuesta))
.then(response => {
const array = response.VOTOS
tablavotos(array,response)
})


tablavotos()
function tablavotos(arreglo,response){
    // contenido.innerHTML = ''
    for(let valor of arreglo){
        contenido.innerHTML += `

        <tr>
            <td>${valor.S}</td>
            <td>${valor.F}</td>
            <td>${valor.P}</td>
        </tr>
     
      
        `
    }
    for(let i=0;i<1;i++){
        contenido.innerHTML += `
      <tr>
        <td>Total votos válidos:</td>
        <td>${response.VOTOSVALIDOS}</td>
        <td>${response.PVOTOSVALIDOS}</td>
    </tr>
    
    
    <tr>
        <td>Votos nulos:</td>
        <td>${response.NULOS}</td>
        <td>${response.PNULOS}</td>
    </tr>
    <tr>
        <td>Votos en blanco:</td>
        <td>${response.BLANCOS}</td>
        <td>${response.PBLANCOS}</td>
    </tr>
    <tr>
        <td>Total votos válidamente emitidos:</td>
        <td>${response.TOTALACTA}</td>
        <td>${response.PTOTALACTA}</td>
    </tr>
    <tr>
        <td>Votos inválidos:</td>
        <td>${response.INVALIDOS}</td>
        <td>${response.PINVALIDOS}</td>
    </tr>
    <tr>
        <td>Impugnaciones:</td>
        <td>${response.CNTIMPUGNA}</td>
        <td>${response.PCNTIMPUGNA}</td>
    </tr>
      
        `
    }

}
}