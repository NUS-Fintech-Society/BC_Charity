"""
Converts a sample list of UENs into sample list of name, UEN, hash
"""
from hashlib import sha256
import sys
FILEPATH_SAMPLE_UEN = 'fakeUENs.csv'

def name_maker(value):
    """Turns 1 -> AA, 2 -> BA, etc
    """
    first_letter = value % 26
    second_letter = int((value - first_letter)/26)
    letter_pair = (chr(first_letter + 65), chr(second_letter + 65))
    return 'Charity' + ' ' + letter_pair[0] + letter_pair[1]


with open(FILEPATH_SAMPLE_UEN) as f:
    SAMPLE_UEN = f.readlines()
index = 0
for (index, uen) in enumerate(list(SAMPLE_UEN)):
    print(name_maker(index), uen.strip('\n'), sep=',')
