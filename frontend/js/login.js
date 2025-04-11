document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const erroDiv = document.getElementById("login-erro");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const usuario = document.getElementById("usuario").value.trim();
      const senha = document.getElementById("senha").value.trim();
  
      // Autenticação simples
      if (usuario === "luis" && senha === "26494587bA$") {
        localStorage.setItem("logado", true);
        window.location.href = "/frontend/admin.html";
      } else {
        erroDiv.textContent = "Usuário ou senha inválidos!";
      }
    });
  });
  