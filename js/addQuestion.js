function isquestion(){
    var url_string = window.location.href
    var url = new URL(url_string);
    var quiz_id = Number(url.searchParams.get("quiz_id"));
    console.log(quiz_id)
    createQuestion(quiz_id)
}


// ADD QUESTION
function createQuestion(quiz_id) {
    // var quiz_id = document.getElementById("quiz").value;
    var question_number = document.getElementById("number").value;
    var question = document.getElementById("question").value;
    var answer = document.getElementById("answer").value
    var answerA = document.getElementById("answerA").value
    var answerB = document.getElementById("answerB").value
    var answerC = document.getElementById("answerC").value
    var answerD = document.getElementById("answerD").value
    console.log(quiz_id);
    console.log(question_number);
    console.log(question);
    console.log(answer);
    console.log(answerA);
    console.log(answerB);
    console.log(answerC);
    console.log(answerD);




    $.ajax({
        url: `http://127.0.0.1:5000/addQuestion/${quiz_id}`,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            quiz_id: quiz_id,
            question_number: question_number,
            question: question,
            answer: answer,
            option_list: {
                a: answerA,
                b: answerB,
                c: answerC,
                d: answerD
            }
        }),
        success: function () {
            alert("anda berhasil menambahkan question");
            window.location.href = `questionList.html?quiz_id=${quiz_id}`
        },
        error: function () {
            alert("andah gagal membuat question");
        },
        complete: function () {
            console.log("mantul");
        }
    });
} 
