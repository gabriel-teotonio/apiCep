



const isNumber = (num) => /^[0-9]+$/.test(num)

const cepValid = (cep) => cep.length == 8 && isNumber(cep) ;

const limparForm = () => {
    const rua = document.getElementById('endereco').value = ''
    const bairro = document.getElementById('bairro').value = ''
    const cidade = document.getElementById('cidade').value = ''
    const estado = document.getElementById('estado').value = ''
}


const preencherFormulario = (endereco) => {
    const rua = document.getElementById('endereco').value = endereco.logradouro
    const bairro = document.getElementById('bairro').value = endereco.bairro
    const cidade = document.getElementById('cidade').value = endereco.localidade
    const estado = document.getElementById('estado').value = endereco.uf
} 

const pesquisarCep = async() => {
    const erroCep = document.getElementById('erro-cep')
    const cep = document.getElementById("cep").value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    if(cepValid(cep)){
        erroCep.style.display = 'none'
        const dados = await fetch(url)
        const endereco = await dados.json()
        if(endereco.hasOwnProperty('erro')){
            erroCep.innerText = 'CEP INEXISTENTE OU INCORRETO'
            erroCep.style.display = 'block'
        }else{
            erroCep.style.display = 'none'
            preencherFormulario(endereco);
        }
    }
    else{
        erroCep.style.display = 'block'
        erroCep.innerText = 'CEP INCORRETO'
        limparForm()
    }
}


const salvarDados = () =>{
    const erroValidity = document.querySelector('.erro-validity')
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        if(input.value === ''){
            erroValidity.innerHTML = '*PREENCHA TODOS OS CAMPOS*'
            window.scrollTo(top)
        }
        else{
            erroValidity.innerHTML = ''
        }
    })
}


document.getElementById('btnSave')
    .addEventListener('click', salvarDados)
document.getElementById('cep').addEventListener('focusout', pesquisarCep)