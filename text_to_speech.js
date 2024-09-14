const synth = window.speechSynthesis;
let pausedText = "";

function speak() {
  const inputText = document.getElementById("input").value;
  if (synth.speaking) {
    // If already speaking, resume from paused position
    synth.resume();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(inputText);
  utterance.onend = function() {
    pausedText = ""; // Reset paused text when finished speaking
  };

  utterance.onpause = function() {
    pausedText = inputText.substring(0, utterance.text.length);
  };

  synth.speak(utterance);
}

function stop() {
  if (synth.speaking) {
    synth.pause();
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const clearButton = document.getElementById("clearButton");
  clearButton.addEventListener("click", function() {
      document.getElementById("input").value = "";
      pausedText = ""; // Reset paused text when resetting
  });
});
