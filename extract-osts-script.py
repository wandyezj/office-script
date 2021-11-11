# Python Script
# extract the Office Script from an Office Script .osts file
# note: the osts format may change at any time and break this script!
# Office Scripts osts files are stored in OneDrive under Documents\Office Scripts
r'''
Run the script from the command line.

example:

Extract Office Script from osts file and redirect to an output ts file using > operator.

python.exe extract-osts-script.py "%userprofile%\OneDrive\Documents\Office Scripts\Script 1.osts" > "Script 1.ts"

'''


import json

def read_file_data(path):
    f= open(path)
    data = f.read()
    f.close()
    return data

o = json.loads(r'''{
    "data":"hello world"
 }''')

def get_osts_body(data):
    o = json.loads(data)
    body = o['body']
    return body


import argparse

parser = argparse.ArgumentParser(description = '''Extract Office Script Tcode from an osts file.''')
parser.add_argument('osts', help="The path enclosed in double quotes to the osts file to extract the script body from" )
args = parser.parse_args()

# extract the data
path = args.osts
data = read_file_data(path)
body = get_osts_body(data)

# print extracted data
print(body)
