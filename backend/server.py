from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

""""

Schema: 

CREATE TABLE PRODUCTS(
product_id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
description TEXT,
price NUMERIC(10, 2) NOT NULL,
image_url VARCHAR(255)
)

"""



"""
ITEM WILL HAVE THIS STRUCT:

{
"id": string,
"name": string,
"description": string,
"picture": string,
"price": float,
}

"""



items = [{"id": 1, "name": "Sticker 1", "description": "hello testing 1", "picture": "picture here 1"},
         {"id": 2, "name": "Sticker 2", "description": "hello testing 2", "picture": "picture here 2"},
         {"id": 3, "name": "Sticker 3", "description": "hello testing 3", "picture": "picture here 3"}]


#api route for items (temporary)

@app.route("/items")
def items():
    items = [{"id": 1, "name": "Sticker 1", "description": "hello testing 1", "picture": "picture here 1"},
         {"id": 2, "name": "Sticker 2", "description": "hello testing 2", "picture": "picture here 2"},
         {"id": 3, "name": "Sticker 3", "description": "hello testing 3", "picture": "picture here 3"}]
    return jsonify(items)


@app.route("/finditem/<int:item_id>")
def find_item(item_id):  # Include item_id as a parameter

    items = [{"id": 1, "name": "Sticker 1", "description": "hello testing 1", "picture": "picture here 1"},
         {"id": 2, "name": "Sticker 2", "description": "hello testing 2", "picture": "picture here 2"},
         {"id": 3, "name": "Sticker 3", "description": "hello testing 3", "picture": "picture here 3"}]
    item = items[item_id]
    if item:
        return jsonify(item)
    else:
        return jsonify({"error": "Item not found"}), 404





@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    print(data)
    return jsonify({"message": "Data received"}), 200







if __name__ == "__main__":
    app.run(debug=True, port=4000)


