from flask import Flask, request
import werkzeug
import password

app = Flask(__name__)
pwd = password.Password()

@app.route('/passwordCheck', methods=['POST'])
def checkPassword():
    return pwd.checkPassword(request.json['password'])

@app.route('/generatePassword', methods=['POST'])
def generatePassword():
    try:
        passwordLength = int(request.json['passwordLength'])
        return pwd.generatePassword(passwordLength)
    except ValueError:
        return {'error': 'Input must be a number.'}
    except Exception:
        return {'error': 'Something went wrong.'}

@app.route('/generateWeakPasswords', methods=['POST'])
def generateRandomWeakPasswords():
    try:
        numberOfPasswords = int(request.json['numberOfPasswords'])
        passwordLength = int(request.json['passwordLength'])
        return pwd.generateRandomWeakPasswords(numberOfPasswords, passwordLength)
    except ValueError:
        return {'error': 'Input must be a number.'}
    except Exception:
        return {'error': 'Something went wrong.'}

@app.route('/checkPasswords', methods=['POST'])
def checkPasswords():
    try:
        file = request.files['file']
        print(file.content_type)
        if file.content_type == 'text/plain':
            if file.filename.split('.')[1] == 'txt':
                return pwd.checkPasswords(file)
            else:
                return {'error': 'File must have \'txt\' extension.'}
        else:
            return {'error': 'Insert only text file.'}
    except IndexError:
        return {'error': 'File must have a name and an extension.'}
    except werkzeug.exceptions.BadRequestKeyError:
        return {'error': 'Please insert file.'}
    except Exception:
        return {'error': 'Something went wrong.'}


if __name__ == '__main__':
    pwd.getCommonPasswords()
    app.run(debug=True)
