// Funcionalidades específicas para a página Sobre Nós

// Função para abrir o modal de login
function openLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.classList.remove('hidden');
        showTab('login'); // Mostra a aba de login por padrão
    }
}

// Função para fechar o modal de login
function closeLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Função para alternar entre as abas (login, registro, recuperação)
function showTab(tabName) {
    // Remove a classe active de todas as abas e formulários
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.form-container').forEach(form => form.classList.remove('active'));
    
    // Adiciona a classe active na aba e formulário correspondente
    if (tabName === 'login') {
        const loginBtn = document.querySelector('.tab-btn:first-child');
        const loginForm = document.getElementById('login-form');
        if (loginBtn) loginBtn.classList.add('active');
        if (loginForm) loginForm.classList.add('active');
    } else if (tabName === 'register') {
        const registerBtn = document.querySelector('.tab-btn:last-child');
        const registerForm = document.getElementById('register-form');
        if (registerBtn) registerBtn.classList.add('active');
        if (registerForm) registerForm.classList.add('active');
    } else if (tabName === 'forgot') {
        // Para recuperação de senha, não há aba, apenas mostra o formulário
        const forgotForm = document.getElementById('forgot-form');
        if (forgotForm) forgotForm.classList.add('active');
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