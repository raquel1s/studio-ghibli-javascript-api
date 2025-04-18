async function buscarFilmes() {
    try {
        const resposta = await fetch("https://ghibliapi.vercel.app/films");
        const dados = await resposta.json();
        return dados;
      } catch (erro) {
        console.error("Erro ao encontrar dados: ", erro.message);
      }
}

const container = document.getElementById("container");

async function criarCard(){
    const dados = await buscarFilmes();

    dados.forEach(filme => {
        const card = document.createElement('div');
        card.classList.add('card');
        container.appendChild(card);
    
        const imagem = document.createElement('img');
        imagem.src = filme.movie_banner;
        card.appendChild(imagem);
    
        const nome = document.createElement('h3');
        nome.textContent = filme.title;
        card.appendChild(nome);

        const lancamento = document.createElement('p');
        lancamento.textContent = filme.release_date;
        card.appendChild(lancamento);

        card.addEventListener('click', () => {
            window.location.href = `detalhesFilme.html?id=${filme.id}`;
        })
    });
}

window.addEventListener('load', () => {
    criarCard();
})