from flask import Flask, render_template, jsonify
import sensor

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/graph/<index>')
def graph(index):
    return render_template("graph.html", index=index)

@app.route('/sensor_data')
def get_sensor_data():
    data = sensor.data_dict
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=False)