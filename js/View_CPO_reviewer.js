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
$.ajax({
    url: getProfile,
    method: "GET",
    success: function (profil) {
        profile =
        `
            <p>${profil.fullname}</p>
            <p>${profil.position}</p>
        `
        $('#profileInfo').append(profile)
    },
    error: function (error) {
        //error handling
    },
    complete: function () {

    }
})

// ============================================
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
// ============================================


//Contract Purchase Order ========================================
var url_string = window.location.href
var url = new URL(url_string);
var contract_id = Number(url.searchParams.get("contract_id"));

// GET CONTRACT INFO
$.ajax({
    url: `http://127.0.0.1:5000/getContractByContractId/${contract_id}`,
    method: "GET",

    success: function (profil) {
        lefcol =
            `
                <div id="leftcol" class="d-flex flex-row bd-highlight p-t-8">
                                        <label for="answer" style="width:250px;">Contract Start Date</label>
                                        <input value="${profil.contract_start_date}" name="dateofbirth" style="margin-bottom: 10px;" type="text" class="form-control" id="dateofbirth"
                                            readonly>
                                    </div>
                                    <div class="d-flex flex-row bd-highlight p-t-8">
                                        <label for="answer" style="width:250px;">Requester Position</label>
                                        <input style="margin-bottom: 10px;" type="text" class="form-control" id="position" readonly>
                                    </div>
                                    <div class="d-flex flex-row bd-highlight">
                                        <label for="answer" style="width:250px;">Requester Name</label>
                                        <input style="margin-bottom: 10px;" type="text" class="form-control" id="fullname" readonly>
                                    </div>
                                    
                                    <div class="d-flex flex-row bd-highlight p-t-8">
                                        <label for="answer" style="width:250px;">PO Number</label>
                                        <input value="${profil.po_id}" style="margin-bottom: 10px;" type="text" class="form-control" id="po_id" readonly>
                                    </div>
                                    <div class="d-flex flex-row bd-highlight p-t-8">
                                        <label for="answer" style="width:250px;">Currency</label>
                                        <input style="margin-bottom: 10px;" type="text" class="form-control" id="po_id" value="IDR " readonly>
                                    </div>
                                    <div class="d-flex flex-row bd-highlight p-t-8">
                                        <label for="answer" style="width:250px;">Plant</label>
                                        <input style="margin-bottom: 10px;" type="text" class="form-control" value="Block B Jabar" readonly>
                                    </div>
            `
        $('#leftcol').append(lefcol)

        rigcol =
            `
                <div class="d-flex flex-row bd-highlight p-t-8">
                                        <label for="answer" style="width:250px;">C Complition Date</label>
                                        <input value="${profil.contract_end_date}" style="margin-bottom: 10px;" type="text" class="form-control" id="po_id" readonly>
                                    </div>
                                    <div class="d-flex flex-row bd-highlight">
                                        <label for="answer" style="width:250px;">Payroll Number</label>
                                        <input style="margin-bottom: 10px;" type="text" class="form-control" value="20080055" readonly>
                                    </div>
                                    <div class="d-flex flex-row bd-highlight p-t-8">
                                        <label for="answer" style="width:250px;">Process ID</label>
                                        <input style="margin-bottom: 10px;" type="text" class="form-control" value="N/A" readonly>
                                    </div>
                                    <div class="d-flex flex-row bd-highlight p-t-8">
                                        <label for="answer" style="width:250px;">Contract Number</label>
                                        <input value="${profil.contract_id}" style="margin-bottom: 10px;" type="text" class="form-control" id="po_id" readonly>
                                    </div>
                                    <div class="d-flex flex-row bd-highlight p-t-8">
                                        <label for="answer" style="width:250px;">Vendor Name</label>
                                        <input value="${profil.vendor_name}" style="margin-bottom: 10px;" type="text" class="form-control" id="po_id" readonly>
                                    </div>
                                </div>
            `
        $('#rightcol').append(rigcol)
    },
    error: function (error) {
        //error handling

    },
    complete: function () {

    }
})
// GET CONTRACT INFO
$.ajax({
    url: getProfile,
    method: "GET",


    success: function (profil) {
        $('#position').val(profil.position)
        $('#fullname').val(profil.fullname)


    },
    error: function (error) {
        //error handling

    },
    complete: function () {

    }
}) 




// VIEW PURCHASE ORDER ======================================
$.ajax({
    url: `http://127.0.0.1:5000/getPurchaeOrderByContractId/${contract_id}`,
    method: "GET",
    
    success: function (profil) {
        $('#po_id').val(profil.po_id)
        $('#po_start_date').val(profil.po_start_date)
        $('#po_end_date').val(profil.po_complete_date)
        $('#medco_representative').val(profil.medco_representative)
        $('#medco_to_provide').val(profil.medco_to_provide)
        $('#location').val(profil.location)
        $('#note').val(profil.note)
        $('#po_complete_date').val(profil.note)
        $('#budget_source').val(profil.budget_source)
        $('#material').val(profil.material)
        $('#description').val(profil.description)
        $('#quantity').val(profil.quantity)
        $('#price_each').val(profil.price_each)
        $('#note1').val(profil.note1)

        
        var totalprice = profil.quantity * profil.price_each
        $('#totalPrice').val(totalprice)
        var po_id = profil.po_id
        console.log(po_id)
        commentList(po_id)
    },
    error: function (error) {
        //error handling

    },
    complete: function () {

    }
})
// VIEW PURCHASE ORDER ======================================


// ADD COMMENT ==============================================
function addComment() {
    // var quiz_id = document.getElementById("quiz").value;
    var comment_id = 1
    var comment_detail = $('#comment_detail').val()

    console.log(po_id);
    console.log(comment_detail);

    $.ajax({
        url: `http://127.0.0.1:5000/addComment`,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            comment_id: comment_id,
            comment_detail: comment_detail,
        }),
        success: function (comment) {
            comments =
            `
                <div class="row" style="margin-bottom:20px;" >
                <div class="col-2" style="text-align: center;">
                    <img src="img/pp.png" alt="" style="border-radius:50%; width: 100px;">
                    <div class="prof" id="profileInfo">
                    </div>
                </div>
                <div class="col-sm d-flex align-items-end flex-column">
                    <textarea style="margin-bottom: 5px; height:100px;" class="form-control"
                        value="${comment.comment_detail}"></textarea>
                </div>
                </div>
            `
            $('#comment_list').append(comments)
        },
        error: function () {
            alert("cek semua inputanya");
        },
        complete: function () {
            console.log("mantul");
        }
    });
} 
// ADD COMMENT ==============================================
// GET COMMENT BY COMMENT ID ==============================================
// GET PROFILE
function commentList(po_id){
    console.log(po_id)
    $.ajax({
        url: `http://127.0.0.1:5000/getCommentByCommentId/${po_id}`,
        method: "GET",
        success: function (comment) {
            for (var i = 0; i < comment.length; i++) {
                var list_comment =
                    `
                     <div class="row" style="margin-bottom:20px;" >
                    <div class="col-2" style="text-align: center;">
                        <img src="img/pp.png" alt="" style="border-radius:50%; width: 100px;">
                        <div class="prof" id="profileInfo">
                        </div>
                    </div>
                    <div class="col-sm d-flex align-items-end flex-column">
                        <textarea style="margin-bottom: 5px; height:100px;" class="form-control"
                            value="">${comment[i]['comment_detail']}</textarea>
                    </div>
                    </div>   
                    `
                $('#comment_list').append(list_comment)
            }
    
        },
        error: function () {
    
        },
        complete: function () {
    
        }
    
    }) 
}
// // ADD COMMENT BY COMMENT ID ==============================================



