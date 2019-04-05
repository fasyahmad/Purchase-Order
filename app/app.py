from flask import Flask, jsonify, request, json, make_response
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
from models import Contract, Employee, PurchaseOrder, Comment
from random import randint
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy



app = Flask(__name__)
CORS(app)

POSTGRES = {
    'user': 'postgres',
    'pw': 'fasyaemad03',
    'db': 'newpo',
    'host': 'localhost',
    'port': '5432'
}

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# postgresql://username:password@localhost:5432/database
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:%(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES

db.init_app(app)

# ADD EMPLOYEE ============
@app.route('/addEmployee', methods=["POST"])
def add_employee():

    body = request.json

    password = body['password']
    email = body['email']
    fullname = body['fullname']
    position = body['position']

    try:
        employee = Employee(
            password=password,
            email=email,
            fullname=fullname,
            position=position
        )

        db.session.add(employee)
        db.session.commit()
        return "add employee. employee id={}".format(employee.employee_id), 200

    except Exception as e:
        return(str(e)), 400
# ADD EMPLOYEE ============
# GET ALL EMPLOYEE ===========
@app.route('/getAllEmployee', methods=["GET"])
def get_all_employee():
        try:
                employee = Employee.query.order_by(Employee.employee_id).all()
                return jsonify([usr.serialize()
                                for usr in employee])
        except Exception as e:
                return (str(e))
# GET ALL EMPLOYEE ===========
# GET EMPLOYEE BY ==============
@app.route('/getEmployeeBy/<employeeId_>', methods=["GET"])
def get_employee_by(employeeId_):
        try:
                employe = Employee.query.filter_by(employee_id=employeeId_).first()
                return jsonify(employe.serialize())
        except Exception as e:
                return (str(e))
# GET EMPLOYEE BY ==============
# LOG IN ============
@app.route('/login', methods=['POST'])
def login():
    response = {}
    body = request.json
    email = body['email']
    password = body['password']
    position = body['position']
    isLogin = False

    try:
        employers = get_all_employee().json
        for employee in employers:
            if email == employee['email']:
                if password == employee['password']:
                        if position == employee['position']:
                                isLogin = True
                                employee_id = employee['employee_id']

    except Exception as e:
        response['Error'] = str(e)
        # return str(e)

    if isLogin:
        response['email'] = '{}'.format(email)
        response['position'] = '{}'.format(position)
        response['employee_id'] = '{}'.format(employee_id)


        code = 200
    else:
        response['message'] = 'Login failed, username or password is wrong'
        code = 400
    return jsonify(response), code
# LOG IN ============
# ADD CONTRACT ============
@app.route('/addContract', methods=["POST"])
def add_contract():

    body = request.json
    id_ = body['id_']
    vendor_name = body['vendor_name']
    contract_start_date = body['contract_start_date']
    contract_end_date = body['contract_end_date']

    try:
        contract = Contract(
            vendor_name=vendor_name,
            id_=id_,
            contract_start_date=contract_start_date,
            contract_end_date=contract_end_date,
        )

        db.session.add(contract)
        db.session.commit()
        return "add contract. contract id={}".format(Contract.contract_id), 200

    except Exception as e:
        return(str(e)), 400
# ADD CONTRACT ============
# GET ALL CONTRACT ===========
@app.route('/getAllContract', methods=["GET"])
def get_all_contract():
        try:
                contract = Contract.query.order_by(Contract.contract_id).all()
                return jsonify([usr.serialize()for usr in contract])
        except Exception as e:
                return (str(e))
# GET ALL CONTRACT ===========


# GET CONTRACT BY CONTRACT ID ==============
@app.route('/getContractByContractId/<contractId_>', methods=["GET"])
def get_contract_by_contract_id(contractId_):
        try:
                contract = Contract.query.filter_by(contract_id=contractId_).first()
                return jsonify(contract.serialize())
        except Exception as e:
                return (str(e))
# GET CONTRACT BY CONTRACT ID ==============

# GET USER BY ==============
@app.route('/getContractBy/<Id_>', methods=["GET"])
def get_contract_by(Id_):
        try:
                contract = Contract.query.filter_by(id_=Id_).all()
                return jsonify([usr.serialize()for usr in contract])
        except Exception as e:
                return (str(e))
# GET USER BY ==============

# UPDATE CONTRACT ==========
@app.route('/updateContract/<contractId_>', methods=["PUT"])
def update_contract(contractId_):

        body = request.json
        contract_existing = get_contract_by(contractId_).json

        if 'vendor_name' not in body:
                vendor_name = contract_existing['vendor_name']
        else:
                vendor_name = body['vendor_name']
        if 'contract_start_date' not in body:
                contract_start_date = contract_existing['contract_start_date']
        else:
                contract_start_date = body['contract_start_date']
        if 'contract_end_date' not in body:
                contract_end_date = contract_existing['contract_end_date']
        else:
                contract_end_date = body['contract_end_date']

        try:
                contractUpdate = {
                    'vendor_name': vendor_name,
                    'contract_start_date': contract_start_date,
                    'contract_end_date': contract_end_date,

                }
                contract = Contract.query.filter_by(
                    contract_id=contractId_).update(contractUpdate)
                db.session.commit()
                return 'update contract'
        except Exception as e:
                return(str(e))
# UPDATE CONTRACT ==========
# ADD PURCHASE ORDER ==================
@app.route('/addPurchaseOrder/<contract_id>', methods=["POST"])
def addPurchaseOrder(contract_id):
    
    body = request.json
    po_start_date = body['po_start_date']
    po_complete_date = body['po_complete_date']
    medco_representative = body['medco_representative']
    medco_to_provide = body['medco_to_provide']
    location = body['location']
    note = body['note']
    budget_source = body['budget_source']

    material = body['material']
    description = body['description']
    quantity = body['quantity']
    price_each = body['price_each']
    note1 = body['note1']

    try:
        purchase_order = PurchaseOrder(
            contract_id=contract_id,
            po_start_date=po_start_date,
            po_complete_date=po_complete_date,
            medco_representative=medco_representative,
            medco_to_provide=medco_to_provide,
            location=location,
            note=note,
            budget_source=budget_source,

            material=material,
            description=description,
            quantity=quantity,
            price_each=price_each,
            note1=note1
        )

        db.session.add(purchase_order)
        db.session.commit()
        return "add purchase order. purchase order id={}".format(purchase_order.po_id), 200

    except Exception as e:
        return(str(e)), 400
# ADD PURCHASE ORDER ==================
# GET PURCHASE ORDER ===========
@app.route('/getAllPurchaseOrder', methods=["GET"])
def get_all_purchase_order():
        try:
                purchase_order = PurchaseOrder.query.order_by(PurchaseOrder.po_id).all()
                return jsonify([usr.serialize()
                for usr in purchase_order])
        except Exception as e:
                return (str(e))
# GET ALL PURCHASE ORDER ===========
# DELETE PURCHASE ORDER BY PO_ID ====
@app.route('/deletePurchaseOrder/<poId_>', methods=["DELETE"])
def delete_purchase_order_by_po_id(poId_):
    try:
        purchaseorder =  PurchaseOrder.query.filter_by(po_id=poId_).first()
        db.session.delete(purchaseorder)
        db.session.commit()
        return 'purchase order deleted'
    except Exception as e:
        return(str(e))
# DELETE PURCHASE ORDER BY PI_ID ====
# GET PURCHASE ORDER BY ==============
@app.route('/getPurchaeOrderBy/<purchaeOrderId_>', methods=["GET"])
def get_purchae_order_by(purchaeOrderId_):
        try:
                purchase_order = PurchaseOrder.query.filter_by(
                    po_id=purchaeOrderId_).first()
                return jsonify(purchase_order.serialize())
        except Exception as e:
                return (str(e))
# GET PURCHASE ORDER BY ==============
# GET PURCHASE ORDER BY CONTRACT ID ==============
@app.route('/getPurchaeOrderByContractId/<contractId_>', methods=["GET"])
def get_purchae_order_by_contract_id(contractId_):
        try:
                purchase_order = PurchaseOrder.query.filter_by(
                    contract_id=contractId_).first()
                return jsonify(purchase_order.serialize())
        except Exception as e:
                return (str(e))
# GET PURCHASE ORDER BY CONTRACT ID ==============
# UPDATE PURCHASE ORDER ==========
@app.route('/updatePurchaseOrder/<purchaseOrderId_>', methods=["PUT"])
def update_purchase_order(purchaseOrderId_):

        body = request.json
        purchae_order_existing = get_purchae_order_by(purchaseOrderId_).json

        if 'contract_id' not in body:
                contract_id = purchae_order_existing['contract_id']
        else:
                contract_id = body['contract_id']
        if 'po_start_date' not in body:
                po_start_date = purchae_order_existing['po_start_date']
        else:
                po_start_date = body['po_start_date']
        if 'po_complete_date' not in body:
                po_complete_date = purchae_order_existing['po_complete_date']
        else:
                po_complete_date = body['po_complete_date']
        if 'medco_representative' not in body:
                medco_representative = purchae_order_existing['medco_representative']
        else:
                medco_representative = body['medco_representative']
        if 'medco_to_provide' not in body:
                medco_to_provide = purchae_order_existing['medco_to_provide']
        else:
                medco_to_provide = body['medco_to_provide']
        if 'location' not in body:
                location = purchae_order_existing['location']
        else:
                location = body['location']
        if 'note' not in body:
                note = purchae_order_existing['note']
        else:
                note = body['note']
        if 'budget_source' not in body:
                budget_source = purchae_order_existing['budget_source']
        else:
                budget_source = body['budget_source']
        if 'material' not in body:
                material = purchae_order_existing['material']
        else:
                material = body['material']
        if 'description' not in body:
                description = purchae_order_existing['description']
        else:
                description = body['description']
        if 'quantity' not in body:
                quantity = purchae_order_existing['quantity']
        else:
                quantity = body['quantity']
        if 'price_each' not in body:
                price_each = purchae_order_existing['price_each']
        else:
                price_each = body['price_each']
        if 'note1' not in body:
                note1 = purchae_order_existing['note1']
        else:
                note1 = body['note1']
        
        try:
                PurchaseOrderUpdate = {
                    'contract_id': contract_id,
                    'medco_representative': medco_representative,
                    'medco_to_provide': medco_to_provide,
                    'location': location,
                    'budget_source': budget_source,
                    'po_start_date': po_start_date,
                    'po_complete_date': po_complete_date,
                }

                purchase_order = PurchaseOrder.query.filter_by(
                    po_id=purchaseOrderId_).update(PurchaseOrderUpdate)
                db.session.commit()
                return 'PO Updated'
        except Exception as e:
                return(str(e))
# UPDATE PURCHASE ORDER ==========
# ADD COMMENT =============
@app.route('/addComment', methods=["POST"])
def add_comment():

    body = request.json

    comment_id = body['comment_id']
    comment_detail = body['comment_detail']

    try:
        comment = Comment(
            comment_id=comment_id,
            comment_detail=comment_detail
        )

        db.session.add(comment)
        db.session.commit()
        return "add comment. comment id={}".format(comment.id_), 200

    except Exception as e:
        return(str(e)), 400
# ADD COMMENT =============
# GET ALL COMMENT =============
@app.route('/getAllComment', methods=["GET"])
def get_all_comment():
        try:
                comment = Comment.query.order_by(Comment.id_).all()
                return jsonify([com.serialize()
                                for com in comment])
        except Exception as e:
                return (str(e))
# GET ALL COMMENT =============
# DELETE COMMENT =============
@app.route('/deleteComment/<_Id>', methods=["DELETE"])
def delete_comment(_Id):
        try:
                comment = Comment.query.filter_by(id_=_Id).first()
                db.session.delete(comment)
                db.session.commit()
                return 'comment deleted'
        except Exception as e:
                return (str(e))
# DELETE COMMENT =============
