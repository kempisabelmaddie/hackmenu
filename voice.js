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
const payments = ['Cash','Visa','MasterCard','Union Pay','Octopus'];

const pushToTextbox = (text) => {
  var newdiv = document.createElement("div");
  newdiv.classList.add("replay");
  newdiv.innerHTML = text;
  texts.appendChild(newdiv);
}

recognition.addEventListener("result", (e) => {
  texts.appendChild(div);
  const text = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("").substr(textIndex);

  div.innerHTML = text;
  if (e.results[0].isFinal) {
    textIndex = text.length;
    var hasAction = false;
    if (text.includes("page")) {
      pushToTextbox("Okay, navigating you to next page");
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
    for (var i = 0; i<payments.length; i++){
      if (text.includes(payments[i].toLowerCase()) || text.includes(payments[i])){
        pushToTextbox("Sure, will check out by "+payments[i]);
        payment(payments[i]);
        hasAction = true;
      }
    }
    if (!hasAction){
      pushToTextbox("Sorry, we haven't detected an action to perform. Can you try again?")
    }
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

function incrementValue(){
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('number').value = value;
}

function decrementValue(){
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value--;
  document.getElementById('number').value = value;
}

function navigate(text){
  var page = text.split(" ", 1);
  console.log(page.join(""))
  switch(page.join("")) {
    case "menu":
      var nav = page.concat(".html");
      window.location.href = nav.join("");
      break;
    case "seating":
      var nav = page.concat(".html");
      window.location.href = nav.join("");
      break;
    case "cart":
      var nav = page.concat(".html");
      window.location.href = nav.join("");
      break;
    case "payment":
      var nav = page.concat(".html");
      window.location.href = nav.join("");
      break;
    default:
      var div = document.createElement("div");
      div.innerHTML = "page not found";
      document.getElementById("pageerror").appendChild(div);
  }
  
  // window.location.href = nav.join("");
}

function addCart(text){
  var div = document.createElement("div");
  div.innerHTML = text;
  document.getElementById("checkout-cards").appendChild(div);
}

function payment(text){
  var idsymbol = "#"
  text = text.replace(" ","").toLowerCase();
  var myElement = document.querySelector(idsymbol+text);
  myElement.style.backgroundColor = "green";
}


