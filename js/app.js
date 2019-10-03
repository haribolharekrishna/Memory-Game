/*
 * Create a list that holds all of your cards
 */
var arr = document.getElementsByClassName('card');

let noofmoves = 0 ;
let noofopen = 0 ;
var lastopen;
const rest = document.querySelector('.restart');
rest.addEventListener('click',restart_func);
let hasstarted = false;

var start_time,x;

restart_func();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[currentIndex].className = "card";
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function starter()
{
    x = setInterval(function()
    {
    var now = new Date().getTime();
    var distance = now - start_time;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.querySelector('.timer').textContent = minutes + "m " + seconds + "s";
    document.querySelector('.fmins').textContent = minutes;
    document.querySelector('.fsecs').textContent = seconds;
    },1000);

}

function restart_func()
{
     arr=shuffle(arr);
     noofmoves=0;
     document.querySelector('.moves').textContent = String(noofmoves);
     document.querySelector('.timer').textContent = "0m 0s"
     clearInterval(x);
}
let cls = document.getElementsByClassName('deck')[0];
for(i = 0; i < 16; i++)
{
    cls.appendChild(arr[i]);
    let temp = arr[i];
    temp.addEventListener('click',function(){
        
        if(!temp.classList.contains("match") && !temp.classList.contains("show"))
        {
            noofmoves+=1;
            if(noofmoves==1)
            {
                start_time = new Date().getTime();
                starter();
            }
            temp.className = "card open show";
            if(noofmoves%2==0)
            {
                document.querySelector('.moves').textContent = String(noofmoves/2);
                if(lastopen.childNodes[1].className !== temp.childNodes[1].className)
                {
                    setTimeout(function(){
                    lastopen.className = "card";
                    temp.className = "card";
                    },500);
                }
                else
                {
                    lastopen.className = "card match";
                    temp.className = "card match";
                    noofopen+=2;
                }
                if(noofopen == 16)
                {
                    game_end();
                    clearInterval(x);
                }
            }
            else
            lastopen = temp;
        }
    });
}
function game_end()
{
    console.log("hello");
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    const modalmoves = document.querySelector('.fmoves');
    modalmoves.textContent = String(noofmoves/2);
    span.onclick = function() {
        modal.style.display = "none";
      }
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
