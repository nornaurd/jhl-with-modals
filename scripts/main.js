document.addEventListener('DOMContentLoaded', () => {
  // === Завантаження header ===
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    fetch('partials/header.html')
      .then(res => res.text())
      .then(html => headerPlaceholder.innerHTML = html)
      .catch(err => console.error('Помилка при завантаженні header:', err));
  }

  // === Завантаження sub-header з кнопкою Back ===
  const subHeaderPlaceholder = document.getElementById('sub-header-placeholder');
  if (subHeaderPlaceholder) {
    fetch('partials/sub-header.html')
      .then(res => res.text())
      .then(html => {
        subHeaderPlaceholder.innerHTML = html;
        const backBtn = document.getElementById('backButton');
        if (backBtn) {
          backBtn.style.display = 'inline-block';
          backBtn.addEventListener('click', e => {
            e.preventDefault();
            window.history.back();
          });
        }
      })
      .catch(err => console.error('Помилка при завантаженні sub-header:', err));
  }

  // === Підтягування текстів для сторінки (data-page) ===
  if (typeof pageTexts !== 'undefined') {
    const page = document.body.dataset.page;
    if (page && pageTexts[page]) {
      const texts = pageTexts[page];
      for (const [id, text] of Object.entries(texts)) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.matches('input, textarea')) {
          el.placeholder = text;
        } else {
          el.innerHTML = text;
        }
      }
    }

    // === Додатково: підтягування текстів для модального логіну ===
    if (pageTexts.login) {
      const loginTexts = pageTexts.login;
      for (const [id, text] of Object.entries(loginTexts)) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.matches('input, textarea')) {
          el.placeholder = text;
        } else {
          el.innerHTML = text;
        }
      }
    }
  }
});
