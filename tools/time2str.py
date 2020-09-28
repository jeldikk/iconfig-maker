import argparse
import datetime


DEFAULT_TIMESTAMP = {
    'year':2020,
    'month': 1,
    'day': 30,
    'hour': 12,
    'minute': 34,
    'second': 56
}

parser = argparse.ArgumentParser(description="Timestamp to string conversion depending on format specifiers")

parser.add_argument('-f',action="store", type=str, dest="format_str",help="datatime format to be used")


results = parser.parse_args()

default = datetime.datetime(**DEFAULT_TIMESTAMP)

print(default.strftime(results.format_str))