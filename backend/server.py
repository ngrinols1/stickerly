from flask import Flask, request, redirect, jsonify
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv
import stripe


#gunicorn -D -w 4 -b 0.0.0.0:4000 server:app


load_dotenv()
db = SQLAlchemy()
app = Flask(__name__)
url = os.getenv("DB_URI")
stripeKey = os.getenv("STRIPE_PRIVATE")
app.config['SQLALCHEMY_DATABASE_URI'] = url
stripe.api_key = stripeKey
db.init_app(app)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

class Products(db.Model):
    __tablename__ = 'products'  # Name of the existing table

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    description = db.Column(db.String(255))
    picture = db.Column(db.String(255))
    price = db.Column(db.Integer)
    stripeid = db.Column(db.String(255))
    priceid = db.Column(db.String(255))
    def to_dict(self): 
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'picture' : self.picture,
            'price': self.price,
            'stripeid': self.stripeid,
            'priceid': self.priceid
        }



#route to get all items inside the store 
@app.route("/items")
def items():
    products = Products.query.all()
    return jsonify([product.to_dict() for product in products])


#route to get information on one specific item
@app.route("/finditem/<int:item_id>")
def find_item(item_id):  # Include item_id as a parameter
    product = Products.query.get(item_id)
    if product:
        return jsonify(product.to_dict())
    else:
        return jsonify({"error": "Item not found"}), 404



@app.route('/testing')
def testing():
    products = Products.query.all()
    return jsonify([product.to_dict() for product in products])





@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    print(data)
    return jsonify({"message": "Data received"}), 200


@app.route('/sendorder', methods=['POST'])
@cross_origin(origin='*')
def sendorder():
    data = request.json
    try:
        lineitems = createLineItem(data)

        checkout_session = stripe.checkout.Session.create(
            line_items= lineitems,
            mode='payment',
            success_url= "http://localhost:3000/success",
            cancel_url="http://localhost:3000/unsuccess"
        )


    except Exception as e:
        return str(e)

    return checkout_session.url

        
    



    
    
    
    return jsonify({"message": "Data received"}), 200


def createLineItem(cart):
    res = []
    for key, quantity in cart.items():
        #key will be string, and value will be integer
        product = Products.query.get(int(key))
        if product:
            res.append({
                'price' : product.priceid,
                'quantity' : quantity
            })
        else:
            raise Exception("Something went wrong")
    return res




def calculatePrice(cart):
    res = 0
    for key, quantity in cart.items():
        #key will be string, and value will be integer
        product = Products.query.get(int(key))
        if product:
            price = product.price
            res += (price * quantity)
        else:
            raise Exception("Something went wrong calculating the price")
    return res * 1000
            
            
    


if __name__ == "__main__":
    app.run(debug=True, port=4000)


