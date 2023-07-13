export async function render(data) {

    const page = document.createElement('div');
    page.classList.add('page');

    const backLink = document.createElement('a');
    backLink.classList.add('page__link');
    backLink.innerText = '◄ Back to episodes';
    backLink.href = './';

    const header = document.createElement('h1');
    header.classList.add('page__header');

    const episode = document.createElement('span');
    episode.classList.add('page__episode');
    episode.innerText = `Episode ${data.episode_id}: `;

    const title = document.createElement('span');
    title.classList.add('page__title');
    title.innerText = data.title;

    header.append(episode, title);

    const stage = document.createElement('div');
    stage.classList.add('page__stage');
    const openingCrawl = document.createElement('p');
    openingCrawl.classList.add('page__descr');
    openingCrawl.innerText = data.opening_crawl;
    stage.append(openingCrawl);

    const info = document.createElement('div');
    info.classList.add('page__info');

    const planetsContainer = document.createElement('div');
    planetsContainer.classList.add('page__info-block');
    const planetsCaption = document.createElement('h2');
    planetsCaption.classList.add('page__info-title');
    planetsCaption.innerText = 'Planets';

    const planetsList = document.createElement('ul');
    planetsList.classList.add('page__list');
    for (let planet of data.planets) {
        const listItem = document.createElement('li');
        listItem.classList.add('page__item') ;
        const planetData = await fetch(planet).then(res => res.json());
        listItem.innerText = planetData.name;
        planetsList.append(listItem);
    }
    planetsContainer.append(planetsCaption, planetsList);

    const speciesContainer = document.createElement('div');
    speciesContainer.classList.add('page__info-block');
    const speciesCaption = document.createElement('h2');
    speciesCaption.classList.add('page__info-title');
    speciesCaption.innerText = 'Species';

    const speciesList = document.createElement('ul');
    speciesList.classList.add('page__list');
    for (let species of data.species) {
        const listItem = document.createElement('li');
        listItem.classList.add('page__item');
        const speciesData = await fetch(species).then(res => res.json());
        listItem.innerText = speciesData.name;
        speciesList.append(listItem);
    }
    speciesContainer.append(speciesCaption, speciesList);

    const shipsContainer = document.createElement('div');
    shipsContainer.classList.add( 'page__info-block');
    const starshipsCaption = document.createElement('h2');
    starshipsCaption.classList.add('page__info-title');
    starshipsCaption.innerText = 'Starships';

    const starshipsList = document.createElement('ul');
    starshipsList.classList.add('page__list');
    for (let ship of data.starships) {
        const listItem = document.createElement('li');
        listItem.classList.add('page__item');
        const shipData = await fetch(ship).then(res => res.json());
        listItem.innerHTML = shipData.name
        starshipsList.append(listItem);
    }
    shipsContainer.append(starshipsCaption, starshipsList);

    info.append(planetsContainer, speciesContainer, shipsContainer);

    page.append(backLink, header, stage, info);

    return page;
}