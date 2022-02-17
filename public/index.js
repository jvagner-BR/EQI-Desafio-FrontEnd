
const dadosDaAplicacao = {
  rendimento: '',
  aptInicial: '',
  prazo: '',
  ipca: '',
  taxaDeIndex: '',
  aptMensal: '',
  rentabilidade: '',
  cdi: ''
}

const preencherDadosComGithub = data => {
  const ipca = document.getElementById("ipca")
  const cdi = document.getElementById("cdi")
  dadosDaAplicacao.cdi = data[0].valor
  dadosDaAplicacao.ipca = data[1].valor
  cdi.value = formatarParaPorcentagem(data[0].valor)
  ipca.value = formatarParaPorcentagem(data[1].valor)
//   console.log(dadosDaAplicacao.cdi)
}

async function pegarDadosDoGithub() {
  const response = await fetch('http://localhost:3000/indicadores?nome=cdi&nome=ipca')
  const data = await response.json()
  preencherDadosComGithub(data)
}

pegarDadosDoGithub()

// Realizar alguma ação na tela

const testarSeOsDadosEstaoCompletos = () => {
  let control = false
  for(let i in dadosDaAplicacao) {
    if(dadosDaAplicacao[i] == '')
      control = true
  }
  return control
}

const simularInvestimento = () => {
    const control = testarSeOsDadosEstaoCompletos()
    if(control) {
      window.alert('Preencha todos os dados, por favor.')
    }else {
      const tipoRendimento = dadosDaAplicacao.rendimento
      const tipoDeIndexacaoLocal = dadosDaAplicacao.taxaDeIndex
      const tipoIndexacao = tipoDeIndexacaoLocal == 'fixado' ? 'ipca' : tipoDeIndexacaoLocal
      fetch(`http://localhost:3000/simulacoes?tipoIndexacao=${tipoIndexacao}&tipoRendimento=${tipoRendimento}`)
        .then(res => res.json())
        .then(data => {
          adicionarCards(data[0])
          adicionarGrafico(data[0].graficoValores)
        })
      const elementoSimulacao = document.getElementsByClassName("principal__conteudo--resultado")[0]
      elementoSimulacao.style.opacity = "1"
    }
}



const validarRentabilidade = (id, target) => {
    const containerInput = document.getElementsByClassName('principal__conteudo__container__inputs__input')[id]
    const { elementoDescricao, elementoInput, elementoNotificacao } = buscarElementos(containerInput)
    dadosDaAplicacao.rentabilidade = ''
    const value = elementoInput.value
    if(isNaN(value)) {
      criarNotificacao(elementoDescricao, elementoInput, elementoNotificacao)
    }else {
      desativarNotificacao(elementoDescricao, elementoInput, elementoNotificacao)
      dadosDaAplicacao.rentabilidade = value
      formatarParaUmValor(value, formatarParaPorcentagem, elementoInput, target)
      verificarSePodeSimular()
    }
}



// document.getElementById("cdi").innerHTML = dadosDaAplicacao.cdi;

const formatarParaPorcentagem = valor => `${valor}%`

// module.exports = { formatarParaPorcentagem }