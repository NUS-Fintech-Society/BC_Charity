"""This module only serves to create the sample transactions
"""
import random
from hashlib import sha256

NO_TRANSACTIONS = 500

with open('fakeUENs.csv') as f:
    SAMPLE_UENS = f.readlines()

print("tx_id,nric,transaction,charity,message,hashed\n")
for i in range(0, NO_TRANSACTIONS):
    tx_id = 'TX ' + str(i).zfill(3)
    nric = 'S' + str(random.randrange(0, 50)).zfill(7) + 'Z'
    transaction = str(random.randrange(0, 1000000))
    charity = random.choice(SAMPLE_UENS).strip('\n')
    message = random.choice(['how is this', '', 'another one'])
    hashinput = tx_id + nric + transaction + charity + message
    hashed = sha256(hashinput.encode('utf-8')).hexdigest().strip('\n')
    print(tx_id, nric, transaction, charity, message, hashed, sep=',')

