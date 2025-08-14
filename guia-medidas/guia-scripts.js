// Script para a página de Guia de Medidas

document.addEventListener('DOMContentLoaded', function() {
    // Código específico para a página de guia de medidas
    console.log('Página de Guia de Medidas carregada');
    
    // Adicionar interatividade às tabelas de medidas
    const tabelas = document.querySelectorAll('.tabela-medidas table');
    
    tabelas.forEach(tabela => {
        const linhas = tabela.querySelectorAll('tbody tr');
        
        linhas.forEach(linha => {
            linha.addEventListener('mouseenter', () => {
                linha.style.backgroundColor = '#e6d7c3';
            });
            
            linha.addEventListener('mouseleave', () => {
                // Restaura a cor original (alternando entre linhas pares e ímpares)
                const isPar = Array.from(linhas).indexOf(linha) % 2 === 1;
                linha.style.backgroundColor = isPar ? '#f9f5f0' : '';
            });
        });
    });

    // Funcionalidades do Modal de Login
    const loginModal = document.getElementById('login-modal');
    const loginClose = document.querySelector('.login-close');
    const loginLink = document.querySelector('a[href="#login"]');

    // Abrir modal de login
    function openLoginModal() {
        if (loginModal) {
            loginModal.classList.remove('hidden');
            loginModal.style.display = 'flex';
        }
    }

    // Fechar modal de login
    function closeLoginModal() {
        if (loginModal) {
            loginModal.classList.add('hidden');
            loginModal.style.display = 'none';
        }
    }

    // Event listeners para o modal
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            openLoginModal();
        });
    }

    if (loginClose) {
        loginClose.addEventListener('click', closeLoginModal);
    }

    if (loginModal) {
        loginModal.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                closeLoginModal();
            }
        });
    }

    // Função para alternar entre abas do modal
    window.showTab = function(tabName) {
        // Esconder todos os formulários
        const forms = document.querySelectorAll('.form-container');
        forms.forEach(form => {
            form.classList.remove('active');
        });

        // Remover classe active de todos os botões
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
        });

        // Mostrar o formulário selecionado
        const selectedForm = document.getElementById(tabName + '-form');
        if (selectedForm) {
            selectedForm.classList.add('active');
        }

        // Ativar o botão correspondente (apenas para login e register)
        if (tabName === 'login' || tabName === 'register') {
            const activeBtn = document.querySelector(`[onclick="showTab('${tabName}')"]`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            }
        }
    };

    // Event listeners para os formulários
    const loginForm = document.querySelector('#login-form form');
    const registerForm = document.querySelector('#register-form form');
    const forgotForm = document.querySelector('#forgot-form form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Funcionalidade de login será implementada em breve!');
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Funcionalidade de registro será implementada em breve!');
        });
    }

    if (forgotForm) {
        forgotForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Funcionalidade de recuperação de senha será implementada em breve!');
        });
    }
});