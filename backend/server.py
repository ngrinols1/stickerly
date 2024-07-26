from flask import Flask, jsonify
app = Flask(__name__)


#temporary item array




#api route for items (temporary)

@app.route("/items")
def items():
    items = [{"id": 1, "name": "Sticker 1", "description": "hello testing 1", "picture": "picture here 1"},
         {"id": 2, "name": "Sticker 2", "description": "hello testing 2", "picture": "picture here 2"},
         {"id": 3, "name": "Sticker 3", "description": "hello testing 3", "picture": "picture here 3"}]
    return jsonify(items)

if __name__ == "__main__":
    app.run(debug=True, port=4000)


