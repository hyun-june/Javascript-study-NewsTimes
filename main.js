const API_KEY='7193a00c8b994a8da934dcf151157b84'
let news = [];

const getLatestNews = async() =>{
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const response = await fetch(url)
    const data = await response.json()
    news = data.articles
    console.log(news)
}

getLatestNews();