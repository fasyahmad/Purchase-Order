// ======================================== LOGIN =================================================

function login() {
    var email = $('input#email').val()
    var position = $('input#position').val()
    var password = $('input#password').val()
    console.log(email)
    console.log(position)
    console.log(password)  


    $.ajax({
        url: 'http://127.0.0.1:5000/login',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            email: email,
            password: password,
            position: position
        }),
        success: function (response) {
            console.log(response.email)
            console.log(response.position)
            alert("Sign In " + email + " berhasil") //400
            // setCookie("email", response.email, 1)
            // setCookie("position", response.position, 1)
            // setCookie2("email", response.email)
            document.cookie = 'email=' + response.email
            document.cookie = 'position=' + response.position
            document.cookie = 'employee_id=' + response.employee_id
            console.log(response.email)
            console.log(response.position)
            var x = document.cookie;
            var y = getCookie("employee id")
            if (position == 'employee')
                window.location.href = '../contract_list.html';
            else if (position == 'manager')
                window.location.href = '../contract_list_manager.html';
            else if (position == 'scm reviewer')    
                window.location.href = '../contract_list.html';
            else if (position == 'contract owner')
                window.location.href = '../contract_list.html';
        },
        error: function (error) {
            alert("masukkan username dan password dengan benar")
            window.location.href = 'login.html'
        }

    })
}


function setCookie2(){
    document.cookie = 'email=ucupUhe@gmail.com'
}
// cookies
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}