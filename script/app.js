var editor = document.getElementById("editor1");
var codeArea = document.getElementById("codeArea");
var btn2 = document.getElementById("btn2");
var options = document.querySelectorAll(".options");
var errormsg = document.getElementById("ErrorMsg");
var addQuestionBtn = document.getElementById("addQuestionBtn");
var CorrectOption = document.getElementById("CorrectOption");
var questionNumber = 0;

function applyFocus(val) {
    if (val.classList.contains("abc")) {
        val.classList.remove("abc");
    } else {
        val.classList.add("abc");
    }
}

function alertMsg() {
    let alertBox = document.getElementById("customAlert");
    alertBox.style.opacity = "2";
    alertBox.style.top = "60px";
    setTimeout(function() {
        alertBox.style.opacity = "0";
        alertBox.style.top = "0px";
    }, 2000);
}
window.addEventListener('DOMContentLoaded', ()=>{
    if (document.body.offsetWidth < 825) {
        sideBars(0);
        sideBars(1);
        document.querySelectorAll(".Mob-res").forEach(element => {
            element.style.display = "none"
        });
        alert("I have detect that you have opened this website in a small device (Mobile Phone). Whose width is less than 825px. If you want to use this website efficiently, then please open it in large device (Laptop, Desktop).");
    }
})

function sideBars(val) {
    let sidebarLeft = document.querySelector("#leftSidebar");
    let content = document.querySelector(".content");
    let sidebarRight = document.querySelector("#rightSidebar");
    if (val == 0) {
        if (sidebarLeft.classList.contains("leftDisable")) {
            sidebarLeft.classList.replace("leftDisable", "left");
            content.style.marginLeft = "16.5rem";
        } else {
            sidebarLeft.classList.replace("left", "leftDisable");
            content.style.marginLeft = "1rem";
        }
    }
    if (val == 1) {
        if (sidebarRight.classList.contains("rightDisable")) {
            sidebarRight.classList.replace("rightDisable", "right");
            content.style.marginRight = "16.5rem";
        } else {
            sidebarRight.classList.replace("right", "rightDisable");
            content.style.marginRight = "1rem";
            content.style.width = "100%";
        }
    }
}

function setCode() {
    codeArea.value == "";
    let freshCode = editor.innerHTML.split("<div><br></div>;").join("<br/>;");
    codeArea.innerText = freshCode;
}

function CreateButton(str) {
    let afterClickbtn = "this.innerHTML=" + `"${str}"`;
    let btn = document.createElement("button");
    btn.setAttribute("onclick", afterClickbtn);
    btn.setAttribute("class", "Quiz-Button-Style");
    let textNode = document.createTextNode("View Answer");
    btn.appendChild(textNode);
    return btn;
}

function switchTab(pos) {
    let btn1 = document.getElementById("btn1");
    switch (pos) {
        case 0:
            if (btn1.getAttribute("class") == "defaultBtn") {
                btn1.classList.remove("defaultBtn");
                btn1.classList.add("tab_btn");
                editor.style.display = "block";
                codeArea.style.display = "none";
                btn2.classList.remove("tab_btn");
                btn2.classList.add("defaultBtn");
            }
            break;
        case 1:
            setCode();
            if (btn2.getAttribute("class") == "defaultBtn") {
                btn2.classList.remove("defaultBtn");
                btn2.classList.add("tab_btn");
                editor.style.display = "none";
                codeArea.style.display = "block";
                btn1.classList.remove("tab_btn");
                btn1.classList.add("defaultBtn");
            }
            break;
    }
}

function clearEditor() {
    if (confirm("You Really Want to Clear The Editor , Changes Cannot Be Rolled Back")) {
        editor.innerText = "";
        codeArea.innerText = "";
    }
}

function brTagAppend() {
    let brTag = document.createElement("br");
    editor.appendChild(brTag);
}

function addQuestionInEditor() {
    questionNumber++;
    let div = document.createElement("div");
    let h3 = document.createElement("h3");
    let op1 = document.createElement("p");
    let op2 = document.createElement("p");
    let op3 = document.createElement("p");
    let op4 = document.createElement("p");
    let opText1 = document.createTextNode("A) " + options[1].value);
    let opText2 = document.createTextNode("B) " + options[2].value);
    let opText3 = document.createTextNode("C) " + options[3].value);
    let opText4 = document.createTextNode("D) " + options[4].value);
    let h3Text = document.createTextNode(questionNumber + ". " + options[0].value);
    h3.appendChild(h3Text);
    op1.appendChild(opText1);
    op2.appendChild(opText2);
    op3.appendChild(opText3);
    op4.appendChild(opText4);
    div.appendChild(h3);
    div.appendChild(op1);
    div.appendChild(op2);
    div.appendChild(op3);
    div.appendChild(op4);
    div.appendChild(CreateButton(CorrectOption.value));
    editor.appendChild(div);
    brTagAppend();
    options.forEach(element => {
        element.value = "";
    });
}

function addQuestion() {
    for (let i = 0; i < options.length; i++) {
        if (options[i].value == "") {
            switch (++i) {
                case 1:
                    errormsg.innerText = "Question Required";
                    break;
                case 2:
                    errormsg.innerText = "Option A Required";
                    break;
                case 3:
                    errormsg.innerText = "Option B Required";
                    break;
                case 4:
                    errormsg.innerText = "Option C Required";
                    break;
                case 5:
                    errormsg.innerText = "Option D Required";
                    break;
            }
            break;
        }
    }
    if (CorrectOption.value == "") {
        errormsg.innerText = "Correct Option Required";
        return false;
    }
    if (options[0].value != "" && options[1].value != "" && options[2].value != "" && options[3].value != "" && options[4].value != "") {
        errormsg.innerText = "";
        addQuestionInEditor();
    }
}

function addTrueFalseQuestion() {
    if (options[0].value == "") {
        errormsg.innerText = "Question is Required";
        return false;
    }
    if (CorrectOption.value == "") {
        errormsg.innerText = "Correct Option is Required";
        return false;
    } else {
        questionNumber++;
        let div = document.createElement("div");
        let h3Text = document.createTextNode(questionNumber + ". " + options[0].value);
        let h3 = document.createElement("h3");
        let op1 = document.createElement("p");
        let op2 = document.createElement("p");
        let opText1 = document.createTextNode("A) " + options[1].value);
        let opText2 = document.createTextNode("B) " + options[2].value);
        h3.appendChild(h3Text);
        op1.appendChild(opText1);
        op2.appendChild(opText2);
        div.appendChild(h3);
        div.appendChild(op1);
        div.appendChild(op2);
        div.appendChild(CreateButton(CorrectOption.value));
        editor.appendChild(div);
        brTagAppend();
        options[0].value = "";
        options[4].value = "";
    }
}

function trueFalse() {
    let checkBox = document.getElementById("twoOption");
    if (checkBox.checked == true) {
        options[3].setAttribute("disabled", "true");
        options[4].setAttribute("disabled", "true");
        options[3].value = "";
        options[4].value = "";
        options[1].value = "True";
        options[2].value = "False";
        addQuestionBtn.setAttribute("onclick", "addTrueFalseQuestion()");
    } else {
        options[3].removeAttribute("disabled");
        options[4].removeAttribute("disabled");
        options[1].value = "";
        options[2].value = "";
        addQuestionBtn.setAttribute("onclick", "addQuestion()");
    }
}

function CopyCode() {
    var ftext = editor.innerHTML;

    function listener(e) {
        e.clipboardData.setData("text/plain", ftext);
        e.preventDefault();
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
    alertMsg();
}

function CopyFormattedText() {
    var ftext = editor.innerHTML;

    function listener(e) {
        e.clipboardData.setData("text/html", ftext);
        e.clipboardData.setData("text/plain", ftext);
        e.preventDefault();
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
    alertMsg();
}

function CopyText() {
    var myText = editor.innerText;
    var tempInput = document.createElement("input");
    tempInput.type = "text";
    tempInput.value = myText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("Copy");
    document.body.removeChild(tempInput);
    alertMsg();
}

function sfunction() {
    return "You really Want To Exit";
}

function backgroundColorSet() {
    let bgcolor = document.getElementById("bgColor").value;
    document.execCommand("hiliteColor", false, bgcolor);
}

function textColorSet() {
    let textColor = document.getElementById("textColor").value;
    document.execCommand("styleWithCSS", true, null);
    document.execCommand("foreColor", false, textColor);
}

function insertLink(url) {
    if (url == "") {
        alert("Enter A Valid URL: Field Can not be Blank");
        return false;
    } else {
        document.execCommand("createLink", false, url);
    }
}

function backToTop() {
    let homeContent = document.querySelector(".content");
    homeContent.scrollTop = 0;
}