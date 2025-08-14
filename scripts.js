let bannerIndex = 0;
const banners = document.querySelectorAll('#banner-slides img');
const carouselSlides = document.querySelector('.banner-carousel .carousel-slides');

function showBanner(index) {
    // Ajusta o índice se estiver fora do limite
    if (index >= banners.length) bannerIndex = 0;
    if (index < 0) bannerIndex = banners.length - 1;

    // Atualiza o bannerIndex global
    bannerIndex = index;

    // Aplica a transformação
    const offset = -bannerIndex * 100; // Ajusta a posição baseada no índice
    carouselSlides.style.transform = `translateX(${offset}vw)`; // Use vw em vez de % para precisão

    // Atualiza os indicadores ativos
    updateBannerIndicators();
}

function updateBannerIndicators() {
    const indicators = document.querySelectorAll('.banner-indicators .indicator');
    indicators.forEach((indicator, index) => {
        if (index === bannerIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Funções de navegação
function nextBanner() {
    bannerIndex++;
    showBanner(bannerIndex);
}

function prevBanner() {
    bannerIndex--;
    showBanner(bannerIndex);
}

// Inicializa o primeiro banner
showBanner(bannerIndex);

// Função para troca automática das imagens a cada 5 segundos
function startAutoSlide() {
    setInterval(() => {
        bannerIndex = (bannerIndex + 1) % banners.length;
        showBanner(bannerIndex);
    }, 5000); // 5000ms = 5 segundos
}

// Inicia a troca automática
startAutoSlide();

// Pausar a animação ao passar o mouse
const marquee = document.getElementById('marquee');

marquee.addEventListener('mouseover', () => {
    const spans = marquee.querySelectorAll('span');
    spans.forEach(span => {
        span.style.animationPlayState = 'paused';
    });
});

marquee.addEventListener('mouseout', () => {
    const spans = marquee.querySelectorAll('span');
    spans.forEach(span => {
        span.style.animationPlayState = 'running';
    });
});

// Sistema de cookies agora gerenciado pelo cookie-manager.js

// Função para fechar o pop-up com animação
function closePopup() {
    const popupContent = document.querySelector('.popup-content');
    popupContent.classList.remove('slide-up');
    popupContent.classList.add('slide-down');
    popupContent.addEventListener('animationend', function() {
        document.getElementById('popup-compra').style.display = 'none';
        popupContent.classList.remove('slide-down');
    }, { once: true });
}

// Evento de clique fora do pop-up
window.addEventListener('click', function(event) {
    const popup = document.getElementById('popup-compra');
    if (event.target === popup) {
        closePopup();
    }
});

// Função para abrir o pop-up com animação e selecionar o tamanho "P" por padrão
function openPopup(name, price, image) {
    const popup = document.getElementById('popup-compra');
    const popupContent = document.querySelector('.popup-content');
    popup.classList.remove('hidden');
    popup.style.display = 'flex';
    document.querySelector('.popup-details h2').textContent = name;
    document.querySelector('.popup-details p').textContent = price;
    document.querySelector('.popup-image').src = image;
    selecionarTamanho('P'); // Seleciona o tamanho "P" por padrão
    popupContent.classList.add('slide-up');
}

// Função para selecionar um tamanho
function selecionarTamanho(tamanho) {
    // Remove a classe "selected" de todos os botões
    document.querySelectorAll('.tamanho-options button').forEach(btn => btn.classList.remove('selected'));
    // Adiciona a classe "selected" ao botão correspondente
    document.querySelectorAll('.tamanho-options button').forEach(btn => {
        if (btn.textContent === tamanho) {
            btn.classList.add('selected');
        }
    });
    // Atualiza o texto ao lado da palavra "Tamanho:"
    const tamanhoSelecionado = document.getElementById('tamanho-selecionado');
    tamanhoSelecionado.textContent = tamanho;
    tamanhoSelecionado.classList.add('bold'); // Adiciona a classe "bold" para negrito
}

// Fechar o pop-up ao carregar a página
window.addEventListener('load', function() {
    document.getElementById('popup-compra').classList.add('hidden');
});

// Abrindo o pop-up ao clicar no botão "Comprar"
document.querySelectorAll('.secaobuy-btn').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const name = this.getAttribute('data-name');
        const price = this.getAttribute('data-price');
        const image = this.getAttribute('data-image');
        openPopup(name, price, image);
    });
});

// Fechando o pop-up ao clicar no botão de fechar
document.querySelector('.close').addEventListener('click', function() {
    closePopup();
});

// Fechando o pop-up ao clicar fora do conteúdo do pop-up
window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('popup-compra')) {
        closePopup();
    }
});

// Seleção de tamanhos
document.querySelectorAll('.tamanho-options button').forEach(button => {
    button.addEventListener('click', function() {
        selecionarTamanho(this.textContent);
    });
});

// Função para aumentar a quantidade
function aumentarQuantidade() {
    const quantidadeInput = document.querySelector('.qty-selector input');
    let quantidade = parseInt(quantidadeInput.value);
    quantidadeInput.value = quantidade + 1;
}

// Função para diminuir a quantidade
function diminuirQuantidade() {
    const quantidadeInput = document.querySelector('.qty-selector input');
    let quantidade = parseInt(quantidadeInput.value);
    if (quantidade > 1) {
        quantidadeInput.value = quantidade - 1;
    }
}

// Função para validar a quantidade
function validarQuantidade() {
    const quantidadeInput = document.querySelector('.qty-selector input');
    let quantidade = parseInt(quantidadeInput.value);
    if (isNaN(quantidade) || quantidade < 1) {
        quantidadeInput.value = 1;
    }
}

// Função para bloquear a inserção de caracteres não permitidos
function bloquearCaracteres(event) {
    const invalidChars = ['-', 'e', '+', '.'];
    if (invalidChars.includes(event.key)) {
        event.preventDefault();
    }
}

// Adicionando eventos aos botões + e -
document.querySelector('.qty-selector button:nth-child(1)').addEventListener('click', diminuirQuantidade);
document.querySelector('.qty-selector button:nth-child(3)').addEventListener('click', aumentarQuantidade);

// Adicionando evento de validação ao campo de quantidade
document.querySelector('.qty-selector input').addEventListener('input', function() {
    const quantidadeInput = document.querySelector('.qty-selector input');
    let quantidade = parseInt(quantidadeInput.value);
    if (isNaN(quantidade) || quantidade < 1) {
        quantidadeInput.value = '';
    }
});

// Adicionando evento para bloquear caracteres não permitidos
document.querySelector('.qty-selector input').addEventListener('keydown', bloquearCaracteres);

// Adicionando evento para validar a quantidade ao perder o foco
document.querySelector('.qty-selector input').addEventListener('blur', validarQuantidade);

// Função para adicionar ao carrinho
function adicionarAoCarrinho() {
    const nome = document.querySelector('.popup-details h2').textContent;
    const preco = document.querySelector('.popup-details p').textContent;
    const imagem = document.querySelector('.popup-image').src;
    const tamanho = document.getElementById('tamanho-selecionado').textContent;
    const quantidade = parseInt(document.querySelector('.qty-selector input').value);

    const item = {
        nome: nome,
        preco: preco,
        imagem: imagem,
        tamanho: tamanho,
        quantidade: quantidade
    };

    // Pega o carrinho atual do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    // Verifica se o item já existe no carrinho (mesmo nome e tamanho)
    const itemExistente = carrinho.find(itemCarrinho => 
        itemCarrinho.nome === item.nome && itemCarrinho.tamanho === item.tamanho
    );

    if (itemExistente) {
        // Se já existe, apenas aumenta a quantidade
        itemExistente.quantidade += item.quantidade;
    } else {
        // Se não existe, adiciona o novo item
        carrinho.push(item);
    }

    // Salva no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Fecha o pop-up
    closePopup();

    // Mostra mensagem de sucesso
    alert('Produto adicionado ao carrinho com sucesso!');
}

// Adiciona evento ao botão de compra do pop-up
document.addEventListener('DOMContentLoaded', function() {
    const compraBtn = document.querySelector('.compra-btn');
    if (compraBtn) {
        compraBtn.addEventListener('click', adicionarAoCarrinho);
    }
});

// FUNCIONALIDADES DO MODAL DE LOGIN

// Função para abrir o modal de login
function openLoginModal() {
    const modal = document.getElementById('login-modal');
    modal.classList.remove('hidden');
    showTab('login'); // Mostra a aba de login por padrão
}

// Função para fechar o modal de login
function closeLoginModal() {
    const modal = document.getElementById('login-modal');
    modal.classList.add('hidden');
}

// Função para alternar entre as abas (login, registro, recuperação)
function showTab(tabName) {
    // Remove a classe active de todas as abas e formulários
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.form-container').forEach(form => form.classList.remove('active'));
    
    // Adiciona a classe active na aba e formulário correspondente
    if (tabName === 'login') {
        document.querySelector('.tab-btn:first-child').classList.add('active');
        document.getElementById('login-form').classList.add('active');
    } else if (tabName === 'register') {
        document.querySelector('.tab-btn:last-child').classList.add('active');
        document.getElementById('register-form').classList.add('active');
    } else if (tabName === 'forgot') {
        // Para recuperação de senha, não há aba, apenas mostra o formulário
        document.getElementById('forgot-form').classList.add('active');
    }
}

// Event listeners para o modal de login
document.addEventListener('DOMContentLoaded', function() {
    // Evento para abrir o modal quando clicar no link de login
    document.querySelectorAll('a[href="#login"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openLoginModal();
        });
    });
    
    // Evento para fechar o modal quando clicar no X
    const closeBtn = document.querySelector('.login-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLoginModal);
    }
    
    // Evento para fechar o modal quando clicar fora dele
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeLoginModal();
            }
        });
    }
    
    // Eventos para os formulários
    const loginForm = document.querySelector('#login-form form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Aqui você pode adicionar a lógica de autenticação
            alert('Login realizado com sucesso!\nEmail: ' + email);
            closeLoginModal();
        });
    }
    
    const registerForm = document.querySelector('#register-form form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('As senhas não coincidem!');
                return;
            }
            
            // Aqui você pode adicionar a lógica de registro
            alert('Conta criada com sucesso!\nNome: ' + name + '\nEmail: ' + email);
            closeLoginModal();
        });
    }
    
    const forgotForm = document.querySelector('#forgot-form form');
    if (forgotForm) {
        forgotForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('forgot-email').value;
            
            // Aqui você pode adicionar a lógica de recuperação de senha
            alert('Instruções de recuperação enviadas para: ' + email);
            showTab('login');
        });
    }
});

// Função global para ser chamada pelos botões de aba
window.showTab = showTab;