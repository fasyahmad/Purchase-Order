import datetime
from flask_sqlalchemy import SQLAlchemy
from app import db
# EMPLOYEE ==================================================


class Employee(db.Model):
    __tablename__ = 'employee'

    employee_id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String())
    email = db.Column(db.String())
    fullname = db.Column(db.String())
    position = db.Column(db.String())
    token = db.Column(db.String())
    contract_status = db.relationship('Contract', cascade='all,delete', backref='employee', lazy=True)

    def __init__(self, password, email, fullname, position, token):
        self.password = password
        self. email = email
        self. fullname = fullname
        self. position = position
        self. token = token


    def __repr__(self):
        return '<employee id {}>'.format(self.employee_id)

    def serialize(self):
        return{
            'employee_id': self.employee_id,
            'fullname': self.fullname,
            'password': self.password,
            'email': self.email,
            'position': self.position,
            'token': self.token,
            'contract_status': [{'id_': item.id_, 'vendor_name': item.vendor_name, 'contract_start_date': item.contract_start_date, 'contract_end_date': item.contract_end_date} for item in self.contract_status]
       }
# EMPLOYEE =========================================================
# CONTRACT =========================================================
class Contract(db.Model):
    __tablename__ = 'contract'

    contract_id = db.Column(db.Integer, primary_key=True)
    id_ = db.Column(db.Integer, db.ForeignKey('employee.employee_id'), nullable=False)
    vendor_name = db.Column(db.String())
    contract_start_date = db.Column(db.DateTime)
    contract_end_date = db.Column(db.DateTime)

    def __init__(self, id_, vendor_name, contract_start_date, contract_end_date):
        self.id_ = id_
        self.vendor_name = vendor_name
        self. contract_start_date = contract_start_date
        self. contract_end_date = contract_end_date

    def __repr__(self):
        return '<contract id {}>'.format(self.contract_id)

    def serialize(self):
        return{
            'contract_id': self.contract_id,
            'id_': self.id_,
            'vendor_name': self.vendor_name,
            'contract_start_date': self.contract_start_date,
            'contract_end_date': self.contract_end_date,
        }
# CONTRACT =========================================================
# ITEM =========================================================
class PurchaseOrder(db.Model):
    __tablename__ = 'purchase_order'

    po_id = db.Column(db.Integer, primary_key=True)
    contract_id = db.Column(db.Integer)
    po_start_date = db.Column(db.DateTime)
    po_complete_date = db.Column(db.DateTime)
    medco_representative = db.Column(db.String())
    medco_to_provide = db.Column(db.String())
    location = db.Column(db.String())
    note = db.Column(db.String())
    budget_source = db.Column(db.String())
    
    material = db.Column(db.String())
    description = db.Column(db.String())
    quantity = db.Column(db.Integer)
    price_each = db.Column(db.Integer)
    note1 = db.Column(db.String())
    record_id = db.Column(db.String())
    process_id = db.Column(db.String())
    # item_list = db.relationship('Contract', cascade='all,delete', backref='purchase_order', lazy=True)
    
    def __init__(self, contract_id, po_start_date, po_complete_date, medco_representative, medco_to_provide, location, note, budget_source, material, description, quantity, price_each, note1, record_id, process_id):
        
        self.contract_id = contract_id
        self.po_start_date = po_start_date
        self.po_complete_date = po_complete_date
        self.medco_representative = medco_representative
        self.medco_to_provide = medco_to_provide
        self.location = location
        self.note = note
        self.budget_source = budget_source
    

        self.material = material
        self.description = description
        self.quantity = quantity
        self.price_each = price_each
        self.note1 = note1
        self.record_id = record_id
        self.process_id = process_id

    def __repr__(self):
        return '<po id {}>'.format(self.po_id)

    def serialize(self):
        return{
            'po_id': self.po_id,
            'contract_id': self.contract_id,
            'po_start_date': self.po_start_date,
            'po_complete_date': self.po_complete_date,
            'medco_representative': self.medco_representative,
            'medco_to_provide': self.medco_to_provide,
            'location': self.location,
            'note': self.note,
            'budget_source': self.budget_source,

            'material': self.material,
            'description': self.description,
            'quantity': self.quantity,
            'price_each': self.price_each,
            'note1': self.note1,
            'record_id': self.record_id,
            'process_id': self.process_id


        }
# ITEM =========================================================
# COMMENT ==============
class Comment(db.Model):
    __tablename__ = 'comment'
    id_ = db.Column(db.Integer, primary_key=True)
    comment_id = db.Column(db.Integer)
    comment_detail = db.Column(db.String())

    def __init__(self, comment_id, comment_detail):
        self.comment_id = comment_id
        self.comment_detail = comment_detail

    def __repr__(self):
        return '<comment detail {}>'.format(self.comment_detail)

    def serialize(self):
        return{
            'id': self.id_,
            'comment_id': self.comment_id,
            'comment_detail': self.comment_detail
        }
# COMMENT ==============
