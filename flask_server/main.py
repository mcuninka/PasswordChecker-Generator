from flask import Flask, request
import password

app = Flask(__name__)
pwd = password.Password()

@app.route('/passwordCheck', methods=['POST'])
def checkPassword():
    return pwd.checkPassword(request.json['password'])

@app.route('/generatePassword', methods=['POST'])
def generatePassword():
    passwordLength = int(request.json['passwordLength'])
    return pwd.generatePassword(passwordLength)

@app.route('/generateWeakPasswords', methods=['POST'])
def generateRandomWeakPasswords():
    numberOfPasswords = int(request.json['numberOfPasswords'])
    passwordLength = int(request.json['passwordLength'])
    return pwd.generateRandomWeakPasswords(numberOfPasswords, passwordLength)

@app.route('/checkPasswords', methods=['POST'])
def checkPasswords():
    file = request.files['file']
    return pwd.checkPasswords(file)

if __name__ == '__main__':
    pwd.getCommonPasswords()
    app.run(debug=True)
