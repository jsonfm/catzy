
const API_KEY = 'live_S2Yfckv7yM9yyxXZnmCdim91QdNltzv4SYcoHM8OaLDDIibwMnv2eXCtKDON9P0b';
const BASE_URL = 'https://api.thecatapi.com/v1';


const catsContainer = document.getElementById('catsContainer');
const catsFavContainer = document.getElementById('catsFavContainer');


const saveCat = async (id) => {
    const res = await fetch(`${BASE_URL}/favourites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({
          image_id: id
        }),
    })
    .then(res => res.json());
    console.log("res: ", res)
    getFavourites();
}

const deleteCat = async(id) => {
    const res = await fetch(`${BASE_URL}/favourites/${id}`, {
        method: 'DELETE',
        headers: {
            'x-api-key': API_KEY,
        }
    })
    .then(res => res.json());
    getFavourites();
}

const renderCatCard = (cat) => {
    const html = `
        <div class="cat-card">
            <img class="cat-image" src="${cat.url}">
            <div class="button" onclick="saveCat('${cat.id}')"><i class="fa-regular fa-heart"></i></div>
        </div>
    `  
    return html; 
}

const renderFavCatCard = (cat) => {
    const html = `
        <div class="cat-card">
            <img class="cat-image" src="${cat.image.url}">
            <div class="button" onclick="deleteCat('${cat.id}')"><i class="fa-sharp fa-solid fa-trash"></i></div>
        </div>
    `  
    return html; 
}

const renderCatsList = (cats) => {
    let html = ``;
    cats.map((cat) => html += renderCatCard(cat))
    catsContainer.innerHTML = html;    
}

const renderFavoritesList = (cats) => {
    let html = ``;
    cats.map((cat) => html += renderFavCatCard(cat))
    catsFavContainer.innerHTML = html;   
}

const getFavourites = async() => {
    const cats = await fetch(`${BASE_URL}/favourites/?api_key=${API_KEY}`).then(res => res.json());
    renderFavoritesList(cats);
}

const getRandomMichis = async () => {
    const cats = await fetch(`${BASE_URL}/images/search?limit=6`).then(res => res.json());
    renderCatsList(cats)
 }

getRandomMichis();
getFavourites();