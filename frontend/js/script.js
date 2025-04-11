// Aguarda o carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("projetos-container");
  
    // Busca os projetos cadastrados no back-end
    fetch("/api/projects")
      .then(res => {
        if (!res.ok) {
          throw new Error("Erro ao buscar projetos.");
        }
        return res.json();
      })
      .then(projetos => {
        if (!Array.isArray(projetos) || projetos.length === 0) {
          container.innerHTML = "<p>Nenhum projeto encontrado.</p>";
          return;
        }
  
        projetos.forEach(projeto => {
          const card = document.createElement("div");
          card.className = "card";
  
          card.innerHTML = `
            <h3>${projeto.nome}</h3>
            <p>${projeto.descricao}</p>
            <a href="${projeto.link}" target="_blank">Ver Projeto</a>
          `;
  
          container.appendChild(card);
        });
      })
      .catch(erro => {
        console.error("Erro ao carregar projetos:", erro);
        container.innerHTML = "<p>Erro ao carregar os projetos. Tente novamente mais tarde.</p>";
      });
  });

  function logar() {
    window.location.href = "frontend/login.html";
  }
  