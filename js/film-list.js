export function render(data) {

    const films = data.results;
  
    const container = document.createElement('div');
    container.classList.add('film-container');
  
    let id = 1;

    films.forEach((film) => {
  
      const card = document.createElement('div');
      card.classList.add('card');
  
      const image = document.createElement('div');
      image.classList.add('card__image', `image-${id}`);
  
      const content = document.createElement('div');
      content.classList.add('card__content');
  
      const link = document.createElement('a');
      link.href = `?film=${id}`;
      link.classList.add('card__link');
  
      const header = document.createElement('h2');
      header.classList.add('card__header');
  
      const title = document.createElement('p');
      title.innerText = 'Star Wars';
      title.classList.add('card__title');
  
      const subtitle = document.createElement('p');
      subtitle.innerText = film.title;
      subtitle.classList.add('card__subtitle');
  
      const year = document.createElement('p');
      year.classList.add('card__year');
      year.innerText = new Date(film.release_date).getFullYear();
  
      header.append(title, subtitle, year);
      link.append(header);
      content.append(link);
      card.append(image, content);
      container.append(card);
  
      id += 1;
    });
  
    return container;
  }