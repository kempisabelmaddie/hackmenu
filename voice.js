//Voice---------------------------------------------------------------------------------------
const texts = document.querySelector(".texts");

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement("p");

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
      // p.innerText = "sure thang";
      texts.appendChild(p);
      navigate(text);
    }
    if (text.includes("burger")) {
      p = document.createElement("p");
      p.classList.add("replay");
      p.innerText = "sure";
      texts.appendChild(p);
      addCart(text);
    }
    if (text.includes("soda")) {
      p = document.createElement("p");
      p.classList.add("replay");
      p.innerText = "sure";
      texts.appendChild(p);
      addCart(text);
    }
    if (text.includes("salad")) {
      p = document.createElement("p");
      p.classList.add("replay");
      p.innerText = "sure";
      texts.appendChild(p);
      addCart(text);
    }
    if (text.includes("pasta")) {
      p = document.createElement("p");
      p.classList.add("replay");
      p.innerText = "sure";
      texts.appendChild(p);
      addCart(text);
    }
    if (text.includes("rice")) {
      p = document.createElement("p");
      p.classList.add("replay");
      p.innerText = "sure";
      texts.appendChild(p);
      addCart(text);
    }
    if (text.includes("cash")||text.includes("visa")||text.includes("MasterCard")||text.includes("Union pay")||text.includes("octopus")
    ||text.includes("cutlery")||text.includes("water")||text.includes("payment")||text.includes("cleaning")||text.includes("others")) {
      p = document.createElement("p");
      p.classList.add("replay");
      p.innerText = "sure";
      texts.appendChild(p);
      payment(text);
    }
    if (text.includes("4")) {
      p = document.createElement("p");
      p.classList.add("replay");
      p.innerText = "sure";
      texts.appendChild(p);
      seating();
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
  if (text == "Union pay"){
    text = "unionpay"
  }
  // console.log(idsymbol)
  console.log(idsymbol.concat(text))
  let myElement = document.querySelector(idsymbol.concat(text));
  myElement.style.backgroundColor = "green";
}

function seating(){
  document.getElementById('map').src='./UI/MAP.png';
}