from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

def temp_converter(temp_name, temp_value):
    if temp_name.upper() == "F":
        celsius = round((temp_value - 32) * (5/9))
        temp_output = celsius
        unit = "Celsius"
    elif temp_name.upper() == "C":
        fahrenheit = round((temp_value * 9/5) + 32)
        temp_output = fahrenheit
        unit = "Fahrenheit"
    else:
        return f"Invalid temperature scale"

    if temp_name.upper() == "C":
        if temp_value < 10:
            description = "Cold ❄️"
        elif temp_value < 29:
            description = "Warm ☀️"
        else:
            description = "Hot 🔥"
    elif temp_name.upper() == "F": 
        if temp_value < 50:
            description = "Cold ❄️"
        elif temp_value < 85:
            description = "Warm ☀️"
        else:
            description = "Hot 🔥"
    
    message = f"The temperature is {temp_output} degrees {unit}.<br><i>{description}</i>"
    return message

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/convert', methods=['POST'])

def convert():
    data = request.get_json()
    print(data)
    temp_name = data['temp_name']
    temp_value = data['temp_value']
    result = temp_converter(temp_name, temp_value)
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)