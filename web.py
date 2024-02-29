from flask import Flask, render_template, redirect, url_for
import sensor

app = Flask(__name__)


@app.route('/')

def index():
    sensor_data = sensor.sensor_data()
    return render_template(
        "index.html",
        exception=sensor_data['exception'],
        location=sensor_data['location'],
        
        )

if __name__ == "__main__":
    app.run(debug=False)
