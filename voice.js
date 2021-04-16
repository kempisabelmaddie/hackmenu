//Voice---------------------------------------------------------------------------------------
const texts = document.querySelector(".texts");

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
var textIndex = 0;

let div = document.createElement("div");
div.classList.add("spoken");

const food = ['Salad','Burger','Risotto','Ice Cream','Crepes'];
const help = ["Cutlery","Water","Payment","Cleaning","Others"];
const payments = ['Cash','Visa','MasterCard','Union Pay','Octopus'];
const homepage = ['Dine-in', 'takeaway'];

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
    .join("").substr(textIndex);

  div.innerHTML = text;
  if (e.results[0].isFinal) {
    textIndex = text.length;
    var hasAction = false;
    if (text.includes("page")) {
      pushToTextbox("Okay, attempting to navigate you to the corresponding page");
      navigate(text);
      hasAction = true;
    }
    var foodAdded = [];
    for (var i = 0; i<food.length; i++){
      if (text.includes(food[i].toLowerCase())){
        addCart(food[i]);
        foodAdded.push(food[i]);
        hasAction = true;
      }
    }
    if (foodAdded.length > 0){
      pushToTextbox("Sure, added "+foodAdded.join(", ")+" to cart")
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
      hasAction = true;
    }
    var helpFound = [];
    for (var i = 0; i<help.length; i++){
      if (text.includes(help[i].toLowerCase())){
        if (!text.includes("page")){
          helpFound.push(help[i]);
          hasAction = true;
          lightup(help[i]);
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
    const len = () => texts.innerHTML.match(/class=/g).length
    while (len() > 4){
      texts.removeChild(texts.firstChild);
    }
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
  var words = text.split(" ");
  var foundPage = false;
  const pages = ["home","menu","seating","help","payment"];
  for (var i = 0; i<words.length; i++){
    if (pages.includes(words[i])){
      window.location.href = words[i]+".html";
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

function lightup(text){
  var idsymbol = "#"
  text = text.replace(" ","").toLowerCase();
  var myElement = document.querySelector(idsymbol+text);
  myElement.style.backgroundColor = "green";
}

function seating(text){
  console.log(text)
  if (text.includes("4"||"four")){
    document.getElementById('map').src='./UI/4.png';
  }
  else if(text.includes("2"||"two")){
    document.getElementById('map').src='./UI/2.png';
  }
  else if(text.includes("3"||"three")){
    document.getElementById('map').src='./UI/3.png';
  }
  else if(text.includes("6"||"six")){
    document.getElementById('map').src='./UI/6.png';
  }
  //document.getElementById('map').src='./UI/MAP.png';
}

function scrollButtom(){
  var elmnt = document.getElementById("talk-box-bottom");
  elmnt.scrollIntoView();
}