// app.js - Lógica Principal, Rotas e Interatividade

// 1. Dados Globais Mockados
const MOCK_DATA = [
    {
        title: "Animes Mais Populares",
        items: [
            { title: "Demon Slayer", year: "2023", match: "99%", img: "https://picsum.photos/seed/demon/200/300" },
            { title: "Kaiju No. 8", year: "2024", match: "98%", img: "https://picsum.photos/seed/kaiju/200/300" },
            { title: "My Hero Academia", year: "2024", match: "95%", img: "https://picsum.photos/seed/hero/200/300" },
            { title: "Solo Leveling", year: "2024", match: "97%", img: "https://picsum.photos/seed/solo/200/300" },
            { title: "Jujutsu Kaisen", year: "2023", match: "96%", img: "https://picsum.photos/seed/jujutsu/200/300" },
            { title: "One Piece", year: "1999", match: "99%", img: "https://picsum.photos/seed/onepiece/200/300" },
            { title: "Attack on Titan", year: "2013", match: "98%", img: "https://picsum.photos/seed/aot/200/300" },
        ]
    },
    {
        title: "Lançamentos e Episódios Novos",
        items: [
            { title: "Wind Breaker", year: "2024", match: "90%", img: "https://picsum.photos/seed/wind/200/300" },
            { title: "Re:Monster", year: "2024", match: "85%", img: "https://picsum.photos/seed/monster/200/300" },
            { title: "The New Gate", year: "2024", match: "88%", img: "https://picsum.photos/seed/gate/200/300" },
            { title: "Tsukimichi", year: "2024", match: "91%", img: "https://picsum.photos/seed/tsukimichi/200/300" },
            { title: "Mushoku Tensei", year: "2024", match: "95%", img: "https://picsum.photos/seed/mushoku/200/300" },
        ]
    },
    {
        title: "Séries em Destaque",
        items: [
            { title: "Money Heist", year: "2017", match: "98%", img: "https://picsum.photos/seed/money/200/300" },
            { title: "Stranger Things", year: "2016", match: "99%", img: "https://picsum.photos/seed/stranger/200/300" },
            { title: "Ozark", year: "2017", match: "93%", img: "https://picsum.photos/seed/ozark/200/300" },
            { title: "The Irishman", year: "2019", match: "89%", img: "https://picsum.photos/seed/irish/200/300" },
            { title: "Dark", year: "2017", match: "96%", img: "https://picsum.photos/seed/dark/200/300" },
        ]
    }
];

// Utilitário para pegar todos os itens flat (para busca e grid geral)
const ALL_ITEMS = MOCK_DATA.flatMap(category => category.items);

// 2. Sistema de Notificações (Toast)
function showToast(message, icon = 'ph-check-circle') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="ph-fill ${icon}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);

    // Remover após 3 segundos
    setTimeout(() => {
        toast.classList.add('fade-out');
        toast.addEventListener('animationend', () => {
            toast.remove();
        });
    }, 3000);
}

// Global scope to add to list
window.addToList = function(event, title) {
    event.stopPropagation(); // Evitar click no card inteiro
    showToast(`"${title}" adicionado à sua lista!`, 'ph-bookmark-simple');
}

window.playItem = function(event, title) {
    event.stopPropagation();
    showToast(`Reproduzindo "${title}"...`, 'ph-play-circle');
}


// 3. Componentes de Renderização
function renderCard(item) {
    return `
        <div class="card" onclick="window.playItem(event, '${item.title}')">
            <img src="${item.img}" alt="${item.title}" loading="lazy">
            <div class="card-add-btn" title="Adicionar à Lista" onclick="window.addToList(event, '${item.title}')">
                <i class="ph ph-plus"></i>
            </div>
            <div class="card-overlay">
                <h3 class="card-title">${item.title}</h3>
                <div class="card-info">
                    <span class="match">${item.match}</span>
                    <span>${item.year}</span>
                </div>
            </div>
            <div class="card-play-btn">
                <i class="ph-fill ph-play"></i>
            </div>
        </div>
    `;
}

// ==========================================
// VIEWS (Telas do Aplicativo)
// ==========================================

const views = {
    home: () => {
        let html = `
            <header class="hero slide-up">
                <div class="hero-overlay"></div>
                <div class="hero-content">
                    <div class="hero-tags">
                        <span class="match">98% Relevante</span>
                        <span class="year">2024</span>
                        <span class="quality">4K Ultra HD</span>
                    </div>
                    <h1 class="hero-title">KAIJU NO. 8</h1>
                    <p class="hero-description">
                        Em um mundo infestado por criaturas chamadas Kaiju, Kafka Hibino sempre sonhou em entrar para a Força de Defesa para combatê-los. Após um encontro inesperado, ele ganha a habilidade de se transformar em um Kaiju.
                    </p>
                    <div class="hero-buttons">
                        <button class="btn btn-primary" onclick="showToast('Iniciando reprodução...', 'ph-play')">
                            <i class="ph-fill ph-play"></i> Assistir Agora
                        </button>
                        <button class="btn btn-secondary" onclick="showToast('Mais detalhes em breve', 'ph-info')">
                            <i class="ph ph-info"></i> Mais Informações
                        </button>
                    </div>
                </div>
            </header>
            <div id="categories-container" class="fade-in"></div>
        `;
        
        document.getElementById('app-view').innerHTML = html;

        // Renderizar Carrosséis via DOM Manipulation para manter os eventos de scroll
        const container = document.getElementById('categories-container');
        MOCK_DATA.forEach((category, index) => {
            const section = document.createElement('section');
            section.className = 'category-section';
            
            section.innerHTML = `
                <h2 class="category-title">${category.title}</h2>
                <div class="carousel-wrapper">
                    <button class="carousel-btn btn-left" id="btn-left-${index}"><i class="ph ph-caret-left"></i></button>
                    <div class="carousel-container" id="carousel-${index}">
                        ${category.items.map(renderCard).join('')}
                    </div>
                    <button class="carousel-btn btn-right" id="btn-right-${index}"><i class="ph ph-caret-right"></i></button>
                </div>
            `;
            container.appendChild(section);

            // Lógica de Scroll do Carrossel
            setTimeout(() => {
                const carousel = document.getElementById(`carousel-${index}`);
                const btnLeft = document.getElementById(`btn-left-${index}`);
                const btnRight = document.getElementById(`btn-right-${index}`);
                const scrollAmount = 600;

                btnLeft.addEventListener('click', () => carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
                btnRight.addEventListener('click', () => carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' }));

                carousel.addEventListener('scroll', () => {
                    btnLeft.style.opacity = carousel.scrollLeft === 0 ? '0' : '';
                    btnLeft.style.pointerEvents = carousel.scrollLeft === 0 ? 'none' : 'auto';
                });
                // Iniciar com botão esquerdo invisível
                btnLeft.style.opacity = '0';
                btnLeft.style.pointerEvents = 'none';
            }, 0);
        });
    },

    search: () => {
        document.getElementById('app-view').innerHTML = `
            <div class="page-container slide-up">
                <div class="search-bar">
                    <i class="ph ph-magnifying-glass"></i>
                    <input type="text" placeholder="Buscar animes, séries, filmes..." id="searchInput">
                </div>
                <div class="media-grid fade-in" id="searchResults">
                    ${ALL_ITEMS.map(renderCard).join('')}
                </div>
            </div>
        `;

        // Simulando filtro de busca em tempo real
        const input = document.getElementById('searchInput');
        input.focus();
        input.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = ALL_ITEMS.filter(item => item.title.toLowerCase().includes(term));
            document.getElementById('searchResults').innerHTML = filtered.length > 0 
                ? filtered.map(renderCard).join('')
                : '<p style="color: var(--text-secondary); grid-column: 1/-1;">Nenhum resultado encontrado.</p>';
        });
    },

    gridTemplate: (title, filterType) => {
        // Exemplo simples filtrando por tipo baseado no título da categoria
        let filtered = ALL_ITEMS;
        if(filterType === 'series') filtered = MOCK_DATA[2].items;
        if(filterType === 'animes') filtered = [...MOCK_DATA[0].items, ...MOCK_DATA[1].items];
        if(filterType === 'mylist') filtered = [ALL_ITEMS[0], ALL_ITEMS[3], ALL_ITEMS[8]]; // Mock random list

        document.getElementById('app-view').innerHTML = `
            <div class="page-container slide-up">
                <h1 class="page-title">${title}</h1>
                <div class="media-grid fade-in">
                    ${filtered.map(renderCard).join('')}
                </div>
            </div>
        `;
    },

    settings: () => {
        // Obter tema atual
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const isLight = currentTheme === 'light';

        document.getElementById('app-view').innerHTML = `
            <div class="page-container slide-up">
                <h1 class="page-title">Configurações</h1>
                
                <div class="settings-panel fade-in">
                    <div class="settings-group">
                        <h3>Aparência</h3>
                        <div class="setting-item">
                            <span>Modo Claro</span>
                            <div class="toggle-switch ${isLight ? 'active' : ''}" id="themeToggle" onclick="window.toggleTheme(this)"></div>
                        </div>
                    </div>

                    <div class="settings-group">
                        <h3>Conta</h3>
                        <div class="setting-item">
                            <span>Gerenciar Assinatura</span>
                            <button class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Editar</button>
                        </div>
                        <div class="setting-item">
                            <span>Controle dos Pais</span>
                            <span style="color: var(--text-secondary);">Desativado</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

// ==========================================
// ROTEADOR E INICIALIZAÇÃO
// ==========================================

// Alternador de Tema
window.toggleTheme = function(el) {
    const isLight = el.classList.toggle('active');
    const newTheme = isLight ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('app-theme', newTheme);
    showToast(`Tema alterado para ${isLight ? 'Claro' : 'Escuro'}`, 'ph-palette');
}

function loadTheme() {
    const savedTheme = localStorage.getItem('app-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function initRouter() {
    const navItems = document.querySelectorAll('.nav-item[data-view]');
    const appView = document.getElementById('app-view');

    function loadView(viewName) {
        // Remover animação antiga
        appView.classList.remove('fade-in');
        void appView.offsetWidth; // Trigger reflow
        
        switch(viewName) {
            case 'home': views.home(); break;
            case 'search': views.search(); break;
            case 'series': views.gridTemplate('Séries Aclamadas', 'series'); break;
            case 'animes': views.gridTemplate('Catálogo de Animes', 'animes'); break;
            case 'mylist': views.gridTemplate('Minha Lista', 'mylist'); break;
            case 'settings': views.settings(); break;
            default: views.home();
        }

        appView.classList.add('fade-in');

        // Atualizar menu lateral visualmente
        navItems.forEach(i => i.classList.remove('active'));
        document.querySelector(`.nav-item[data-view="${viewName}"]`)?.classList.add('active');
    }

    // Configurar listeners
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const viewName = item.getAttribute('data-view');
            if(viewName === 'profile') {
                showToast('Perfil em desenvolvimento', 'ph-user');
                return;
            }
            loadView(viewName);
        });
    });

    // Carregar home inicial
    loadView('home');
}

document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    initRouter();
});
