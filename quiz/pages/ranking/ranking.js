async function fetchRanking() {
    try {
        const response = await fetch("http://localhost:3000/ranking");
        const ranking = await response.json();

        const rankingElements = document.querySelectorAll(".ranking");

        ranking.forEach((player, index) => {
            if (index < rankingElements.length) { // Garante que o índice não ultrapasse os slots
                const nameSpan = rankingElements[index]?.querySelector(".name");
                const scoreSpan = rankingElements[index]?.querySelector(".score");

                if (nameSpan && scoreSpan) {
                    nameSpan.innerText = player.name || "Jogador desconhecido";
                    scoreSpan.innerText = `${player.score || 0} de 5`;
                }
            }
        });

        // Limpa slots restantes se não houver jogadores suficientes
        for (let i = ranking.length; i < rankingElements.length; i++) {
            const nameSpan = rankingElements[i]?.querySelector(".name");
            const scoreSpan = rankingElements[i]?.querySelector(".score");

            if (nameSpan) nameSpan.innerText = "";
            if (scoreSpan) scoreSpan.innerText = "";
        }
    } catch (error) {
        console.error("Erro ao buscar ranking:", error);
    }
}
