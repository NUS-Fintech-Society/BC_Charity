"""
Converts a sample list of UENs into sample list of name, UEN, hash
"""
from hashlib import sha256
import sys

if len(sys.argv) != 3:
    print("Usage: python hash_item.py file type_of_item")
    sys.exit()


def name_maker(value):
    """Turns 1 -> AA, 2 -> BA, etc
    """
    first_letter = value % 26
    second_letter = int((value - first_letter)/26)
    letter_pair = (chr(first_letter + 65), chr(second_letter + 65))
    return ITEM + ' ' + letter_pair[0] + letter_pair[1]


ITEM = sys.argv[1]
FILEPATH_SAMPLE_UEN = sys.argv[2]
with open(FILEPATH_SAMPLE_UEN) as f:
    SAMPLE_UEN = f.readlines()
HASHED_UEN = [sha256(x.encode('utf-8')) for x in SAMPLE_UEN]
for (index, pair) in enumerate(zip(SAMPLE_UEN, HASHED_UEN)):
    print(name_maker(index), pair[0], pair[1].hexdigest(), sep=',')
