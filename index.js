

const projectName = 'random-quote-machine';
let quotesData;

/*
  Code by Gabriel Nunes
  Modified by Todd Chaffee to use Camper gist for JSON Quote data.
*/

var colors = [
    '#cf81ff',
    '#ff4eff',
    '#ff83b5',
    '#ffc793',
    '#fff28f',
    '#f38ce7',
    '#20c6d8',
    '#20daa9',
    '#f8e3ed',
    '#ff88f0',
    '#f7fc80',
    '#4a5543',
    '#6d8461',
    '#afbb87',
    '#81455f'
];
var currentQuote = '',
  currentAuthor = '';

function getQuotes() {
  return $.ajax({
    headers: {
      Accept: 'application/json'
    },
    url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes);
        console.log('quotesData');
        console.log(quotesData);
      }
    }
  });
}

function getRandomQuote() {
  return quotesData.quotes[
    Math.floor(Math.random() * quotesData.quotes.length)
  ];
}

function getQuote() {
  let randomQuote = getRandomQuote();

  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;

  $('#facebook-share').attr(
    'href',
    'https://www.facebook.com/sharer/sharer.php?u=' + 
      encodeURIComponent('https://example.com') + 
      '&quote=' + encodeURIComponent('"' + currentQuote + '" - ' + currentAuthor)
  );
  

  $('#whatsapp-share').attr(
    'href',
    'https://api.whatsapp.com/send?text=' + 
      encodeURIComponent('"' + currentQuote + '" - ' + currentAuthor)
  );
  

  $('#linkedin-share').attr(
    'href',
    'https://www.linkedin.com/sharing/share-offsite/?url=' + 
      encodeURIComponent('https://example.com') + 
      '&summary=' + encodeURIComponent('"' + currentQuote + '" - ' + currentAuthor)
  );

  $('.quote-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').text(randomQuote.quote);
  });

  $('.quote-author').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#author').html(randomQuote.author);
  });

  var color = Math.floor(Math.random() * colors.length);
  $('html body').animate(
    {
      backgroundColor: colors[color],
      color: colors[color]
    },
    1000
  );
  $('.button').animate(
    {
      backgroundColor: colors[color]
    },
    1000
  );
}

$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });

  $('#new-quote').on('click', getQuote);
});