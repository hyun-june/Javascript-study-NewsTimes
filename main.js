// const API_KEY='7193a00c8b994a8da934dcf151157b84'
// let url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`)
let url = new URL(`https://javascript-study-newstimes.netlify.app/top-headlines`)
let newsList = [];

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const menus = document.querySelectorAll(".menus button");
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)))
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("search-btn").click();
    }
})

const getNews = async () => {
    try {
        url.searchParams.set("page", page);
        url.searchParams.set("pageSize", pageSize);
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        if (response.status === 200) {
            if (data.articles.length === 0) {
                throw new Error("No result for this search")
            }
            newsList = data.articles;
            totalResults = data.totalResults
            render();
            paginationRender();
        } else {
            throw new Error(data.message)
        }
    } catch (error) {
        errorRender(error.message)
    }
}

const getLatestNews = async () => {
    // url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`)
    url = new URL(`https://javascript-study-newstimes.netlify.app/top-headlines`)
    getNews()
}

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    // url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`)
    url = new URL(`https://javascript-study-newstimes.netlify.app/top-headlines?category=${category}`)
    getNews()
}

const getNewsByKeyword = async () => {
    page = 1;
    const keyword = searchInput.value;
    // url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`);
    url = new URL(`https://javascript-study-newstimes.netlify.app/top-headlines?q=${keyword}`)
    getNews()
    searchInput.value = '';
}

const render = () => {
    let newsHTML = newsList.map(news => `<div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" src="${news.urlToImage ? news.urlToImage : "https://as2.ftcdn.net/v2/jpg/02/51/95/53/1000_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"}" alt="">
        </div>
        <div class="col-lg-8">
            <h2>${news.title ? news.title : "No Title"}</h2>
            <p>
                ${news.description == null || news.description == "" ? "내용 없음" 
                : news.description.length > 200 ? news.description.substring(0, 200) + "..."
                : news.description}
            </p>
            <div>
                ${news.source.name ? news.source.name : "no source"} * ${moment(news.published_date).fromNow()}
            </div>
        </div>
    </div>`).join('');

    document.getElementById("news-board").innerHTML = newsHTML;
}

const errorRender = (errorMessage) => {
    const errorHTML = `<div class="alert alert-danger" role="alert">
        ${errorMessage}
    </div>`

    document.getElementById("news-board").innerHTML = errorHTML
}

const paginationRender = () => {
    const totalPages = Math.ceil(totalResults / pageSize);
    const pageGroup = Math.ceil(page / groupSize);
    let lastPage = pageGroup * groupSize;
    if (lastPage > totalPages) {
        lastPage = totalPages;
    }

    let firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

    let paginationHTML = page == firstPage ? "" : `
    <li class="page-item" onclick="moveToPage(1)"><a class="page-link" href="#">&lt;&lt;</a></li>
    <li class="page-item" onclick="moveToPage(${page - 1})"><a class="page-link" href="#">&lt;</a></li>`;

    for (let i = firstPage; i <= lastPage; i++) {
        paginationHTML += `<li class="page-item ${i === page ? 'active' : ""}" onclick="moveToPage(${i})"><a class="page-link" href="#">${i}</a></li>`;
    }

    paginationHTML += page == lastPage ? "" : `
    <li class="page-item" onclick="moveToPage(${page + 1})"><a class="page-link" href="#">&gt;</a></li>
    <li class="page-item" onclick="moveToPage(${totalPages})"><a class="page-link" href="#">&gt;&gt;</a></li>`;
    document.querySelector(".pagination").innerHTML = paginationHTML;
}

const moveToPage = (pageNum) => {
    page = pageNum;
    getNews();
}

getLatestNews();


const openNav = () => document.getElementById("mySidenav").style.width = "250px";

const closeNav = () => document.getElementById("mySidenav").style.width = "0";

const searchButton = () => {
    let searchArea = document.getElementById("search-area");
    if (searchArea.style.display === 'block') {
        searchArea.style.display = 'none'
    } else {
        searchArea.style.display = 'block'
    }
}
