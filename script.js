// Get Quotes From API
const quoteContainer=document.getElementById('quote-container')
const quoteText=document.getElementById('quote')
const authorText=document.getElementById('author')
const twitterBtn=document.getElementById('twitter')
const newQuoteBtn=document.getElementById('new-quote')
const loader=document.getElementById('loader');

let apiQuotes=[];

// show loading 
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

// Hide Loading 

function complete(){
     quoteContainer.hidden=false;
     loader.hidden=true;
}

// Showing New Quotes

    function newQuote(){
        loading();
        // Picking a random quote from apiQuotes array
        const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)]
        // Checking if author field is blank and replacing with 'Anonymous '
        if(!quote.author){
            authorText.textContent='Anonymous';
        }
        else{
            authorText.textContent=quote.author;
        }

        // Checking the quote length for styling 
         if(quote.text.length>100){
             quoteText.classList.add('long-quote');
         }
         else{
            quoteText.classList.remove('long-quote');
         }
        //  Set Quote and Hide loader
        quoteText.textContent=quote.text;
        complete();
    }

//  Get Quotes from API
async function getQuotes(){
    loading();
    const apiUrl='https://type.fit/api/quotes';
    try{
        const response=await fetch(apiUrl);
        apiQuotes=await response.json();
        newQuote();
    }catch(error){
        // Catch Error Here
    }
}
//  Tweet Quote 
 
    function tweetQuote(){
        const twitterUrl= `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
        window.open(twitterUrl,'_blank');
    }

    // Event Listeners

    newQuoteBtn.addEventListener('click',newQuote);
    twitterBtn.addEventListener('click',tweetQuote);

//  On load 

getQuotes();
// loading();