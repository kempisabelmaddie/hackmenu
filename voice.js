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
    if (text.includes("next page")) {
      p = document.createElement("p");
      p.classList.add("replay");
      p.innerText = "sure thang";
      texts.appendChild(p);
      navigate();
    }
    if (text.includes("burger")) {
      p = document.createElement("p");
      p.classList.add("replay");
      p.innerText = "sure thang";
      texts.appendChild(p);
      addCart(text);
    }
    if (text.includes("soda")) {
      p = document.createElement("p");
      p.classList.add("replay");
      p.innerText = "sure thang";
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

function navigate(){
  window.location.href = "menu.html";
}

function addCart(text){
  var div = document.createElement("div");
  div.innerHTML = text;
  document.getElementById("checkout-cards").appendChild(div);
}


