
const mainForm = document.getElementById("mainForm");
const modeToggle = document.getElementById("toggleMode");
const idGroup = document.getElementById("idInputGroup");
const customGroup = document.getElementById("customInputGroup");


modeToggle.addEventListener("change", function () {
  if (this.checked) {
    idGroup.classList.add("hidden");
    customGroup.classList.remove("hidden");
    document.getElementById("userID").removeAttribute("required");
    document.getElementById("skipValue").setAttribute("required", "");
  } else {
    idGroup.classList.remove("hidden");
    customGroup.classList.add("hidden");
    document.getElementById("skipValue").removeAttribute("required");
    document.getElementById("userID").setAttribute("required", "");
  }
});

mainForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputText = document.getElementById("textInput").value.trim();
  let interval;

  if (modeToggle.checked) {
    interval = parseInt(document.getElementById("skipValue").value) || 1;
    if (interval < 1) interval = 1;
  } else {
    const userId = document.getElementById("userID").value.trim();
    if (!userId.match(/\d/)) {
      alert("Please enter a valid ID number with digits");
      return;
    }
    interval =
      [...userId.match(/\d/g)]
        .map(Number)
        .reduce((total, num) => total + num, 0) || 1;
  }

  if (!inputText) {
    alert("Please enter text to transform");
    return;
  }

  const modifiedText = processText(inputText, interval);
  displayResult(inputText, modifiedText, interval, modeToggle.checked);
});

const processText = (text, interval) => {
  if (interval >= text.length) return [...text].reverse().join("");

  const chars = [...text];
  const reversed = chars
    .filter((_, idx) => (idx + 1) % interval !== 0 && chars[idx] !== " ")
    .reverse();

  return chars
    .map((ch, idx) =>
      (idx + 1) % interval === 0 || ch === " " ? ch : reversed.shift()
    )
    .join("");
};

const displayResult = (source, result, interval, isCustom) => {
  const entry = document.createElement("div");
  entry.className = "result-card";
  entry.innerHTML = `
          <p><strong>Original:</strong> ${source}</p>
          <p><strong>Result:</strong> ${result}</p>
          <p class="timestamp">
              ${new Date().toLocaleString()} • 
              Skip interval: ${interval} (${
    isCustom ? "custom" : "calculated"
  })
          </p>
      `;
  document.getElementById("outputList").prepend(entry);
};
