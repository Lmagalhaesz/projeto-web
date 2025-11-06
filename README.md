# Projeto Web

Resumo
- Projeto simples de uma página (e páginas relacionadas) inspirada no design da Ferrari.
- Feito como exercício de desenvolvimento web (HTML, CSS e JavaScript).

O que tem neste repositório
- index.html — página principal com seções: hero, notícias, coleções e modelos.
- ferrari.html, sf25.html, discover.html — páginas adicionais (cada uma deve ter seu CSS específico).
- css/
  - index.css — estilos da página index.html (extraídos do HTML).
  - ferrari.css, sf25.css, discover.css — espaços para os estilos específicos de cada página.
- js/
  - main.js — interações em JavaScript (lazy-load, animações on-scroll, overlay de busca, modal, toast, scroll suave, destaque do menu).
- images/ — imagens usadas no projeto (referenciadas nos HTML/CSS).
- README.md — este arquivo.

Como abrir (modo rápido)
1. Navegue até a pasta do projeto:
   - /projeto-web
2. Abra `index.html` no navegador (duplo clique ou `File > Open` no navegador).
3. Não é necessário servidor para testes locais simples — basta abrir o arquivo.

O que mudou/boa prática aplicada
- CSS separado: cada página deve ter seu próprio arquivo CSS em `css/` (ex.: `css/index.css`) em vez de estilos inline. Isso mantém HTML limpo e facilita manutenção.
- Paths de imagens: como os arquivos CSS estão na pasta `css/`, use caminhos relativos para imagens assim: `background: url("../images/nome.jpg")`.
- JavaScript organizado: `js/main.js` contém interações documentadas em português para facilitar aprendizado.

Funcionalidades JavaScript (o que o modelo faz)
- lazy-load de imagens: todas as `<img>` recebem `loading="lazy"` para melhorar performance.
- reveal on scroll: elementos com `.news-item`, `.collection-item` e `.model-card` aparecem com animação quando entram na viewport.
- overlay de busca: clicar no botão 🔍 abre um modal simples com campo de busca.
- modal de modelo: clicar em "Discover more" abre um modal com o nome do modelo.
- seleção de coleção: clicar em um `.collection-item` marca/desmarca visualmente e mostra um toast temporário.
- scroll suave: botão "View all news" rola a página até a seção de notícias.
- destaque no menu: ao rolar, o link do menu correspondente à seção visível ganha destaque.

Como testar (passo a passo)
- Teste visual: abra `index.html` e role a página para ver animações e sombra no header.
- Teste lazy-load: abra DevTools → Network → throttle (Slow 3G) e role; imagens fora da tela só devem baixar quando necessário.
- Teste interações:
  - Clique em 🔍 para abrir/fechar overlay de busca.
  - Clique em "View all news" para scroll suave.
  - Clique em "Discover more" em um cartão de modelo para abrir modal.
  - Clique em qualquer bloco de coleção para ver seleção + toast.

Dicas para edição
- Para mudar o estilo de uma página, edite o CSS específico em `css/` (ex.: `css/ferrari.css`) e atualize paths de imagem para `../images/`.
- Use comentários no CSS e no JS para registrar por que tomou certas decisões.
- Teste as alterações no navegador e use o DevTools para inspecionar comportamento, console e rede.

Observações finais
- Arquivos novos ou adicionais (ex.: fontes, imagens otimizadas) podem ser colocados em `images/` e referenciados a partir do CSS/HTML com caminhos relativos.
- Este projeto é um exercício de aprendizado. Sinta-se livre para refatorar, organizar melhor (variáveis CSS, componentes reutilizáveis) e adicionar testes.

Autor / Contato
- Leonardo Magalhães — leonardo.magalhaes@estudante.uffs.edu.br
