async function loadArtworks() {
  try {
      const response = await fetch('artworks.json');
      if (!response.ok) {
          throw new Error('Сетевая ошибка при загрузке данных');
      }
      const artworks = await response.json();

      const container = document.getElementById('cards');

      // Проходим по каждому произведению искусства и создаем карточку
      artworks.forEach(artwork => {
          const card = document.createElement('article');
          card.className = 'card';

          card.innerHTML = `
              <div class="card-front">
                  <img class="artwork-image" src="${artwork.image}" alt="${artwork.name}" loading="lazy">
              </div>
              <div class="card-back">
                  <p class="artwork-name">«${artwork.name || 'Без названия'}»</p>
                  <p class="artwork-author">${artwork.author || 'Автор неизвестен'}</p>
                  <p class="artwork-style">${artwork.style || 'Стиль неизвестен'}</p>
              </div>
          `;

          // Добавляем обработчик клика на карточку
          card.addEventListener('click', () => {
              const front = card.querySelector('.card-front');
              const back = card.querySelector('.card-back');

              // Переключаем отображение front и back
              if (front.style.display === 'none') {
                  front.style.display = 'block';
                  back.style.display = 'none';
              } else {
                  front.style.display = 'none';
                  back.style.display = 'block';
              }
          });

          // Добавляем карточку в контейнер
          container.appendChild(card);
      });
  } catch (error) {
      console.error('Ошибка:', error);
  }
}

// Вызываем функцию загрузки картин при загрузке страницы
window.onload = loadArtworks;