// REGISTER ========
function register(){
    var username = document.getElementById('username').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    console.log(username);
    console.log(email);
    console.log(password);

    $.ajax({
        url: 'http://127.0.0.1:5000/addUser?',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            username: username,
            email: email,
            password: password
        }),
        success: function(){
            alert("anda berhasil bergabung")
            window.location.href = 'quizlist.html'
        },
        error: function(){
            alert("andah gagal bergabung")
        },
        complete: function(){
            console.log("mantul")
        }
    })
}   
// REGISTER ========

// ADD QUIZ ========
function createQuiz() {
  var creator = document.getElementById("creator_id").value;
  var name = document.getElementById("quiz_name").value;
  var category = document.getElementById("quiz_category").value;
  console.log(creator);
  console.log(name);
  console.log(category);

  $.ajax({
    url: "http://127.0.0.1:5000/addQuiz",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      creator_id: creator,
      quiz_name: name,
      quiz_category: category
    }),
    success: function() {
      alert("quiz telah siap");
        window.location.href = "createQuestion.html";
    },
    error: function() {
      alert("andah gagal bergabung");
    },
    complete: function() {
      console.log("mantul");
    }
  });
}   
// ADD QUIZ ========


// function log in ======================================
function login() {
    var username = document.getElementById('username-form').value
    var password = document.getElementById('password-form').value
    console.log(username)
    console.log(password)
    // Jquery
    // var username = $('input#username-form').val
    // var password = $('input#password-form').val

    $.ajax({
        url: 'http://127.0.0.1:5000/login',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            username: username,
            password: password
        }),
        success: function (response) {
            window.location.href = 'quizlist.html'
        },
        error: function () {
            alert("gagal log in")
        },
        complete: function () {
            console.log("apa ini")
        }
    })

}
// function log in ======================================

