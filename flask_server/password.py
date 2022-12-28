import re
import secrets
import string
import requests
import os

class Password:
    def __init__(self):
        self._minPasswordLength = 12
        self._maxPasswordLength = 50
        self._commonPasswords = []

    # method to get top 100 common passwrods from GitHub as txt file
    def getCommonPasswords(self):
        url = 'https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10-million-password-list-top-100.txt'

        r = requests.get(url)

        if r:
            for password in r.content.decode('utf-8').split('\n'):
                self._commonPasswords.append(password)
        else:
            print(r.text)

    # method to check password strength
    # condtions:
        # Password should have at least a length of 12 characters
        # Password should contain at least 1 number
        # Password should contain at least 1 special characters
        # Password should contain at least 1 upper case letter
        # Password should contain at least 1 lower case letter
        # The password does not exists in the common passwords
    # @param password String to check
    def checkPassword(self, password):
        errors = []

        if password == '':
            errors.append('Please enter password.')
        else:
            if password in self._commonPasswords:
                errors.append(
                    'This is a common password, choose stronger one.')
            else:
                if len(password) < self._minPasswordLength:
                    errors.append(
                        f'Password must include at least {self._minPasswordLength} characters')

                if re.search(r"[a-z]", password) is None:
                    errors.append(
                        'Password must include at least 1 lower character.')

                if re.search(r"[A-Z]", password) is None:
                    errors.append(
                        'Password must include at least 1 upper character.')

                if re.search(r"\d", password) is None:
                    errors.append('Password must include at least 1 digit.')

                if re.search(r"[!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]", password) is None:
                    errors.append(
                        'Password must include at least 1 special character.')

        if len(errors) > 0:
            return errors
        else:
            return 'Your password fulfill  all the requirements.'

    # method to check passwords from a provided file
    # @param file File containing passwords
    def checkPasswords(self, file):
        try:
            fileText = file.read().decode('utf-8').split(os.linesep)
            with open('PasswordsCheck.txt', 'w') as f:
                for i in range(len(fileText)):
                    if i < len(fileText) - 1:
                        f.write(fileText[i] + '\n' + '\t' +
                                str(self.checkPassword(fileText[i])) + os.linesep)
                    else:
                        f.write(fileText[i] + '\n' + '\t' +
                                str(self.checkPassword(fileText[i])))
            return 'Checked and Saved successfully.'

        except FileNotFoundError:
            return {'error': 'Wrong file or file path.'}
        except Exception:
            return {'error': 'Something went wrong.'}


    # helper method to generate password
    # @param passwordLength The length of the password
    def generatePassword(self, passwordLength):
        characters = string.ascii_lowercase + \
                    string.ascii_uppercase + string.digits + string.punctuation
        randomPassword = ''.join(secrets.choice(characters)
                                     for _ in range(passwordLength))
        return randomPassword

    # method to genarate 1 strong password
    # @param passwordLength The length of the password, must be greater than minPasswordsLength
    # and shorter than maxPasswordslength
    def generateStrongPassword(self, passwordLength):
        if passwordLength < 0:
            return {'error': 'Number of characters must be a positive number.'}
        elif passwordLength < self._minPasswordLength:
            return {'error': f'Password must have at least {self._minPasswordLength} characters.'}
        elif passwordLength > self._maxPasswordLength:
            return {'error': f'Password can not have more than {self._maxPasswordLength} characters.'}
        else:
            found = False

            # loop while strong password not found
            while not found:
                randomPassword = self.generatePassword(passwordLength)
                checkedRandomPassword = self.checkPassword(randomPassword)

                if isinstance(checkedRandomPassword, str):
                    found = True
                    return randomPassword

    # generates random WEAK passwords and saves them to txt file
    # @param numberOfPasswords Input how many passwords should be generated
    # @param passwordLength The length of generated passwords
    def generateWeakPasswords(self, numberOfPasswords, passwordLength):
        try:
            if numberOfPasswords == 0 or passwordLength == 0:
                return {'error': 'Input must be greater than 0.'}
            else:
                numberOfWeakPasswords = 0
 
                with open('WeakPasswords.txt', 'w') as file:
                    for _ in range(numberOfPasswords):
                        while numberOfWeakPasswords < numberOfPasswords:
                            randomPassword = self.generatePassword(passwordLength)
                            checkRandomPassword = self.checkPassword(randomPassword)
                            
                            if not isinstance(checkRandomPassword, str):
                                file.write(randomPassword + '\n')
                                numberOfWeakPasswords += 1
                                
                return 'Saved successfully.'

        except FileNotFoundError:
            return {'error': 'Wrong file or file path.'}
        except Exception:
            return {'error': 'Something went wrong.'}
