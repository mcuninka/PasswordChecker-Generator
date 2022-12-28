from flask import Flask, request
import werkzeug
import password

app = Flask(__name__)
pwd = password.Password()

# route to check the password
@app.route('/passwordCheck', methods=['POST'])
def checkPassword():
    return pwd.checkPassword(request.json['password'])

# route to generate 1 strong password
@app.route('/generateStrongPassword', methods=['POST'])
def generateStrongPassword():
    try:
        passwordLength = int(request.json['passwordLength'])
        return pwd.generateStrongPassword(passwordLength)
    except ValueError:
        return {'error': 'Input must be a number.'}
    except Exception:
        return {'error': 'Something went wrong.'}

# route to generate weak passwords from 2 user inputs (number of passwords & password length) 
@app.route('/generateWeakPasswords', methods=['POST'])
def generateWeakPasswords():
    try:
        numberOfPasswords = int(request.json['numberOfPasswords'])
        passwordLength = int(request.json['passwordLength'])
        return pwd.generateWeakPasswords(numberOfPasswords, passwordLength)
    except ValueError:
        return {'error': 'Input must be a number.'}
    except Exception:
        return {'error': 'Something went wrong.'}

# route to check passwords from txt file
# checks if the file is txt file and has txt extension
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


# main method which firstly gets common passwords from gitHub and then runs the flask application
if __name__ == '__main__':
    pwd.getCommonPasswords()
    app.run(debug=True)
