"""This module only serves to create the sample transactions
"""
import random
from hashlib import sha256

NO_TRANSACTIONS = 500

with open('fakeUENs.csv') as f:
    SAMPLE_UENS = f.readlines()

# print("time,nric,transaction,charity,message")
# for i in range(0, NO_TRANSACTIONS):
#     epochTime = random.choice(range(1603719528, 1608989928))
#     nric = 'S' + str(random.randrange(0, 50)).zfill(7) + 'Z'
#     transaction = str(random.randrange(0, 1000000))
#     charity = random.choice(SAMPLE_UENS).strip('\n')
#     message = random.choice(['hugs and kisses', '', '#tree', 'some message', 'another message', 'Msg! exactly 32 characters long!'])
#     print(epochTime, nric, transaction, charity, message, sep=',')

with open('sample-transactions.csv') as f:
    SAMPLE_TX = f.readlines()

print("time,hashedNRIC,amount,charityUEN,message")
for i in SAMPLE_TX[1:]:
    time, inputNRIC, amount, charityUEN, message = i.strip('\n').split(',')
    hashedNRIC = sha256(inputNRIC.encode('utf-8')).hexdigest().strip('\n')
    print(time, hashedNRIC, amount, charityUEN, message, sep=',')