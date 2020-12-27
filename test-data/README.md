# Sample Data

## Sample Transaction

List of charities ([Sample](sample-hashed-transactions.csv)):
```
Charity Name
UEN
Website // optional
image // optional, link to their logo (not hosted on our site)
```

Form Input ([Sample](sample-transactions.csv)):
```
time, // epoch time
NRIC, // S0000000Z to S0000050Z
amount, // in cents
charityUEN, // from /fakeUENs.csv
message // message in string form
```

to ([Sample](sample-hashed-transactions.csv)):
```
time, 
hashedNRIC, // sha265 hash of NRIC
amount,
charityUEN,
message
```