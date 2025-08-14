// Script para a página de Guia de Medidas

document.addEventListener('DOMContentLoaded', function() {
    // Código específico para a página de guia de medidas pode ser adicionado aqui
    console.log('Página de Guia de Medidas carregada');
    
    // Exemplo: Adicionar interatividade às tabelas de medidas
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
});