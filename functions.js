function saveFormData(form) {
    var output = "";
    for (i = 0; i < form.length - 1; i++) {
        output += form.elements[i].value + "//";
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
        if (data[i] == '/' && data[i + 1] == '/') {
            values.push(string);
            string = "";
            i++;
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


function playGame(form) {
    for (i = 0; i < 6; i++) {
        key = "cat" + (i + 1).toString();
        //console.log(key + form.elements[i].value);
        localStorage.setItem(key, form.elements[i].value);
    }
    let catagory = 1;
    let question = 1;
    let valueIndex = 6;
    for (i = 6; i < 12; i++) {
        while (question < 6) {
            key = "v" + catagory.toString() + "_" + question.toString();
            localStorage.setItem(key, form.elements[valueIndex].value);
            question++;
            valueIndex++;
        }
        catagory++;
        question = 1;
        valueIndex = 6;
    }

    catagory = 1;
    question = 1;
    for (i = 12; i < form.length; i++) {
        localStorage.setItem((catagory.toString() + "_" + question.toString()), "1");

        key = "q" + catagory.toString() + "_" + question.toString();
        //console.log(key + form.elements[i].value);
        localStorage.setItem(key, form.elements[i].value);
        i++;
        key = "a" + catagory.toString() + "_" + question.toString();
        //console.log(key + form.elements[i].value);
        localStorage.setItem(key, form.elements[i].value);
        question++;
        if (question == 6) {
            question = 1;
            catagory++;
        }
        if (catagory == 7) {
            break;
        }
    }
    window.location.href = "index.html";
    console.log(localStorage);
}

function fillForm() {
    form = document.getElementById("qForm");
    for (i = 0; i < 6; i++) {
        key = "cat" + (i + 1).toString();
        //console.log(key + form.elements[i].value);
        form.elements[i].value = localStorage.getItem(key);
    }

    let question = 1;
    for (i = 6; i < 12; i++) {
        key = "v" + "1" + "_" + question.toString();
        form.elements[i].value = localStorage.getItem(key);
        console.log(form.elements[i].value);
        question++;
    }

    let catagory = 1;
    question = 1;
    for (i = 12; i < form.length; i++) {
        key = "q" + catagory.toString() + "_" + question.toString();
        //console.log(key + form.elements[i].value);
        form.elements[i].value = localStorage.getItem(key);
        i++;
        key = "a" + catagory.toString() + "_" + question.toString();
        //console.log(key + form.elements[i].value);
        form.elements[i].value = localStorage.getItem(key);
        question++;
        if (question == 6) {
            question = 1;
            catagory++;
        }
        if (catagory == 7) {
            break;
        }
    }

}

function getData() {
    console.log("in get");
    console.log(localStorage);
    var catagories = [];
    var questions = [];
    var answers = [];
    var values = [];
    for (i = 0; i < 6; i++) {
        questions.push([]);
        answers.push([]);
        values.push([]);
    }

    // loops to get categories
    for (i = 0; i < 6; i++) {
        key = "cat" + (i + 1).toString();
        //console.log(key + form.elements[i].value);
        catagories.push(localStorage.getItem(key));
        document.getElementById(key).innerHTML = catagories[i];
    }

    let catagory = 1;
    let question = 1;
    //loops to get values in boxes
    while (true) {
        key = "v" + catagory.toString() + "_" + question.toString();
        if (localStorage.getItem(catagory.toString() + "_" + question.toString()) == "1") {
            values[catagory - 1][question - 1] = localStorage.getItem(key);
            document.getElementById(key).innerHTML = values[catagory - 1][question - 1];
        } else {
            document.getElementById(key).innerHTML = "";
        }

        question++;
        if (question == 6) {
            question = 1;
            catagory++;
        }
        if (catagory == 7) {
            break;
        }
    }
}

function questionClicked(event) {
    let key = event.target.id;
    let q = "q" + key.substring(1, 4);
    let a = "a" + key.substring(1, 4);
    localStorage.setItem("question", q);
    localStorage.setItem("answer", a);
    localStorage.setItem(key.substring(1, 4), "0");

    window.location.href = "question.html";
}

function resetGame() {
    let catagory = 1;
    let question = 1;
    while (catagory < 7) {
        localStorage.setItem((catagory.toString() + "_" + question.toString()), "1");
        question++;
        if (question == 6) {
            question = 1;
            catagory++;
        }
    }
    getData();
}

function showAnswer() {
    window.location.href = "answer.html";
}

function fillQuestion() {
    let key = localStorage.getItem("question");
    document.getElementById("question").innerHTML = localStorage.getItem(key);
}

function fillAnswer() {
    let key = localStorage.getItem("answer");
    document.getElementById("answer").innerHTML = localStorage.getItem(key);
}

function returnToGame() {
    window.location.href = "index.html";
}

function goToEdit() {
    window.location.href = "questionForm.html";
}
