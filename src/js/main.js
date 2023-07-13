const cssPromises = {};
const appContainer = document.getElementById('app');

export default function loadResource(src) {
    if(src.endsWith('.js')) {
        return import(src);
    }
    if(src.endsWith('.css')) {
        if(!cssPromises[src]) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = src;
            cssPromises[src] = new Promise(resolve => {
                link.addEventListener('load', () => resolve());
            });
            document.head.append(link);
        }
        return cssPromises[src];
    }
    return fetch(src).then(res => res.json());
}

async function loadPage(module, apiUrl, css) {
  const [pageModule, data] = await Promise.all([module, apiUrl, css].map((src) => loadResource(src)));

  const page = await pageModule.render(data);
  appContainer.append(page);
}

function goToPage() {

  const searchParams = new URLSearchParams(location.search);
  const filmId = searchParams.get('film');
  if(filmId)
    loadPage('./film-details.js',`https://swapi.dev/api/films/${filmId}/`,'./style.css');

  else
    loadPage('./film-list.js','https://swapi.dev/api/films/','./style.css');
}
goToPage();