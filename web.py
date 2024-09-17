from flask import Flask, render_template, jsonify
import sensor

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/graph')
def temperature():
    return render_template("graph.html")

@app.route('/sensor_data')
def get_sensor_data():
    data = sensor.data_dict
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=False)