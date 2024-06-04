
document.getElementById('cep').addEventListener('keydown', function(event) {
   if (event.key === 'Enter') {
       consultaCep();
   }
});

let enderecoAtual= {};


function consultaCep(){
   const cep = document.querySelector('#cep').value;
   
    if(cep.length <= 7){
       alert('CEP inválido');
       return;
   }
   const url = `https://viacep.com.br/ws/${cep}/json/`;
   fetch(url).then(function(resposta){
      resposta.json().then(function(data){
         console.log(data);
         if(data.erro){
            alert('CEP não encontrado');
         }else{
            enderecoAtual = data;
            retorno(data);
            gerenciarLocalStorage(data, 'salvar')
      }
      })
   })
}

function gerenciarLocalStorage(data, acao) {
   const localStorage = window.localStorage;
   let ls = [];

   if (localStorage.getItem('ceps') !== null) {
       ls = JSON.parse(localStorage.getItem('ceps'));
       console.log('Dados do localStorage:', ls);
   }

   if (acao === 'salvar') {
       ls.push(data);
       localStorage.setItem('ceps', JSON.stringify(ls));
   } else if (acao === 'carregar') {
       ls.forEach(function(cep) {
           salvarNaTabela(cep);
       });
   }
}

function salvarNaTabela(data) {
   const tabela = document.querySelector('#tabelaCep');
   const linha = tabela.rows.length;
   const novaLinha = 
       `<tr data-linha="${linha}">
           <td>${data.cep || ''}</td>
           <td>${data.logradouro || ''}</td>
           <td>${data.complemento || ''}</td>
           <td>${data.bairro || ''}</td>
           <td>${data.localidade || ''}</td>
           <td>${data.uf || ''}</td>
           <td>${data.ibge || ''}</td>
           <td>${data.ddd || ''}</td>
           <td>${data.gia || ''}</td>
           <td>${data.siafi || ''}</td>
           <td><button onclick="buscaTempo(this)">Clima</button></td>
           <td><button onclick="excluirLinha(this)">Excluir</button></td>
       </tr>`;
   tabela.insertAdjacentHTML('beforeend', novaLinha);
   //excluirLocalStorage(linha);
}



function excluirLinha(botao){
   const linha = botao.closest('tr');
   const excluirLinha = linha.getAttribute('data-linha');
   linha.remove();
   excluirLocalStorage(excluirLinha);
}

function excluirLinha(botao){
   const linha = botao.closest('tr');
   const cep = linha.cells[0].textContent;
   linha.remove();
   excluirLocalStorage(cep);
}

function excluirLocalStorage(cep){
   const localStorage = window.localStorage;
   let ls = [];
   if (localStorage.getItem('ceps')!== null){
      ls = JSON.parse(localStorage.getItem('ceps'));
   }
   const indice = ls.findIndex(item => item.cep === cep);
   if (indice!== -1) {
      ls.splice(indice, 1);
   }
   localStorage.setItem('ceps', JSON.stringify(ls));
}
function salvar() {
      if (!enderecoAtual || !enderecoAtual.logradouro) {
        alert('CEP não encontrado');
        return;
    }


   const tabela = document.querySelector('#tabelaCep');
   const linha = tabela.rows.length;
   const novaLinha = 
       `<tr data-linha="${linha}">
           <td>${enderecoAtual.cep || ''}</td>
           <td>${enderecoAtual.logradouro || ''}</td>
           <td>${enderecoAtual.complemento || ''}</td>
           <td>${enderecoAtual.bairro || ''}</td>
           <td>${enderecoAtual.localidade || ''}</td>
           <td>${enderecoAtual.uf || ''}</td>
           <td>${enderecoAtual.ibge || ''}</td>
           <td>${enderecoAtual.ddd || ''}</td>
           <td>${enderecoAtual.gia || ''}</td>
           <td>${enderecoAtual.siafi || ''}</td>
           <td><button onclick="buscaTempo(this)">Clima</button></td>
           <td><button onclick="excluirLinha(this)" id="btn">Excluir</button></td>
       </tr>`;
   tabela.insertAdjacentHTML('beforeend', novaLinha);
   apagar();

}


function retorno(data){
   const icep = document.querySelector('#icep');
   icep.value = data.cep;
   const ilog = document.querySelector('#ilog');
   ilog.value = data.logradouro;
   const icomp = document.querySelector('#icomp');
   icomp.value = data.complemento;
   const ibairro = document.querySelector('#ibairro');
   ibairro.value = data.bairro;
   const icidade = document.querySelector('#icidade');
   icidade.value = data.localidade;
   const iuf = document.querySelector('#iuf');
   iuf.value = data.uf;
   const iibge = document.querySelector('#iibge');
   iibge.value = data.ibge;
   const iddd = document.querySelector('#iddd');
   iddd.value = data.ddd;
   const igia = document.querySelector('#igia');
   igia.value = data.gia;
   const isiafi = document.querySelector('#isiafi');
   isiafi.value = data.siafi;
}



function apagar() {
   const buscaCep = document.querySelector('#cep');
   buscaCep.value = '';

   const inputCep = document.querySelector('#icep');
   inputCep.value = '';
   const inputLog = document.querySelector('#ilog');
   inputLog.value = '';
   const inputcomp = document.querySelector('#icomp');
   inputcomp.value = '';
   const inputBairro = document.querySelector('#ibairro');
   inputBairro.value = '';
   const inputCidade = document.querySelector('#icidade');
   inputCidade.value = '';
   const inputuf = document.querySelector('#iuf');
   inputuf.value = '';
   const inputibge = document.querySelector('#iibge');
   inputibge.value = '';
   const inputddd = document.querySelector('#iddd');
   inputddd.value = '';
   const inputgia = document.querySelector('#igia');
   inputgia.value = '';
   const inputsiafi = document.querySelector('#isiafi');
   inputsiafi.value = '';
   enderecoAtual = {};
   
}


function buscaTempo(botao){
   const linha = botao.closest('tr');
   const chave = '1e366df981b29d296e1f4f09b52508d6';
   const city = linha.cells[4].textContent;
   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${chave}&units=metric&lang=pt_b`).
   then(response => response.json()).
   then(json=>{
      infoClima(json, city);   
   console.log(json);
}).catch(error => console.log(error))
}

function infoClima(json, city){
   const caixaClima = document.querySelector('#mostraClima');
   caixaClima.showModal();

   const cidadeClima = document.querySelector('#cidadeClima');
   cidadeClima.value = `${city}`;

   const temp = document.querySelector('#itemp');
   temp.value = `${json.main.temp} °C`;

   const sens = document.querySelector('#isens');
   sens.value = `${json.main.feels_like} °C`;

   const humi = document.querySelector('#ihum');
   humi.value = `${json.main.humidity} %`;

   const tempMax = document.querySelector('#imax');
   tempMax.value = `${json.main.temp_max} °C`;

   const tempMin = document.querySelector('#imin');
   tempMin.value = `${json.main.temp_min} °C`;
}

gerenciarLocalStorage(null, 'carregar');
