// app.js - Lógica Principal da Interface

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dados Mockados para os Carrosséis
    const categoriesData = [
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
                { title: "Naruto Shippuden", year: "2007", match: "94%", img: "https://picsum.photos/seed/naruto/200/300" },
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
                { title: "Black Clover", year: "2017", match: "92%", img: "https://picsum.photos/seed/clover/200/300" },
                { title: "Spy x Family", year: "2022", match: "97%", img: "https://picsum.photos/seed/spy/200/300" },
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
                { title: "Peaky Blinders", year: "2013", match: "95%", img: "https://picsum.photos/seed/peaky/200/300" },
                { title: "Breaking Bad", year: "2008", match: "100%", img: "https://picsum.photos/seed/breaking/200/300" },
            ]
        }
    ];

    // 2. Função para renderizar os cards
    const container = document.getElementById('categories-container');

    categoriesData.forEach((category, index) => {
        const section = document.createElement('section');
        section.className = 'category-section';

        const categoryTitle = document.createElement('h2');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category.title;
        section.appendChild(categoryTitle);

        const wrapper = document.createElement('div');
        wrapper.className = 'carousel-wrapper';

        // Botão Esquerda
        const btnLeft = document.createElement('button');
        btnLeft.className = 'carousel-btn btn-left';
        btnLeft.innerHTML = '<i class="ph ph-caret-left"></i>';
        
        // Container do Carrossel
        const carousel = document.createElement('div');
        carousel.className = 'carousel-container';
        carousel.id = `carousel-${index}`;

        // Populando os cards
        category.items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${item.img}" alt="${item.title}" loading="lazy">
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
            `;
            carousel.appendChild(card);
        });

        // Botão Direita
        const btnRight = document.createElement('button');
        btnRight.className = 'carousel-btn btn-right';
        btnRight.innerHTML = '<i class="ph ph-caret-right"></i>';

        wrapper.appendChild(btnLeft);
        wrapper.appendChild(carousel);
        wrapper.appendChild(btnRight);

        section.appendChild(wrapper);
        container.appendChild(section);

        // 3. Lógica de Scroll dos Carrosséis
        const scrollAmount = 600; // Quantidade de pixels a rolar por clique

        btnLeft.addEventListener('click', () => {
            carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        btnRight.addEventListener('click', () => {
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        // Lógica para esconder os botões se estiver no início ou no fim
        carousel.addEventListener('scroll', () => {
            if (carousel.scrollLeft === 0) {
                btnLeft.style.display = 'none';
            } else {
                btnLeft.style.display = 'flex';
            }

            if (Math.ceil(carousel.scrollLeft + carousel.clientWidth) >= carousel.scrollWidth) {
                btnRight.style.display = 'none';
            } else {
                btnRight.style.display = 'flex';
            }
        });

        // Inicializar botões visíveis/invisíveis
        if (carousel.scrollLeft === 0) btnLeft.style.display = 'none';
    });

    // 4. Lógica da Navbar (Active State Toggle Visual)
    const navItems = document.querySelectorAll('.nav-menu .nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if(item.classList.contains('user-profile')) return;
            e.preventDefault();
            document.querySelector('.nav-item.active')?.classList.remove('active');
            item.classList.add('active');
        });
    });
});
