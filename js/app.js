/*
 * Create a list that holds all of your cards
 */
//var arr = document.getElementsByClassName('card');
let ulRating = document.querySelector('.stars');
let rating = 3.0;
const tiles = {
    "ANCHOR": "fa-anchor",
    "BICYCLE": "fa-motorcycle",
    "BOLT": "fa-bolt",
    "BOMB": "fa-bomb",
    "CUBE": "fa-cube",
    "DIAMOND": "fa-diamond",
    "LEAF": "fa-leaf",
    "PAPER_PLANE": "fa-paper-plane"
};
let items = new Array(16);
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
    var currentIndex = 16, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    for(let i = 0 ; i < 16 ; i++)
    {
        items[i] = document.createElement('li');
        items[i].className = "card";
        items[i].innerHTML = "<i class=\"fa "+array[i]+"\"></i>";
    }
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
function game_end()
{
    console.log("hello");
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    const modalmoves = document.querySelector('.fmoves');
    document.querySelector('.rating').textContent = String(rating);
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


function restart_func()
{
     rating = 3.0;
     ulRating.children.item(0).className = "fa fa-star";
     ulRating.children.item(1).className = "fa fa-star";
     ulRating.children.item(2).className = "fa fa-star";
     var tileitems = new Array(16);
     var i = 0;
     for(tile in tiles)
     {
         tileitems[i] = tiles[tile];
         tileitems[i+1] = tiles[tile];
         i+=2;
     }
     shuffle(tileitems);
     console.log(tileitems);
     noofmoves = 0;
     noofopen = 0;
     document.querySelector('.moves').textContent = String(noofmoves);
     document.querySelector('.timer').textContent = "0m 0s"
     clearInterval(x);

}
     let cls = document.getElementsByClassName("deck")[0];
     for(var i=0;i<16;i++){
        cls.appendChild(items[i]);
    }
     
    for(i = 0; i < 16; i++)
    {
        let temp = items[i];
        temp.addEventListener('click',function(){
            
            if(!temp.classList.contains("match") && !temp.classList.contains("show"))
            {
                noofmoves+=1;
                if(noofmoves==1)
                {
                    start_time = new Date().getTime();
                    starter();
                }
                temp.classList.add("open");
                temp.classList.add("show");
                console.log(temp);
                if(noofmoves%2==0)
                {
                    document.querySelector('.moves').textContent = String(noofmoves/2);
                    if(lastopen.childNodes[0].className !== temp.childNodes[0].className)
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
            if((noofmoves/2)>38){
                rating = 0.5;
                ulRating.children.item(0).className = "fa fa-star-half-o";
                ulRating.children.item(1).className = "";
                ulRating.children.item(2).className = "";
            } else if ((noofmoves/2) > 30) {
                //If moves is greater than 30, set rating to 1 and update UI
                rating = 1.0;
                ulRating.children.item(0).className = "fa fa-star";
                ulRating.children.item(1).className = "";
                ulRating.children.item(2).className = "";
            } else if ((noofmoves/2) > 24) {
                //If moves is greater than 24, set rating to 1.5 and update UI
                rating = 1.5;
                ulRating.children.item(0).className = "fa fa-star";
                ulRating.children.item(1).className = "fa fa-star-half-o";
                ulRating.children.item(2).className = "";
            } else if ((noofmoves/2) > 20) {
                //If moves is greater than 20, set rating to 2 and update UI
                rating = 2.0;
                ulRating.children.item(0).className = "fa fa-star";
                ulRating.children.item(1).className = "fa fa-star";
                ulRating.children.item(2).className = "";
            } else if ((noofmoves/2) > 16) {
                //If moves is greater than 16, set rating to 2.5 and update UI
                rating = 2.5;
                ulRating.children.item(0).className = "fa fa-star";
                ulRating.children.item(1).className = "fa fa-star";
                ulRating.children.item(2).className = "fa fa-star-half-o";
            } else {
                //If moves is less than or equal to 16, set rating to 3 and update UI
                rating = 3.0;
                ulRating.children.item(0).className = "fa fa-star";
                ulRating.children.item(1).className = "fa fa-star";
                ulRating.children.item(2).className = "fa fa-star";
            }
        });
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
