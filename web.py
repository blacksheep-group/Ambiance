from flask import Flask, render_template, jsonify
import sensor

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/sensor_data')
def get_sensor_data():
    sensor_data = sensor.sensor_data()
    return jsonify(sensor_data)

if __name__ == "__main__":
    app.run(debug=False)
