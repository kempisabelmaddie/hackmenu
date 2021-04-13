//Voice---------------------------------------------------------------------------------------
const texts = document.querySelector(".texts");

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement("p");

const food = ['Salad','Burger','Risotto','Ice Cream','Crepes'];
const payments = ['Cash','Visa','MasterCard','Union Pay','Octopus'];

recognition.addEventListener("result", (e) => {
  texts.appendChild(p);
  const text = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  p.innerText = text;
  if (e.results[0].isFinal) {
    if (text.includes("page")) {
      p = document.createElement("p");
      p.classList.add("replay");
      p.innerText = "Okay, navigating you to next page";
      texts.appendChild(p);
      navigate(text);
    }
    for (var i = 0; i<food.length; i++){
      if (text.includes(food[i].toLowerCase())){
        p = document.createElement("p");
        p.classList.add("replay");
        p.innerText = "Sure, adding "+food[i].toLowerCase()+" to cart";
        texts.appendChild(p);
        addCart(food[i]);
      }
    }
    for (var i = 0; i<payments.length; i++){
      if (text.includes(payments[i].toLowerCase())){
        p = document.createElement("p");
        p.classList.add("replay");
        p.innerText = "Sure, will check out by "+payments[i];
        texts.appendChild(p);
        payment(payments[i]);
      }
    }
    p = document.createElement("p");
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
  // console.log(idsymbol)
  console.log(idsymbol.concat(text))
  let myElement = document.querySelector(idsymbol.concat(text));
  myElement.style.backgroundColor = "green";
}


