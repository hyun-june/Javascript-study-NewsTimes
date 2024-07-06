const API_KEY='7193a00c8b994a8da934dcf151157b84'
let news = [];

const getLatestNews = async() =>{
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const response = await fetch(url)
    const data = await response.json()
    news = data.articles
    console.log("news",news)
    render();
}

const render = ()=>{
    let resultHTML = '';
    for(let i=0;i<news.length;i++){
        resultHTML +=`
        <div class="row news">
            <div class="col-lg-4">
                <img class="news-img-size" src="${news[i].urlToImage}" alt="">
            </div>
            <div class="col-lg-8">
                <h2>${news[i].description}</h2>
                <p>
                    ${news[i].content}
                </p>
                <div>
                    ${news[i].publishedAt}
                </div>
            </div>
        </div>`
    }
    document.querySelector(".news-container").innerHTML = resultHTML;
}

getLatestNews();


const openNav = () => document.getElementById("mySidenav").style.width="250px";

const closeNav = () => document.getElementById("mySidenav").style.width="0";

const searchButton = () =>{   
    let searchArea = document.getElementById("search-area");
    if(searchArea.style.display==='block'){
        searchArea.style.display='none'
    } else{
        searchArea.style.display='block'
    }
}