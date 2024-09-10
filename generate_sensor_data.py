import csv
import random
import time
from datetime import datetime

# Define the path to your CSV file
csv_file = './static/data.csv'

# Initial values for Brownian motion (random walk)
initial_temperature = 25.0
initial_pressure = 1000.0
initial_humidity = 60.0
initial_pm1 = 2.0
initial_pm2 = 3.0
initial_pm10 = 4.0
initial_gas = 300.0
initial_tvoc = 50.0
initial_eco2 = 1000

# Function to generate Brownian noise (random walk)
def generate_brownian_value(previous_value, step_size=0.1, lower_bound=None, upper_bound=None):
    change = random.uniform(-step_size, step_size)
    new_value = previous_value + change
    if lower_bound is not None:
        new_value = max(lower_bound, new_value)
    if upper_bound is not None:
        new_value = min(upper_bound, new_value)
    return round(new_value, 2)

# Function to generate random sensor data with Brownian motion
def generate_random_data(prev_values):
    exception = ""  # No exception, can modify based on logic
    location = "NO LOCATION"
    
    # Generate the current date and time
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    # Generate random sensor data using Brownian motion
    temperature = generate_brownian_value(prev_values['temperature'], step_size=0.5, lower_bound=20.0, upper_bound=40.0)
    pressure = generate_brownian_value(prev_values['pressure'], step_size=0.5, lower_bound=980.0, upper_bound=1050.0)
    humidity = generate_brownian_value(prev_values['humidity'], step_size=1.0, lower_bound=30.0, upper_bound=90.0)
    pm1 = generate_brownian_value(prev_values['pm1'], step_size=0.5, lower_bound=0, upper_bound=10)
    pm2 = generate_brownian_value(prev_values['pm2'], step_size=0.5, lower_bound=0, upper_bound=10)
    pm10 = generate_brownian_value(prev_values['pm10'], step_size=0.5, lower_bound=0, upper_bound=10)
    gas = generate_brownian_value(prev_values['gas'], step_size=2.0, lower_bound=200.0, upper_bound=400.0)
    tvoc = generate_brownian_value(prev_values['tvoc'], step_size=5.0, lower_bound=0, upper_bound=100)
    eco2 = generate_brownian_value(prev_values['eco2'], step_size=50.0, lower_bound=400, upper_bound=2000)

    return {
        'exception': exception,
        'location': location,
        'current_time': current_time,
        'temperature': f"{temperature}°C",
        'pressure': f"{pressure}hPa",
        'humidity': f"{humidity}%",
        'pm1': pm1,
        'pm2': pm2,
        'pm10': pm10,
        'gas': f"{gas}kOhms",
        'tvoc': tvoc,
        'eco2': eco2
    }

# Function to append data to CSV
def append_to_csv(data):
    with open(csv_file, mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([
            data['exception'], data['location'], data['current_time'], data['temperature'], data['pressure'],
            data['humidity'], data['pm1'], data['pm2'], data['pm10'], data['gas'], data['tvoc'], data['eco2']
        ])

# Function to start appending data every second with Brownian noise
def generate_and_append_data():
    # Initial values for Brownian motion
    prev_values = {
        'temperature': initial_temperature,
        'pressure': initial_pressure,
        'humidity': initial_humidity,
        'pm1': initial_pm1,
        'pm2': initial_pm2,
        'pm10': initial_pm10,
        'gas': initial_gas,
        'tvoc': initial_tvoc,
        'eco2': initial_eco2
    }

    while True:
        # Generate new random data
        new_data = generate_random_data(prev_values)
        
        # Update previous values for next iteration
        prev_values['temperature'] = float(new_data['temperature'].replace('°C', ''))
        prev_values['pressure'] = float(new_data['pressure'].replace('hPa', ''))
        prev_values['humidity'] = float(new_data['humidity'].replace('%', ''))
        prev_values['pm1'] = new_data['pm1']
        prev_values['pm2'] = new_data['pm2']
        prev_values['pm10'] = new_data['pm10']
        prev_values['gas'] = float(new_data['gas'].replace('kOhms', ''))
        prev_values['tvoc'] = new_data['tvoc']
        prev_values['eco2'] = new_data['eco2']
        
        # Append the new data to the CSV file
        append_to_csv(new_data)
        
        # Wait for 1 second before generating the next data point
        time.sleep(1)

# Start the data generation and appending process
generate_and_append_data()