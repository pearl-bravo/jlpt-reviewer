let quizItemList = [];
let quizItemSkippedList = [];
let item = "";
let itemSkipped = "";
let itemIndex = 0;

document.getElementById('fileInput').addEventListener('change', function(event) {
    endQuiz();
    quizItemList = [];
    quizItemSkippedList = [];
    initItemSkipped();
    item = "";
    itemSkipped = "";
    itemIndex = 0;
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const contents = e.target.result;
        displayCSV(contents);
    };
    reader.readAsText(file);    
});

function displayCSV(csvText) {
    const rows = csvText.split('\n');
    const table = document.getElementById('csvTable');
    table.innerHTML = "";
    
    rows.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        const cols = row.split(',');
        
        while (cols.length < 5) {
            cols.push(''); 
        }

        const createCell = (text, isHeader) => {
            const cell = isHeader ? document.createElement('th') : document.createElement('td');
            cell.textContent = text?.trim() || '';
            return cell;
        };

        tr.appendChild(createCell(cols[0], rowIndex === 0)); // Kanji
        tr.appendChild(createCell(cols[1], rowIndex === 0)); // Nihongo
        tr.appendChild(createCell(cols[2], rowIndex === 0)); // Eigo
        tr.appendChild(createCell(cols[3], rowIndex === 0)); // Rei Nihongo
        tr.appendChild(createCell(cols[4], rowIndex === 0)); // Rei Eigo
        table.appendChild(tr);

        if (rowIndex > 0) {
            const quizItem = {
                kanji: cols[0],
                nihongo: cols[1],
                eigo: cols[2],
                rei_nihongo: cols[3],
                rei_eigo: cols[4]
            };
            quizItemList.push(quizItem);
        }
    });
    quizItemList = shuffleItems(quizItemList);
    $("#btnTakeQuiz").show();
    $("#csvTable").show(); 
    $("#divResult").hide(); 
}

function takeQuiz() {
    if (itemIndex < quizItemList.length) {
        item = quizItemList[itemIndex];
        itemSkipped = item;
        $("#divKanji").html(item.kanji);
        $("#divDetails").html(item.eigo);            
        $("#txtCorrect").text(item.nihongo);
        $("#txtAnswer").focus();
        $("#txtAnswer").select();
        itemIndex++;
    } else {   
        $("#divResult").show();
        quizItemSkippedList.push(item);
        if (quizItemSkippedList.length > 1) {
            const table = document.getElementById('resultTable');
            table.innerHTML = "";
            quizItemSkippedList.forEach((row, rowIndex) => {
                const tr = document.createElement('tr');            
                while (row.length < 5) {
                    row.push(''); 
                }
        
                const createCell = (text, isHeader) => {
                    const cell = isHeader ? document.createElement('th') : document.createElement('td');
                    cell.textContent = text?.trim() || '';
                    return cell;
                };
            
                tr.appendChild(createCell(row.kanji, rowIndex === 0)); // Kanji
                tr.appendChild(createCell(row.nihongo, rowIndex === 0)); // Nihongo
                tr.appendChild(createCell(row.eigo, rowIndex === 0)); // Eigo
                table.appendChild(tr);
            });       
            $("#divHaveSkips").show();
        } else {
            $("#divPerfect").show();
        }
        endQuiz();        
        $("#csvTable").hide();     
        playNotification("soundNotif");
    }
}

function skipQuiz() {
    if (itemIndex < quizItemList.length) {
        var details = "Uh oh! You Skipped &nbsp;&nbsp;<b>" + itemSkipped.kanji + " : " 
                        + itemSkipped.nihongo + "&nbsp; (" + itemSkipped.eigo + ")</b>";
        $("#skipDetails").html(details);
        $("#alertWrong").hide();
        $("#alertCorrect").hide();
        $("#alertSkip").show();
        $("#txtAnswer").val("");
        $("#txtAnswer").focus();
        $("#txtAnswer").select();
        $("#divProgressBar").append("<div class='itemProgressSkipped' style='width:" 
                        + (100/quizItemList.length) +"%'></div");  
        $("#divProgressBar").show();
        quizItemSkippedList.push(item);
    }
    takeQuiz();
}

function endQuiz() {
    $("#divQuiz").hide();
    $("#btnEndQuiz").hide();
    $("#btnShowEN").hide();
    $("#btnSkip").hide();
    $("#btnTakeQuiz").show();
    $("#csvTable").show();                      
    $("#divProgressBar").hide();              
    $("#divProgressBar").html("");
    quizItemList = shuffleItems(quizItemList);
    quizItemSkippedList = [];
    initItemSkipped();
    item = "";
    itemSkipped = "";
    itemIndex = 0;
}

function showQuiz() {
    takeQuiz();
    $("#alertWrong").hide();
    $("#alertCorrect").hide();
    $("#alertSkip").hide();
    $("#csvTable").hide();
    $("#btnTakeQuiz").hide();
    $("#divResult").hide();
    $("#divHaveSkips").hide();
    $("#divPerfect").hide();
    $("#divQuiz").show();
    $("#btnEndQuiz").show();
    $("#btnShowEN").show();
    $("#btnSkip").show();
}

function wrongAnswer() {
    $("#txtAnswer").css("borde");
}

function toggleHint() {
    if ($("#btnShowEN").html() == "Hide Hint") {
        $("#divDetails").hide();
        $("#btnShowEN").html("Show Hint");
    } else {
        $("#divDetails").show();
        $("#btnShowEN").html("Hide Hint");
    }
}

function shuffleItems(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}

document.getElementById('txtAnswer').addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        let correctAnswer = $("#txtCorrect").text().toUpperCase();
        let userAnswer = this.value.toUpperCase();
        let mutipleAnswer = []
        let isCorrect = false;

        if (correctAnswer.includes(";")) {
            mutipleAnswer = correctAnswer.split(";");
            isCorrect = mutipleAnswer.includes(userAnswer);
        }

        if (userAnswer == correctAnswer || isCorrect) {
            $("#alertCorrect").show();
            $("#alertWrong").hide();
            $("#alertSkip").hide();
            $("#txtAnswer").val("");
            $("#divProgressBar").append("<div class='itemProgressCorrect' style='width:" 
                                        + (100/quizItemList.length) +"%'></div");
            $("#divProgressBar").show();
            playNotification("soundCorrect");
            takeQuiz();
        } else {
            $("#alertWrong").show();
            $("#alertCorrect").hide();
            $("#alertSkip").hide();
            $("#txtAnswer").val("");
            playNotification("soundWrong");
        }
    }
});

function playNotification(id) {
    var audio = document.getElementById(id);
    audio.play();
}

function initItemSkipped() {
    const itemSkippedHeader = {
        kanji: "漢字",
        nihongo: "答え",
        eigo: "ヒント",
        rei_nihongo: "例（日本語",
        rei_eigo: "例（英語）"
    };
    quizItemSkippedList.push(itemSkippedHeader);
}
