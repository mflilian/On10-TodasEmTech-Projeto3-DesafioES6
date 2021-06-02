// URL da API
const baseURL = "https://api.github.com";

const form = document.querySelector('form');
const input = document.querySelector('#nomePersonagem');

const imgPersonagem = document.querySelector('#imagem');
const nomePersonagem = document.querySelector('#name');
const apelidPersonagem = document.querySelector('#apelido');
const niverPersonagem = document.querySelector('#niver');
const mensagemErro = document.querySelector('.messagemErro');


form.addEventListener('submit', (event) => {
  event.preventDefault();
  const nome = input.value.trim();

  if(nome){
    getPersonagem(nome)
  } else {
    alert('Informe o nome do personagem');
  }
})

function replaceNome(nome){
  let nomeModificado = ''

  if(nome.includes(' ')){
   nomeModificado = nome.replace(' ', '+')
  } else {
   nomeModificado = nome;
  }

  return nomeModificado.toLocaleLowerCase();
}


const getPersonagem = (nome) => {

  const nomeModificado = replaceNome(nome)

  fetch(`${baseURL}/users/${nomeModificado}`)
  .then((resposta) => resposta.json())
  .then((dados) => {
    if(dados.message == "Not Found") {
      throw new Error()
    }

    else {
    mensagemErro.textContent = '';

    const avatar_url = dados.avatar_url;

    const name = dados.name;

    const followers = dados.followers;

    const bio = dados.bio;

    criarCard(avatar_url, name, followers, bio)
};
    //name login followers bio

  }).catch(() => {
    limparCard();
    document.getElementById("mensagemErro").src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png';

  })

}

const criarCard = (avatar_url, name, followers, bio) => {
 imgPersonagem.setAttribute('src', avatar_url);
 // imgPersonagem.src = img
 nomePersonagem.textContent = name;
 // nomePersonagem.innerText = nome;

 apelidPersonagem.textContent = `Nome: ${name}`;
 niverPersonagem.textContent = `Bio: ${bio}`;
}

const limparCard = () => {
 imgPersonagem.src = ' ';
 nomePersonagem.textContent = '';
 apelidPersonagem.textContent = '';
 niverPersonagem.textContent = '';
}


/*
const exemploPokemon = () => {
  fetch('https://pokeapi.co/api/v2/pokemon/banana')
  .then((resposta) => {

  
   // if(resposta.ok === false){
     throw new Error();
    }
  //

    if (!resposta.ok) {
      throw new Error();
    } 
  
    return resposta.json();
  })
  .then(json => console.log(json))
  .catch(() => console.log('Pokemon não encontrado'));
}

exemploPokemon();
*/