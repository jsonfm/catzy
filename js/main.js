
const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=6'
const catsContainer = document.getElementById('catsContainer');

const getRandomMichis = async () => {
    return await fetch(API_URL).then(res => res.json())
}

const renderCatCard = (cat) => {
    const html = `
        <div class="cat-card">
            <img class="cat-image" src="${cat.url}">
            <div class="button"><i class="fa-regular fa-heart"></i></div>
        </div>
    `  
    return html; 
}

const renderCatsList = (cats) => {
    let html = ``;
    cats.map((cat) => html += renderCatCard(cat))
    catsContainer.innerHTML = html;    
}

getRandomMichis().then((cats) => {
    renderCatsList(cats);
})