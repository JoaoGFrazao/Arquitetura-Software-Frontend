
// if usado para definir mensagem de boas vindas baseado na hora do dia 
let hora = new Date().getHours()
let saudacao

if (hora < 12) {
    saudacao = "Bom Dia Sorcerer. Bem vindo a sua Gameteca"
} else if (hora < 18) {
    saudacao = "Boa Tarde Sorcerer. Bem vindo a sua Gameteca"
} else {
    saudacao = "Boa Noite Sorcerer. Bem vindo a sua Gameteca"
}
console.log("run")

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("mensagem").innerHTML = saudacao
});

// função para rolar um dado de 20 faces e mostrar uma mensagem dependendo do resultado
function rolarD20() {
    const resultado = Math.floor(Math.random() * 20) + 1;

    if (resultado > 17) {
        document.getElementById("d20-text").textContent = `Resultado: ${resultado} - A magia ancestral corre em suas veias`;
    } else if (resultado > 14) {
        document.getElementById("d20-text").textContent = `Resultado: ${resultado} - Muito bom sorcerer, você é digno`;
    } else if (resultado > 10) {
        document.getElementById("d20-text").textContent = `Resultado: ${resultado} - Sua dignidade é o suficiente para a aventura`;
    } else if (resultado > 6) {
        document.getElementById("d20-text").textContent = `Resultado: ${resultado} - A Gameteca é sua, faça como preferir`;
    } else {
        document.getElementById("d20-text").textContent = `Resultado: ${resultado} - Não liga para o dado, ele não sabe o que faz`;
    }
}

// função para adicionar novos jogos no BD chamando a rota /add_game e alertar caso constraints não sejam cumpridas
function adicionarJogo() {
    const nome = document.querySelector('input[name="nome"]').value;
    const playerage = document.querySelector('input[name="playerage"]').value;
    const playtime = document.querySelector('input[name="playtime"]').value;
    const min_players = document.querySelector('input[name="min_players"]').value;
    const max_players = document.querySelector('input[name="max_players"]').value;
    const ano_publi = document.querySelector('input[name="ano_publi"]').value;

    if (max_players < min_players) {
        return alert("O número máximo de jogadores não pode ser menor que o número mínimo")
    } else {
        console.log("min/max jogadores válido")
    }

    if (playtime < 0) {
        return alert("O tempo de jogo não pode ser menor que 0")
    } else {
        console.log("tempo de jogo válido")
    }


    fetch('/add_game', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `nome=${nome}&playerage=${playerage}&playtime=${playtime}&min_players=${min_players}&max_players=${max_players}&ano_publi=${ano_publi}`,
    })
    .then(response => {
        if (response.ok) {
            return alert("jogo adicionado com sucesso");
        } else {
            throw new Error('Erro ao adicionar jogo verifique as informações');
        }
    })
    .catch(error => {
        console.error(error);
    })
    .then(() => {
        window.location.reload();
    });
}

// Chama a rota /list_all para mostrar todos os jogos do BD
fetch('/list_all')
    .then(response => response.json())
    .then(data => {
        const table = document.getElementById('boardgames-table');


        data.forEach(game => {
            let button = document.createElement('button');
            button.className = 'delete_button';
            button.onclick = function () { deleteGame(game.id, game.Nome) };
            const row = table.insertRow();
            row.insertCell().textContent = game.id;
            row.insertCell().textContent = game.Nome;
            row.insertCell().textContent = game.playerage;
            row.insertCell().textContent = game['Tempo de Jogo'];
            row.insertCell().textContent = game['Mínimo de Jogadores'];
            row.insertCell().textContent = game['Máximo de Jogadores'];
            row.insertCell().textContent = game['Ano de Publicação'];
            row.insertCell(-1).appendChild(button);
        });
    })
    .catch(error => console.error('Error fetching data:', error))

// Cria uma função que chama a rota /boardgames/<int:id> para excluir um jogo do BD com a funçao isConfirmed para eviter que um item seja excluído por engano
function deleteGame(gameId, gameName) {
    var isConfirmed = confirm("Tem certeza que deseja excluir " + gameName + "?" );
    if (isConfirmed) {
        fetch(`/boardgames/${gameId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                window.location.reload();
            })
            .catch(error => {
                console.error('Erro ao excluir jogo:', error);
            });
    } else {
        exit;
    }
}

function procJogo() {
    const gameName = document.getElementById('nome_bgg').value;
    const table = document.getElementById('bgg-table');

    // Limpar apenas as linhas da tabela, mantendo o cabeçalho
    const rows = table.querySelectorAll('tr:not(:first-child)');
    rows.forEach(row => row.remove());

    fetch(`/search_game?name=${encodeURIComponent(gameName)}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(game => {
                const row = table.insertRow();
                row.insertCell().textContent = game.id;
                row.insertCell().textContent = game.name;
                row.insertCell().textContent = game.yearpublished;

                const buttonCell = row.insertCell();
                const button = document.createElement('button');
                button.className = 'add_button';
                button.onclick = function () { sendId(game.id) };
                buttonCell.appendChild(button);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar jogo:', error);
        });
}


function sendId(id) {
    fetch('/add_game_bgg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
    .then(response => {
        if (response.ok) {
            alert('Boardgame adicionado com sucesso!');
            location.reload();
            
        } else {
            throw new Error('Erro ao enviar ID');
        }
    })
    .catch(error => {
        console.error('Erro ao enviar ID:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('/get_boardgames')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('boardgameSelect');
            data.forEach(game => {
                const option = document.createElement('option');
                option.value = game.id;
                option.textContent = game.nome;
                option.dataset.minPlayers = game.min_players;
                option.dataset.maxPlayers = game.max_players;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao buscar boardgames:', error));

    const select = document.getElementById('boardgameSelect');
    select.addEventListener('change', function() {
        const selectedOption = select.options[select.selectedIndex];
        const maxPlayers = selectedOption.dataset.maxPlayers;

        const playersContainer = document.getElementById('playersContainer');
        playersContainer.innerHTML = ''; // Limpa os campos existentes

        for (let i = 1; i <= maxPlayers; i++) {
            const label = document.createElement('label');
            label.textContent = `Jogador ${i}:`;
            playersContainer.appendChild(label);

            const input = document.createElement('input');
            input.type = 'text';
            input.name = `jogador${i}`;
            input.required = i <= selectedOption.dataset.minPlayers; // Campos obrigatórios de acordo com min_players
            playersContainer.appendChild(input);
            playersContainer.appendChild(document.createElement('br'));
        }
    });
});

fetch('/list_matches')
    .then(response => response.json())
    .then(data => {
        const table = document.getElementById('matches-table');

        data.forEach(match => {
            const row = table.insertRow();
            row.insertCell().textContent = match.id;
            row.insertCell().textContent = match.boardgame_name;
            row.insertCell().textContent = match.data_partida;
            row.insertCell().textContent = match.jogadores.join(', ');
            row.insertCell().textContent = match.vencedor;

            let button = document.createElement('button');
            button.className = 'delete_button';

            button.onclick = function () { deleteMatch(match.id, match.boardgame_name) };
            row.insertCell().appendChild(button);
        });
    })
    .catch(error => console.error('Erro ao buscar dados das partidas:', error));

function deleteMatch(matchId, boardgameName) {
    var isConfirmed = confirm("Tem certeza que deseja excluir a partida do jogo " + boardgameName + "?");
    if (isConfirmed) {
        fetch(`/matches/${matchId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                window.location.reload(); 
            })
            .catch(error => {
                console.error('Erro ao excluir partida:', error);
            });
    } else {
        return;
    }
}
