function saveFormData(form) {
    console.log("in add");
    var output = "";
    for (i = 0; i < form.length - 1; i++) {
        output += form.elements[i].value + "\n";
    }

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(output));
    element.setAttribute('download', "gameData.txt");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

}

function updateData(data) {
    let values = [];
    var string = "";
    for (i = 0; i < data.length; i++) {
        if (data[i] === '\n') {
            values.push(string);
            string = "";
        } else {
            string += data[i];
        }
    }

    for (i = 0; i < values.length; i++) {
        document.forms[0].elements[i].value = values[i];
    }
}

function handleFileSelection(event) {
    const messageDisplay = document.getElementById("message");

    const file = event.target.files[0];
    messageDisplay.textContent = ""; // Clear previous messages

    // Validate file existence and type
    if (!file) {
        showMessage("No file selected. Please choose a file.", "error");
        return;
    }

    if (!file.type.startsWith("text")) {
        showMessage("Unsupported file type. Please select a text file.", "error");
        return;
    }

    // Read the file
    const reader = new FileReader();
    reader.onload = () => {
        updateData(reader.result);
    };
    reader.onerror = () => {
        showMessage("Error reading the file. Please try again.", "error");
    };
    reader.readAsText(file);
}

// Displays a message to the user
function showMessage(message, type) {
    messageDisplay.textContent = message;
    messageDisplay.style.color = type === "error" ? "red" : "green";
}

function play() {
    // go to index.html
}
