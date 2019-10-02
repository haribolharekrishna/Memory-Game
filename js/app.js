/*
 * Create a list that holds all of your cards
 */
var arr = document.getElementsByClassName('card');

let noofmoves = 0 ;
let noofopen = 14 ;
var lastopen;
var s =0;
var m =0;
flag = 0;
const rest = document.querySelector('.restart');
rest.addEventListener('click',restart_func);

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


function restart_func()
{
     arr=shuffle(arr);
     noofmoves=0;
     document.querySelector('.moves').textContent = String(noofmoves);
     document.querySelector('.mins').textContent = "00";
     document.querySelector('.secs').textContent = "00";
     s = 0;
     m = 0;
     flag = 0;
}
function incre()
{
    document.querySelector('.mins').textContent = String(getmins());
    document.querySelector('.secs').textContent = String(getsecs());
    s++;
    setTimeout(incre(),1000);
}
function getmins()
{
    m = Math.floor(s/ 60); 
    return m; 
}
function getsecs()
{
    return s - Math.round(m * 60);
}
let cls = document.getElementsByClassName('deck')[0];
for(i = 0; i < 16; i++)
{
    cls.appendChild(arr[i]);
    let temp = arr[i];
    temp.addEventListener('click',function(){
        
        /*if(flag === 0)
        {
            flag = 1;
            setTimeout(incre());
        }*/
        if(!temp.classList.contains("match") && !temp.classList.contains("show"))
        {
            noofmoves+=1;
            if(noofmoves%2==0)
            document.querySelector('.moves').textContent = String(noofmoves/2);
            temp.className = "card open show";
            noofopen+=1;
            if(noofmoves%2==0)
            {
                if(lastopen.childNodes[1].className !== temp.childNodes[1].className)
                {
                    setTimeout(function(){
                    lastopen.className = "card";
                    temp.className = "card";
                    noofopen-=2;
                    },500);
                }
                else
                {
                    lastopen.className = "card match";
                    temp.className = "card match";
                }
                if(noofopen == 16)
                {
                    game_end();
                }
            }
            else
            lastopen = temp;
        }
    });
}
function game_end()
{
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
