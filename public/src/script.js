// Bootstreap
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Pega todos os formulários que nós queremos aplicar estilos de validação Bootstrap personalizados.
    var forms = document.getElementsByClassName('needs-validation');
    // Faz um loop neles e evita o envio
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();



// Function to make calculations and build table
// Create event listener on submit button
document.getElementById("form").addEventListener("submit", (e) => calculate(e))




const form = document.querySelector("#form")
form.addEventListener("submit", function(e){
  e.preventDefault();
  calculate(e)
})


// Function to make calculations and build table

function calculate(e) {
  e.preventDefault();
  let labels = [];
  let balances = [];
  // puxando os inputs
  let startingBalImput = document.querySelector('#startingBal')
  let expReturnImput = document.querySelector('#expectedReturn')
  let monthlyDepImput = document.querySelector('#monthlyDep')
  let durationImput = document.querySelector('#duration')


  // transformando em string
  let startingBalNumber = startingBalImput.value
  let expReturnNumber = expReturnImput.value 
  let monthlyDepNumber = monthlyDepImput.value
  let durationNumber = durationImput.value

  //Passando para tipo Number
  let startingBal = Number(startingBalNumber)
  let expReturn = Number(expReturnNumber) 
  let monthlyDep = Number(monthlyDepNumber)
  let duration = Number(durationNumber)

  
  let b = startingBal ;
  let c = expReturn;

  const monthlyReturn = expReturn/100/12;

  
  if(!startingBal || !expReturn || !monthlyDep || !duration) {
    return;
  }
  
  // Create formatter for BRL
  const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2
  })

  for(let i = 1; i <= duration*12; i++) {
  startingBal = (startingBal * (1 + monthlyReturn)) + monthlyDep;
  if(i % 12 === 0) {
    const year = i/12;
    balances.push(startingBal.toFixed(2));
    labels.push(`ano ${year}`);
  }
  createChart(labels, balances);

  //  a = startingBal * duration /12;   
  // console.log(a);
}



document.getElementById("valor").innerHTML = formatter.format(startingBal);
document.getElementById("%").innerHTML = c + `%`;
document.getElementById("ano").innerHTML = duration + `anos`;
document.getElementById("AporteInicial").innerHTML = b ;
// console.log(expReturn)

document.querySelector("canvas").style.display="block";
  if(document.querySelector("#finalValue")) {
    document.querySelector("#finalValue").innerHTML = `Total após ${duration} anos: ` + formatter.format(startingBal);
  } 
  document.getElementById("submit").innerHTML = "Re-Calcular"
}


//fucition to create chart
function createChart (labels, data){
      var ctx = document.getElementById("myChart").getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Valor',
            data: data,
            lineTension: 0,
            borderColor: "rgb(50, 200, 0)",
          backgroundColor: "rgba(50, 200, 0, .4)",
            borderWidth: 2,
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false
              }
            }]
          },
          legend: {
            display: false,
          }
        }
      });
    }