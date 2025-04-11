document.addEventListener("DOMContentLoaded", () => {
  const formProjeto = document.getElementById("form-projeto");
  const tabela = document.getElementById("tabela-projetos");
  const mensagem = document.getElementById("mensagem");
  const projetoIdInput = document.getElementById("projeto-id");
  const formTitle = document.getElementById("form-title");
/*
  // Proteção da página admin
  if (!localStorage.getItem("logado")) {
    window.location.href = "frontend/login.html";
  }

  // Botão de logout
  const btnSair = document.querySelector(".btn-sair");
  if (btnSair) {
    btnSair.addEventListener("click", () => {
      logout();
    });
  }
*/
  // Carregar projetos na tabela
  carregarProjetos();

  // Envio do formulário
  if (formProjeto) {
    formProjeto.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nome = document.getElementById("nome").value.trim();
      const descricao = document.getElementById("descricao").value.trim();
      const link = document.getElementById("link").value.trim();
      const id = projetoIdInput.value;

      const projeto = { nome, descricao, link };

      try {
        if (id) {
          // Atualizar projeto
          const res = await fetch(`/api/projects/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(projeto)
          });
          if (!res.ok) throw new Error("Erro ao atualizar projeto.");
          mensagem.textContent = "Projeto atualizado com sucesso!";
        } else {
          // Criar novo projeto
          const res = await fetch("/api/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(projeto)
          });
          if (!res.ok) throw new Error("Erro ao salvar projeto.");
          mensagem.textContent = "Projeto salvo com sucesso!";
        }

        formProjeto.reset();
        projetoIdInput.value = "";
        formTitle.textContent = "Adicionar Novo Projeto";
        carregarProjetos();
      } catch (err) {
        console.error(err);
        mensagem.textContent = err.message;
      }
    });
  }

  // Função para carregar os projetos cadastrados
  async function carregarProjetos() {
    tabela.innerHTML = "";

    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Erro ao buscar projetos.");
      const projetos = await res.json();

      projetos.forEach((p, index) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
          <td>${p.nome}</td>
          <td>${p.descricao}</td>
          <td><a href="${p.link}" target="_blank">${p.link}</a></td>
          <td>
            <button onclick="editarProjeto(${index})">Editar</button>
            <button onclick="excluirProjeto(${index})">Excluir</button>
          </td>
        `;
        tabela.appendChild(linha);
      });
    } catch (err) {
      console.error(err);
      tabela.innerHTML = "<tr><td colspan='4'>Erro ao carregar projetos.</td></tr>";
    }
  }

  // Função global para editar
  window.editarProjeto = async function (index) {
    try {
      const res = await fetch("/api/projects");
      const projetos = await res.json();
      const p = projetos[index];

      document.getElementById("nome").value = p.nome;
      document.getElementById("descricao").value = p.descricao;
      document.getElementById("link").value = p.link;
      projetoIdInput.value = index;
      formTitle.textContent = "Editar Projeto";
    } catch (err) {
      console.error("Erro ao carregar projeto para edição:", err);
    }
  };

  // Função global para excluir
  window.excluirProjeto = async function (index) {
    if (!confirm("Deseja realmente excluir este projeto?")) return;

    try {
      const res = await fetch(`/api/projects/${index}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Erro ao excluir projeto.");
      mensagem.textContent = "Projeto excluído com sucesso!";
      carregarProjetos();
    } catch (err) {
      console.error(err);
      mensagem.textContent = err.message;
    }
  };

  // Função de logout
  //function logout() {
    //localStorage.removeItem("logado");
    //window.location.href = "frontend/login.html";
  //}
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-projeto');
  const mensagem = document.getElementById('mensagem');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const projeto = {
      nome: document.getElementById('nome').value,
      descricao: document.getElementById('descricao').value,
      link: document.getElementById('link').value
    };

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projeto)
      });

      const data = await res.json();

      if (res.ok) {
        mensagem.textContent = 'Projeto salvo com sucesso!';
        mensagem.style.color = 'green';
        form.reset();
        carregarProjetos(); // recarrega a tabela
      } else {
        mensagem.textContent = data.error || 'Erro ao salvar.';
        mensagem.style.color = 'red';
      }
    } catch (err) {
      console.error('Erro:', err);
      mensagem.textContent = 'Erro ao conectar ao servidor.';
      mensagem.style.color = 'red';
    }
  });

  carregarProjetos();
});

async function carregarProjetos() {
  const tabela = document.getElementById('tabela-projetos');
  tabela.innerHTML = '';
  try {
    const res = await fetch('/api/projects');
    const projetos = await res.json();

    projetos.forEach((projeto, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${projeto.nome}</td>
        <td>${projeto.descricao}</td>
        <td><a href="${projeto.link}" target="_blank">Ver</a></td>
        <td>
          <!-- Ações de editar/deletar podem ir aqui -->
        </td>
      `;
      tabela.appendChild(row);
    });
  } catch (err) {
    console.error('Erro ao carregar projetos:', err);
  }
}

