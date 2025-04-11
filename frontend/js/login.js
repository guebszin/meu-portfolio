document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem('auth', 'true');
          window.location.href = '/admin.html'; // vai para painel
        } else {
          alert(data.message || 'Usuário ou senha inválidos');
        }
      } catch (err) {
        console.error('Erro no login:', err);
        alert('Erro ao tentar fazer login');
      }
    });
  }
});
