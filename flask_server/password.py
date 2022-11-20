import re
import random
import string
import requests

class Password:
    def __init__(self):
        self._minPasswordLength = 12
        self._maxPasswordLength = 50
        self._commonPasswords = []

    def getCommonPasswords(self):
        url = 'https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10-million-password-list-top-100.txt'

        r = requests.get(url)

        if r:
            for password in r.content.decode('utf-8').split('\n'):
                self._commonPasswords.append(password)
        else:
            print(r.text)

    def checkPassword(self, password):
        errors = []

        if password == '':
            errors.append('Please enter password.')
        else:
            if password in self._commonPasswords:
                errors.append('This is a common password, choose stronger one.')
            else:
                if len(password) < self._minPasswordLength:
                    errors.append(
                        f'Password must include at least {self._minPasswordLength} characters')

                if re.search(r"[a-z]", password) is None:
                    errors.append('Password must include at least 1 lower character.')

                if re.search(r"[A-Z]", password) is None:
                    errors.append('Password must include at least 1 upper character.')

                if re.search(r"\d", password) is None:
                    errors.append('Password must include at least 1 digit.')

                if re.search(r"[@_!#$%^&*()<>?/|}{~:]", password) is None:
                    errors.append('Password must include at least 1 special character.')

                # if not any(p in password for p in string.punctuation):
                #     errors.append('Password must include at least 1 special character.')

        if len(errors) > 0:
            return errors
        else:
            return 'Your password fulfill  all the requirements.'

    def checkPasswords(self, file):
        try:
            fileText = file.read().decode('utf-8').split('\n')
            with open('PasswordsCheck.txt', 'w') as f:
                for i in range(len(fileText)) :

                    if i < len(fileText) - 1:
                        f.write(fileText[i] + '\t' + str(self.checkPassword(fileText[i])) + '\n\n')
                    else:
                        f.write(fileText[i] + '\n' + '\t' + str(self.checkPassword(fileText[i])))

                
            # with open('WeakPasswords.txt', 'r') as f:
            #     with open('PasswordsCheck.txt', 'w') as newFile:
            #         for line in f:
            #             result = self.checkPassword(line)
            #             newFile.write(line + '\t' + str(result) + '\n\n')
            return 'Checked and Saved successfully.'

        except FileNotFoundError:
            return {'error': 'Wrong file or file path.'}
        except Exception:
            return {'error': 'Something went wrong.'}

    def generatePassword(self, passwordLength):
        try:
            if passwordLength < 0:
                return {'error': 'Number of characters must be a positive number.'}
            elif passwordLength < self._minPasswordLength:
                return {'error': f'Password must have at least {self._minPasswordLength} characters.'}
            elif passwordLength > self._maxPasswordLength:
                return {'error': f'Password can not have more than {self._maxPasswordLength} characters.'}
            else:
                characters = string.ascii_lowercase + \
                string.ascii_uppercase + string.digits + '@_!#$%^&*()<>?/|}{~:'
                randomPassword = ''.join(random.choice(characters)
                                        for i in range(passwordLength))
                return randomPassword
        except:
            return {'error': 'Input must be a number.'}

    def generateRandomWeakPasswords(self, numberOfPasswords, passwordLength):
        try:
            if numberOfPasswords == 0 or passwordLength == 0:
                return {'error': 'Input must be greater than 0.'}
            else:
                characters = [string.ascii_lowercase + string.ascii_uppercase + string.digits,
                                string.ascii_lowercase + string.ascii_uppercase + string.punctuation,
                                string.ascii_lowercase + string.digits + string.punctuation,
                                string.ascii_lowercase + string.ascii_uppercase,
                                string.ascii_lowercase + string.punctuation,
                                string.ascii_lowercase + string.digits,
                                string.ascii_lowercase,
                                string.ascii_uppercase + string.ascii_lowercase + string.digits,
                                string.ascii_uppercase + string.ascii_lowercase + string.punctuation,
                                string.ascii_uppercase + string.digits + string.punctuation,
                                string.ascii_uppercase + string.ascii_lowercase,
                                string.ascii_uppercase + string.punctuation,
                                string.ascii_uppercase + string.digits,
                                string.ascii_uppercase,
                                string.digits + string.ascii_lowercase + string.ascii_uppercase,
                                string.digits + string.ascii_lowercase + string.punctuation,
                                string.digits + string.ascii_uppercase + string.punctuation,
                                string.digits + string.ascii_lowercase,
                                string.digits + string.punctuation,
                                string.digits + string.ascii_uppercase,
                                string.digits,
                                string.punctuation + string.ascii_lowercase + string.ascii_uppercase,
                                string.punctuation + string.ascii_lowercase + string.digits,
                                string.punctuation + string.ascii_uppercase + string.digits,
                                string.punctuation + string.ascii_lowercase,
                                string.punctuation + string.punctuation,
                                string.punctuation + string.ascii_uppercase,
                                string.punctuation]

                randomRule = random.choice(characters)

                with open('WeakPasswords.txt', 'w') as file: # Also possible with a+ to append already existing file
                    # file.write(f'{passwordLength} characters long passwords:\n')                
                    for i in range(numberOfPasswords):
                        randomWeakPassword = ''.join(random.choice(randomRule)
                                                for i in range(passwordLength))
                        file.write(randomWeakPassword + '\n')

                return 'Saved successfully.'

        except FileNotFoundError:
            return {'error': 'Wrong file or file path.'}
        except ValueError:
            return {'error': 'Input must be a number.'}
        except Exception:
            return {'error': 'Something went wrong.'}