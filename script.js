const apiKey="ce0677e74c5845fa854d3db00f5ea349";
const BlogContainer = document.getElementById('blogContainer');
const SearchField = document.getElementById('searchInput');
const SearchButton = document.getElementById('searchBtn');

async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pagesize=10&apiKey=${apiKey}`;
        const respones = await fetch(apiUrl);
        const data = await respones.json();
        return data.articles;
    }
    catch(error){
        console.error("Error Fetching The Random News",error);
      return[]
    }
}

SearchButton.addEventListener("click",async() => {
    const query = SearchField.value.trim()
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        }catch(error){
            console.log("Error fetching News by query",error);
        }
    }
})

async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pagesize=10&apiKey=${apiKey}`;
        const respones = await fetch(apiUrl);
        const data = await respones.json();
        return data.articles;
    }
    catch(error){
        console.error("Error Fetching The Random News",error);
      return[];
    }
}

function displayBlogs(articles){
    BlogContainer.innerHTML = "";
    articles.forEach((article) => {
        const BlogCard = document.createElement("div");
        BlogCard.classList.add("blogCard");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30?article.title.slice(0,30) + "...." : article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        const truncatedDes = article.description && article.description.length > 50
        ? article.description.slice(0, 100) + "..."
        : article.description || '';
        description.textContent = truncatedDes;


        BlogCard.appendChild(img);
        BlogCard.appendChild(title);
        BlogCard.appendChild(description);
        BlogCard.addEventListener("click",()=>{
            window.open(article.url, "_blank");
        });
        BlogContainer.appendChild(BlogCard);
    });
}

 (async() =>{
    try{
       const article= await fetchRandomNews();
       displayBlogs(article);
    }
    catch(error){
        console.error("Error Fetching The Random News",error); 
    }
 })();
