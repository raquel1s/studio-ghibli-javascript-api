const url = new URLSearchParams(window.location.search);
const id = url.get('id');

async function buscarFilme() {
    try {
        const resposta = await fetch(`https://ghibliapi.vercel.app/films/${id}`);
        const filme = await resposta.json();
        return filme;
    } catch (erro) {
        console.error("Erro ao encontrar dados: ", erro.message);
    }
}

async function criarTela() {
    const filme = await buscarFilme();
    const personagens = await buscarPersonagens();

    document.getElementById('titulo').textContent = filme.original_title;
    document.getElementById('lancamento').textContent = filme.release_date;
    document.getElementById('tempo').textContent = `${filme.running_time} minutes`;
    document.getElementById('banner').src = filme.image;
    document.getElementById('descricao').textContent = filme.description;
    document.getElementById('diretor').textContent = filme.director;
    document.getElementById('produtor').textContent = filme.producer;

    if(personagens.some(p => p && p.name)){
        const tituloPersonagem = document.createElement('h2');
        tituloPersonagem.textContent = 'Characters';
        document.getElementById('tituloPersonagens').appendChild(tituloPersonagem);

        personagens.forEach(personagem => {
            const nomePersonagem = document.createElement('p');
            nomePersonagem.textContent = personagem.name;
            document.getElementById('listaPersonagens').appendChild(nomePersonagem);
        });
    }
}

async function buscarPersonagens() {
    const filme = await buscarFilme();
    const listaPersonagens = filme.people;
    const personagens = [];

    for(const personagemUrl of listaPersonagens){
        try {
            const resposta = await fetch(personagemUrl);
            const personagem = await resposta.json();
            personagens.push(personagem);
        } catch (erro) {
            console.error("Erro ao encontrar dados: ", erro.message);
        }
    }

    return personagens;
}

console.log(buscarPersonagens())

window.addEventListener('load', () => {
    criarTela();
})