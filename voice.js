//Voice---------------------------------------------------------------------------------------
const texts = document.querySelector(".texts");

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let div = document.createElement("div");
div.classList.add("spoken");

const food = ['Salad','Burger','Risotto','Ice Cream','Crepes'];
const help = ["Cutlery","Water","Payment","Cleaning","Other"];
const payments = ['Cash','Visa','MasterCard','Union Pay','Octopus'];
const homepage = ['dine in', 'take away', 'takeaway'];

const pushToTextbox = (text) => {
  var newdiv = document.createElement("div");
  newdiv.classList.add("replay");
  newdiv.innerHTML = text;
  let sp2 = document.getElementById("talk-box-bottom")
  // texts.appendChild(newdiv);
  texts.insertBefore(newdiv, sp2);
  console.log(texts)
  console.log(newdiv)
  scrollButtom();
}

recognition.addEventListener("result", (e) => {
  let sp2 = document.getElementById("talk-box-bottom")
  // texts.appendChild(div);
  console.log(texts)
  console.log(div)
  texts.insertBefore(div, sp2);
  scrollButtom();
  const text = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  div.innerHTML = text;
  if (e.results[0].isFinal) {
    var hasAction = false;
    if (text.includes("page")) {
      pushToTextbox("Okay, attempting to navigate you to the corresponding page");
      navigate(text);
      hasAction = true;
    }
    var foodAdded = [];
    var cancel = text.includes("cancel")
    for (var i = 0; i<food.length; i++){
      var f = food[i].toLowerCase();
      var count = text.split(f).length - 1;
      if (count > 0){
        foodAdded.push(count.toString()+" "+food[i]+(count>1&&food[i][food[i].length-1]!=="s"?"s":""));
        hasAction = true;
        if (cancel){
          cancelOrder(food[i]);
        }
        else{
          for (var j = 0; j<count; j++){addCart(food[i]);}
        }
      }
    }
    if (foodAdded.length > 0){
      if (cancel){
        pushToTextbox("We will cancel the order for "+foodAdded.join(", ")+" from cart (if found)")
      }
      else{
        pushToTextbox("Sure, added "+foodAdded.join(", ")+" to cart")
      }
    }
    var foundPayments = []
    for (var i = 0; i<payments.length; i++){
      if (text.includes(payments[i].toLowerCase()) || text.includes(payments[i])){
        foundPayments.push(payments[i]);
      }
    }
    if (foundPayments.length===1){
      pushToTextbox("Sure, will check out by "+foundPayments[0]);
      lightup(foundPayments[0]);
      hasAction = true;
    } else if (foundPayments.length>1){
      pushToTextbox("You mentioned "+foundPayments.join(", ")+". Which method would you prefer?");
      lightup("");
      hasAction = true;
    }
    var foundSeating = []
    for (var i = 0; i<homepage.length; i++){
      if (text.includes(homepage[i].toLowerCase()) || text.includes(homepage[i])){
        foundSeating.push(homepage[i]);
      }
    }
    if (foundSeating.length===1){
      pushToTextbox("Sure, you will "+foundSeating[0]);
      lightup(foundSeating[0].replace(" ", ""));
      hasAction = true;
    } else if (foundSeating.length>1){
      pushToTextbox("You mentioned "+foundSeating.join(", ")+". Please confirm your choice.");
      lightup("");
      hasAction = true;
    }
    var helpFound = [];
    for (var i = 0; i<help.length; i++){
      if (text.includes(help[i].toLowerCase())){
        if (!text.includes("page")){
          helpFound.push(help[i]);
          hasAction = true;
          lightup(help[i],true);
        }
      }
    }
    if (helpFound.length > 0){
      pushToTextbox("Sure, our staff will help you with "+helpFound.join(", ")+".");
    }
    if (text.includes("4")||text.includes("2")||text.includes("6")||text.includes("3")||
    text.includes("four")||text.includes("two")||text.includes("six")||text.includes("three")) {
      pushToTextbox("Okay, we'll provide an available table.");
      hasAction=true;
      seating(text);
    }
    //
    if (!hasAction){
      pushToTextbox("Sorry, we haven't detected an action to perform. Can you try again?")
    }
    p = document.createElement("p");
    // const len = () => texts.innerHTML.match(/class=/g).length
    // while (len() > 4){
    //   texts.removeChild(texts.firstChild);
    // }
    div = document.createElement("div");
    div.classList.add("spoken");
  }
});

recognition.addEventListener("end", () => {
  recognition.start();
});
recognition.start();

//functions---------------------------------------------------------------------------------------

function navigate(text){
  var foundPage = false;
  const pages = ["home","menu","seating","help","payment"];
  for (var i = 0; i<pages.length; i++){
    if (text.includes(pages[i])){
      window.location.href = pages[i]+".html";
      foundPage = true;
      break;
    }
  }
  if (!foundPage) {
    pushToTextbox('"'+words.join(" ")+'"'+" doesn't contain a page name.")
    pushToTextbox('Try "home", "menu", "seating", "help", or "payment".')
  }
}

function addCart(text){
  var div = document.createElement("div");
  div.innerHTML = text;
  document.getElementById("checkout-cards").appendChild(div);
}

function lightup(text,allowMulti = false){
  text = text.replace(" ","").toLowerCase();
  if (!allowMulti){
    var elems = document.getElementsByClassName("lightable");
    for (var i = 0; i<elems.length; i++){
      elems[i].style.backgroundColor = "#fff";
    }
  }
  var myElement = document.querySelector("#"+text);
  myElement.style.backgroundColor = "#77ff77";
}

function seating(text){
  console.log(text)
  if(text.includes("1")||text.includes("one")||text.includes("2")||text.includes("two")){
    document.getElementById('map').src='./UI/2.png';
  }
  else if(text.includes("3")||text.includes("three")){
    document.getElementById('map').src='./UI/3.png';
  }
  else if (text.includes("4")||text.includes("four")){
    document.getElementById('map').src='./UI/4.png';
  }
  else if(text.includes("5")||text.includes("five")||text.includes("6")||text.includes("six")){
    document.getElementById('map').src='./UI/6.png';
  } else {
    document.getElementById('map').src='./UI/MAP.png';
    pushToTextbox("Sorry, we don't have a table large enough for "+text+" people.");
  }
  //
}

function scrollButtom(){
  var elmnt = document.getElementById("talk-box-bottom");
  elmnt.scrollIntoView();
}

function cancelOrder(cancelFood){
  var cards = document.querySelectorAll("#checkout-cards > div");
  var originalCards = document.querySelector("#checkout-cards");
  for (var i = 0; i < cards.length; i++){
    if (cards[i].innerHTML == cancelFood){
      originalCards.removeChild(cards[i]);
      break;
    }
 }
  // list.removeChild(list.childNodes[0]);
}