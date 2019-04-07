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
function eraseCookie() {
    document.cookie = 'employee id=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    document.cookie = 'position=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

function logout() {
    window.location.href = 'cover.html'
    eraseCookie()

}

// function getProfil(){
var getAllContract = "http://127.0.0.1:5000/getAllContract" 
var getProfile = "http://127.0.0.1:5000/getEmployeeBy/" + getCookie("employee_id")

// GET PROFILE
$.ajax({
    url: getProfile,
    method: "GET",


    success: function (profil) {
        detaiprofile =
        `
            <img src="img/pp.png" alt="" style="width:200px; height:250px; padding:10px 10px;">
            <div class="nameQuiz m-t-15 m-b-10">
                <h3>${profil.fullname}</h3>
                <h3>${profil.position}</h3>
            </div>
        `
        $('#profile').append(detaiprofile)
    },
    error: function (error) {
        //error handling

    },
    complete: function () {

    }
}) 
// GET PROFILE
$.ajax({    
    url: getAllContract,
    method: "GET",
    success: function (contract) {
        for (var i = 0; i < contract.length; i++) {
            var card =
                `
                    <div class="card bg-light mb-3">
                    <div class="card-body d-flex justify-content-around" style="padding: 1rem;">
                        <div class="sat" style="text-align:center;">
                            <p>Contract ID</p>
                            <a href="">${contract[i]['contract_id']}</a>
                        </div>
                        <div class="sat" style="text-align:center;">
                            <p>Scope of Work</p>
                            <a href="">Manpower</a>
                        </div>
                        <div class="sat" style="text-align:center;">
                            <p>Total Price</p>
                            <a href="">Manpower</a>
                        </div>
                        <div class="sat" style="text-align:center;">
                            <p>Purchase Order Date</p>
                            <a href="">Manpower</a>
                        </div>

                        <div class="sat" style="text-align:center;">
                            <button class="btn btn-warning my-2 my-sm-0" type="submit" style="height: 48px; font-size: 14px;">
                            <a href="View_CPO_reviewer.html?contract_id=${contract[i].contract_id}">
                                VIEW PO
                            </a>
                            </button>
                        </div>
                    </div>
                </div>
                `
            $('#contractList').append(card)
        }

    },
    error: function () {

    },
    complete: function () {

    } 

}) 
