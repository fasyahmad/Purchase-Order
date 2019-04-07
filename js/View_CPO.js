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

//Contract Purchase Order ========================================
var url_string = window.location.href
var url = new URL(url_string);
var contract_id = Number(url.searchParams.get("contract_id"));
console.log(contract_id)

// GET CONTRACT INFO
$.ajax({
    url: `http://127.0.0.1:5000/getContractByContractId/${contract_id}`,
    method: "GET",
    async:true,

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
                                        <input style="margin-bottom: 10px;" type="text" class="form-control" id="po_id" readonly>
                                    </div>
                                    <div class="d-flex flex-row bd-highlight p-t-8">
                                        <label for="answer" style="width:250px;">Currency</label>
                                        <input style="margin-bottom: 10px;" type="text" class="form-control" value="IDR " readonly>
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
var getProfile = "http://127.0.0.1:5000/getEmployeeBy/" + getCookie("employee_id")
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

// ============================================


// VIEW PURCHASE ORDER ======================================
$.ajax({
    url: `http://127.0.0.1:5000/getPurchaeOrderByContractId/${contract_id}`,
    method: "GET",
    async: true,

    success: function (profil) {

        $('#po_id').val(profil.po_id)
        $('#record_id').val(profil.record_id)
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
        console.log(profil.quantity)
        console.log(profil.price_each)
        console.log(totalprice)
        $('#totalPrice').val(totalprice)
    },
    error: function (error) {
        //error handling

    },
    complete: function () {

    }
})
var contract_id_test
// VIEW PURCHASE ORDER ======================================
// ============================================
function submitRecord() {
    var url_string = window.location.href
    var url = new URL(url_string);
    var contract_id = Number(url.searchParams.get("contract_id"));
    addPoSubmit(contract_id)
}
// ============================================
// ADD PURCHASE ORDER ============================================================
function addPoSubmit(contract_id) {
    // var quiz_id = document.getElementById("quiz").value;
    var po_start_date = $('input#po_start_date').val()
    var po_complete_date = $('input#po_complete_date').val()
    var medco_representative = $('input#medco_representative').val()
    var medco_to_provide = $('input#medco_to_provide').val()
    var location = $('input#location').val()
    var note = $('#note').val()
    var budget_source = $('input#budget_source').val()
    var material = $('input#material').val()
    var description = $('#description').val()
    var quantity = $('input#quantity').val()
    var price_each = $('input#price_each').val()
    var note1 = $('#note1').val()
    var po_id = $('#po_id').val()

    console.log(contract_id);
    console.log(po_start_date);
    console.log(po_complete_date);
    console.log(medco_representative);
    console.log(medco_to_provide);
    console.log(location);
    console.log(note);
    console.log(budget_source);
    console.log(material);
    console.log(description);
    console.log(quantity);
    console.log(price_each);
    console.log(note1);

    $.ajax({
        url: `http://127.0.0.1:5000/addPurchaseOrderSubmit/${contract_id}`,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            contract_id: contract_id,
            po_start_date: po_start_date,
            po_complete_date: po_complete_date,
            medco_representative: medco_representative,
            medco_to_provide: medco_to_provide,
            location: location,
            note: note,
            budget_source: budget_source,
            material: material,
            description: description,
            quantity: quantity,
            price_each: price_each,
            note1: note1,
            data_pegawai_requester: {
                employee_id: 1,
                pegawaiscmr: 4,
            },
            record_id: "",
            process_id: "",
            po_id: po_id,
            comment : "HAHA"
        }),
        success: function () {
            alert("anda berhasil menambahkan Purchase Order");
            window.location.href = 'contract_list.html'
        },
        error: function () {
            alert("cek semua inputanya");
        },
        complete: function () {
            console.log("mantul");
        }
    });
}

// ADD PURCHASE ORDER ======================================