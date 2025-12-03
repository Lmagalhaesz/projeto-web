  document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy';
    // Observação: navegadores modernos respeitam esse atributo; alternativa: IntersectionObserver.
  });

  const seletorRevelar = '.news-item, .collection-item, .model-card';
  document.querySelectorAll(seletorRevelar).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 600ms ease, transform 600ms ease';
  });

  const observadorRevelar = new IntersectionObserver((entradas, obs) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.style.opacity = '1';
        entrada.target.style.transform = 'translateY(0)';
        obs.unobserve(entrada.target); // otimização: não observar novamente
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll(seletorRevelar).forEach(el => observadorRevelar.observe(el));

  /* ========== OVERLAY DE BUSCA ==========
     O que faz: abre um modal simples com campo de busca quando o usuário clica em .search-btn.
     Por que: exemplifica manipulação do DOM (criar/remover elementos, eventos).
     Como testar: clique no botão 🔍 na header.
     Observações:
       - O overlay fecha ao clicar fora da caixa ou no botão "Fechar".
       - O input recebe foco automaticamente.
  */
  const btnBusca = document.querySelector('.search-btn');
  if (btnBusca) btnBusca.addEventListener('click', abrirOverlayBusca);

  function abrirOverlayBusca() {
    if (document.getElementById('overlay-busca')) return; // evita duplicatas

    // cria elementos do overlay
    const overlay = document.createElement('div');
    overlay.id = 'overlay-busca';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:2000;';

    const caixa = document.createElement('div');
    caixa.style.cssText = 'background:#fff;padding:20px;border-radius:8px;max-width:520px;width:92%;box-shadow:0 12px 40px rgba(0,0,0,0.2);';

    const input = document.createElement('input');
    input.type = 'search';
    input.placeholder = 'Pesquisar no site...';
    input.style.cssText = 'width:100%;padding:12px 14px;font-size:16px;border:1px solid #ccc;border-radius:4px;';

    const acoes = document.createElement('div');
    acoes.style.cssText = 'display:flex;justify-content:space-between;margin-top:12px;gap:8px;align-items:center;';

    const sugestoes = document.createElement('small');
    sugestoes.textContent = 'Dica: tente "SF90" ou "F80"';
    sugestoes.style.cssText = 'color:#666;';

    const btnFechar = document.createElement('button');
    btnFechar.textContent = 'Fechar';
    btnFechar.style.cssText = 'padding:8px 12px;border:none;background:#000;color:#fff;border-radius:4px;cursor:pointer;';
    btnFechar.addEventListener('click', () => overlay.remove());

    // montar a estrutura e inserir no DOM
    acoes.appendChild(sugestoes);
    acoes.appendChild(btnFechar);
    caixa.appendChild(input);
    caixa.appendChild(acoes);
    overlay.appendChild(caixa);
    document.body.appendChild(overlay);

    // fecha ao clicar fora da caixa (delegação simples)
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.remove();
    });

    input.focus();
  }

  /* ========== SCROLL SUAVE PARA "VIEW ALL NEWS" ==========
     O que faz: ao clicar no botão .view-all-btn, rola suavemente até .news-section
     Como testar: clique em "View all news".
  */
  const btnVerTodas = document.querySelector('.view-all-btn');
  if (btnVerTodas) {
    btnVerTodas.addEventListener('click', (e) => {
      e.preventDefault();
      const alvo = document.querySelector('.news-section');
      if (alvo) alvo.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ========== SOMBRA NO CABEÇALHO AO ROLAR ==========
     O que faz: adiciona sombra quando o usuário rola mais de 30px.
     Por que: dá feedback visual de que a página foi rolada (boa UX).
     Como testar: role a página para baixo e veja a sombra; volte para o topo e sombra some.
  */
  const cabecalho = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (!cabecalho) return;
    if (window.scrollY > 30) {
      cabecalho.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)';
    } else {
      cabecalho.style.boxShadow = 'none';
    }
  });

  /* ========== HIGHLIGHT DO MENU COM BASE NA SEÇÃO ==========
     O que faz: observa quando seções principais entram na tela e marca o link correspondente.
     Como funciona (simplificado):
       - Mapa de seções com elemento e nome.
       - Quando uma seção atinge threshold 0.5, procura um link cujo texto combine e adiciona classe.
     Observação: a correspondência de texto é intencionalmente simples (usa slice(0,4)).
     Como testar: role até a seção e observe o menu ficar dourado no link correspondente.
  */
  const linksNav = document.querySelectorAll('.nav-main a');
  const mapaSecoes = [
    { el: document.querySelector('.hero-section'), nome: 'Ferrari' },
    { el: document.querySelector('.news-section'), nome: 'News' },
    { el: document.querySelector('.collections-section'), nome: 'Collections' },
    { el: document.querySelector('.models-section'), nome: 'Models' }
  ];

  const observadorSecoes = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        linksNav.forEach(a => a.classList.remove('ativo-js'));
        const sec = mapaSecoes.find(s => s.el === entrada.target);
        if (sec) {
          linksNav.forEach(a => {
            if (a.textContent.trim().toLowerCase().includes(sec.nome.toLowerCase().slice(0,4))) {
              a.classList.add('ativo-js');
            }
          });
        }
      }
    });
  }, { threshold: 0.5 });

  mapaSecoes.forEach(s => { if (s.el) observadorSecoes.observe(s.el); });

  // adiciona estilos úteis via JS para evitar alterações no CSS original
  const estiloTag = document.createElement('style');
  estiloTag.textContent = `
    .nav-main a.ativo-js{color:#ffd700;font-weight:700;}
    .toast-temporario{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#111;color:#fff;padding:10px 16px;border-radius:6px;box-shadow:0 6px 20px rgba(0,0,0,0.2);z-index:3000;font-size:14px;}
    .collection-selecionada{outline:3px solid #ffd700;transform:scale(1.03);}
    .modal-modelo{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5);z-index:3000;}
    .modal-modelo .caixa{background:#fff;padding:20px;border-radius:8px;max-width:420px;width:92%;box-shadow:0 12px 40px rgba(0,0,0,0.2);}
  `;
  document.head.appendChild(estiloTag);

  /* ========== MODAL DO MODELO (ao clicar em "Discover more") ==========
     O que faz: abre um modal com o nome do modelo clicado.
     Por que: demonstra como obter dados do DOM e apresentar uma janela com informações.
     Como testar: clique em qualquer botão .model-link-btn.
  */
  document.querySelectorAll('.model-link-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.model-card');
      const nome = card ? (card.querySelector('.model-name')?.textContent || 'Modelo') : 'Modelo';
      abrirModalModelo(nome);
    });
  });

  function abrirModalModelo(nomeModelo) {
    if (document.getElementById('modal-modelo')) return;

    const modal = document.createElement('div');
    modal.id = 'modal-modelo';
    modal.className = 'modal-modelo';

    const caixa = document.createElement('div');
    caixa.className = 'caixa';

    const titulo = document.createElement('h3');
    titulo.textContent = nomeModelo;
    titulo.style.marginTop = '0';

    const p = document.createElement('p');
    p.textContent = 'O 296 Challenge passa por análises da imprensa internacional no circuito de Monteblanco.';

    const btnFechar = document.createElement('button');
    btnFechar.textContent = 'Fechar';
    btnFechar.style.cssText = 'margin-top:12px;padding:8px 12px;border:none;background:#000;color:#fff;border-radius:4px;cursor:pointer;';
    btnFechar.addEventListener('click', () => modal.remove());

    caixa.appendChild(titulo);
    caixa.appendChild(p);
    caixa.appendChild(btnFechar);
    modal.appendChild(caixa);
    document.body.appendChild(modal);

    modal.addEventListener('click', e => {
      if (e.target === modal) modal.remove();
    });
  }

  /* ========== SELECIONAR COLEÇÃO E MOSTRAR TOAST ==========
     O que faz: ao clicar em .collection-item, alterna classe visual e exibe um toast temporário.
     Por que: demonstra manipulação de classes e criação de notificações.
     Como testar: clique em qualquer bloco de coleção; clique de novo para desmarcar.
  */
  document.querySelectorAll('.collection-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      item.classList.toggle('collection-selecionada');
      mostrarToast('Coleção selecionada');
    });
  });

  function mostrarToast(texto) {
    const existente = document.querySelector('.toast-temporario');
    if (existente) existente.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-temporario';
    toast.textContent = texto;
    document.body.appendChild(toast);

    // desaparece automaticamente; usamos 1.9s para animar saída
    setTimeout(() => {
      toast.style.transition = 'opacity 300ms ease';
      toast.style.opacity = '0';
    }, 1600);
    setTimeout(() => toast.remove(), 1900);
  }

});
