## Introdução

Gameteca é uma aplicação web que permite aos usuários procurar, adicionar e gerenciar jogos de tabuleiro. Com uma interface amigável, você pode rolar dados, buscar jogos no BoardGameGeek, adicionar jogos manualmente e registrar partidas jogadas.

## Estrutura do Projeto

### HTML

O HTML define a estrutura da página e inclui elementos essenciais como cabeçalhos, formulários e tabelas. Ele também carrega os arquivos CSS e JavaScript necessários para o estilo e a funcionalidade da página.

### CSS

O CSS estiliza a página com um tema medieval, utilizando imagens de fundo, fontes personalizadas e estilos para botões e tabelas. O arquivo de estilo está localizado em `static/css/style.css`.

### JavaScript

O JavaScript adiciona interatividade à página, incluindo:

- Exibição de uma mensagem de boas-vindas baseada na hora do dia.
- Rolagem de um dado D20 para mostrar uma mensagem aleatória.
- Adição de jogos ao banco de dados.
- Exclusão de jogos do banco de dados.
- Busca de jogos no BoardGameGeek.
- Registro de partidas jogadas.

O arquivo de script está localizado em `static/js/script.js`.

<h2>Funcionalidades</h2>

<h3>Procure Seu Jogo</h3>

Envia para a API uma string para ser pesquisado na API do BoardgameGeek



<h3>Jogos Encontrados</h3>

Mostra uma lista dos jogos encontrados na função **Procure seu Jogo** mostrando:

<ul>
	<li>ID no Boardgamegeek</li>
    <li>Nome do Boardgame</li>
    <li>Ano de Publicação</li>
</ul>

Existe ainda uma coluna com um botão para adicionar o jogo à biblioteca.



<h3>Adicione Jogos Manualmente</h3>

Permite adicionar jogos à biblioteca manualmente, sem pesquisar no Boardgame Geek, com as seguintes informação:

<ul>
    <li>Nome do jogo</li>
    <li>Idade minima sugerida</li>
    <li>Tempo de jogo em minutos</li>
    <li>Mínimo de jogadores</li>
    <li>Máximo de jogadores</li>
    <li>Ano de publicação</li>
</ul>



<h3>Veja seus Jogos!</h3>

Lista os jogos na sua biblioteca com as seguintes informações

<ul>
    <li>ID</li>
    <li>Nome</li>
    <li>Idade mínima sugerida</li>
    <li>Tempo de jogo</li>
    <li>Mínimo de jogadores</li>
    <li>Máximo de jogadores</li>
    <li>Ano de publicação</li>
</ul>

Existe uma coluna com um botão para excluir o jogo da biblioteca.



<h3>Adicione suas Partidas Jogadas</h3>

Permite adicionar partidas jogadas com as seguintes informações

<ul>
    <li>Jogo</li>
    <li>Data</li>
    <li>Jogadores</li>
    <li>Vencedor</li>
</ul>

O preenchimento do campo jogo gera a quantidade de campos para jogadores de acordo com o máximo de jogadores permitidos pelo jogo selecionado



<h3>Lista de Partidas</h3>

Lista as partidas no banco de dados mostrando:
<ul>
    <li>ID da Partida</li>
    <li>Nome do Boardgame</li>
    <li>Data da Partida</li>
    <li>Jogadores</li>
    <li>Vencedor</li>
</ul>

Existe ainda uma coluna com um botão para excluir a partida da base de dados









