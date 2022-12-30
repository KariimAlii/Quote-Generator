const quote = document.querySelector("#quote");
const newQuoteButton = document.querySelector("#new-quote");
const author = document.querySelector("#author");
const authorLink = document.querySelector("#authorLink");
const quoteLink = document.querySelector("#quoteLink");
const twitter = document.querySelector("#twitter");
const loader = document.querySelector("#loader");
const quoteContainer = document.querySelector("#quote-container");


//===================Loader====================//
function showLoadingSpinner () {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function hideLoadingSpinner () {
    loader.hidden = true;
    quoteContainer.hidden = false;
}
//=================NEW QUOTE===============//
let quoteObject = {};
async function getQuote() {
    showLoadingSpinner();
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key":
                "ed20e7f3edmshebad39ef07cfe21p11fa3bjsn41d4c248f354",
            "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
        },
    };
    try {
        const responce = await fetch(
            "https://quotes15.p.rapidapi.com/quotes/random/",
            options
        );
        quoteObject = await responce.json();
        // if (!quoteObject) getQuote();
    } catch (e) {
        console.log("Request wasnot successfull ! try again !" , e);
    }
    hideLoadingSpinner();
}
const makeNewQuote = () => {
    getQuote();
    console.log(quoteObject);
    if (quoteObject.content.length >= 100) quote.classList.add("long-quote");
    else quote.classList.remove("long-quote");
    quote.textContent = quoteObject.content; 
    quoteLink.setAttribute("href", quoteObject.url);
    if (!quoteObject.originator.name) author.textContent = "Unknown";
    else author.textContent = quoteObject.originator.name;
    authorLink.setAttribute("href", quoteObject.originator.url);
};
// On Loading the page
//======================
// window.addEventListener("load", makeNewQuote);
// window.onload = makeNewQuote();


newQuoteButton.addEventListener("click", makeNewQuote);

//======================Twitter======================//
const tweetQuote = () => {
    let twitterURL = `https://twitter.com/intent/tweet?text=${quote.textContent} - by ${author.textContent}&via=twitterdev`;
    window.open(twitterURL,"_blank")
}
// https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent
// https://twitter.com/intent/tweet?
// text=hello%20world&via=twitterdev
twitter.addEventListener("click",tweetQuote);




makeNewQuote();
