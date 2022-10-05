const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
        quoteContainer.hidden = false;
        loader.hidden = true;
}

//show New Quote
function newQuote() {
    loading();
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank end replace it whit 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling 
    if(quote.text.length>120){
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote');
    }
    // set quote, hide loader
quoteText.textContent = quote.text;
complete();
}
// Get Quote From API 
async function getQuotes() {
    loading();
   const apiUrl = 'https://type.fit/api/quotes';
   try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        if(apiQuotes.error) {
            console.log("error connection", apiQuotes.error.message);
        }else if(apiQuotes.length == 0) {
            console.log("error connection", "l'api est vide");
        }else {
            newQuote();
        }
       } catch(error){
       // Catch Error Here
       if (error instanceof TypeError) {
        console.log("error connection", "TypeError");
      } else if (error instanceof RangeError) {
        console.log("error connection", "RangeError");
      } else if (error instanceof EvalError) {
        console.log("error connection", "EvalError");
      } else if (error instanceof SyntaxError) {
        console.log("error connection", "SyntaxError ...");
      } else {
        // statements to handle any unspecified exceptions
        logMyErrors(error); // pass exception object to error handler
        console.log("error connection", error.message);
      }
      
    }
}


// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners 
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load 
getQuotes();
