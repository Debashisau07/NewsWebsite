const API_KEY="945aaf0fb4534f65b021d169741b9332";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener('load',()=>fetchNews("Israel"));
async function fetchNews(query){
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`)
    const data= await res.json();
    console.log(data);
    bindData(data.articles);
}
function bindData(articles){
    const cardsContainer = document.getElementById("cards-container")
    const newsCardsTemplate = document.getElementById("template-news-card")
    cardsContainer.innerHTML="";
    
    articles.forEach((article) => {
        if(!article.urlToImage)return;
        const cardClone=newsCardsTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone,article){
    const newsImage=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDescription=cardClone.querySelector('#news-desc');
    newsImage.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDescription.innerHTML=article.description;
    newsSource.innerHTML=`${article.source.name}`;
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })
}
function onNavItemClick(id){
    fetchNews(id);
}
const searchButton=document.getElementById('search-button')
const searchText=document.getElementById('search-text')
searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query)  return;
    fetchNews(query);

})