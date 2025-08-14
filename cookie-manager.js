// Sistema unificado de gerenciamento de cookies
// Este arquivo deve ser incluído em todas as páginas

(function() {
    // Verifica se os elementos existem antes de tentar acessá-los
    const cookieBox = document.querySelector(".cookieWrapper");
    const cookieHidden = document.querySelector(".cookie-hidden");
    
    if (!cookieBox) return; // Se não há banner de cookies na página, não faz nada
    
    // Busca pelos botões (diferentes páginas podem ter diferentes classes)
    const acceptBtn = cookieBox.querySelector("button") || 
                     cookieBox.querySelector(".cookieAccept") || 
                     cookieBox.querySelector(".cookieItem");
    const declineBtn = cookieBox.querySelector(".cookieDecline");
    
    // Função auxiliar para obter valor de cookie
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }
    
    // Função para definir cookie com fallback para localStorage
    function setCookieConsent(type, value) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 dias
        
        // Tenta definir cookie
        try {
            document.cookie = `${type}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
        } catch (e) {
            console.warn('Não foi possível definir cookie, usando localStorage');
        }
        
        // Sempre salva no localStorage como backup
        localStorage.setItem(type, value);
        localStorage.setItem(`${type}_expires`, expires.getTime().toString());
    }
    
    // Função para verificar consentimento com fallback para localStorage
    function getConsentStatus(type) {
        // Primeiro tenta obter do cookie
        const cookieValue = getCookie(type);
        if (cookieValue === 'true') {
            return true;
        }
        
        // Se não encontrou no cookie, verifica localStorage
        const localValue = localStorage.getItem(type);
        const expiresTime = localStorage.getItem(`${type}_expires`);
        
        if (localValue === 'true' && expiresTime) {
            const now = new Date().getTime();
            if (now < parseInt(expiresTime)) {
                return true;
            } else {
                // Expirou, remove do localStorage
                localStorage.removeItem(type);
                localStorage.removeItem(`${type}_expires`);
            }
        }
        
        return false;
    }
    
    // Função para verificar se o cookie já foi definido
    function checkCookieStatus() {
        const cookieAccepted = getConsentStatus('CookieAccepted');
        const cookieDeclined = getConsentStatus('CookieDeclined');
        
        if (cookieAccepted || cookieDeclined) {
            hideCookieBanner();
        } else {
            showCookieBanner();
        }
    }
    
    // Função para ocultar o banner de cookies
    function hideCookieBanner() {
        cookieBox.classList.add("hide");
        
        if (cookieBox.classList.contains("cookie-hidden")) {
            cookieBox.style.display = "none";
        }
        
        if (cookieHidden && cookieHidden !== cookieBox) {
            cookieHidden.style.display = "none";
        }
    }
    
    // Função para mostrar o banner de cookies
    function showCookieBanner() {
        cookieBox.classList.remove("hide");
        
        if (cookieBox.classList.contains("cookie-hidden")) {
            cookieBox.classList.remove("cookie-hidden");
            cookieBox.style.display = "block";
        }
        
        if (cookieHidden && cookieHidden !== cookieBox) {
            cookieHidden.classList.remove("cookie-hidden");
            cookieHidden.style.display = "block";
        }
    }
    
    // Função para aceitar cookies
    function acceptCookies() {
        setCookieConsent('CookieAccepted', 'true');
        hideCookieBanner();
    }
    
    // Função para recusar cookies
    function declineCookies() {
        setCookieConsent('CookieDeclined', 'true');
        hideCookieBanner();
    }
    
    // Adiciona event listeners
    if (acceptBtn) {
        acceptBtn.onclick = acceptCookies;
    }
    
    if (declineBtn) {
        declineBtn.onclick = declineCookies;
    }
    
    // Verifica o status inicial dos cookies
    checkCookieStatus();
})();