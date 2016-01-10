import re

def track_length(float):
    time = int(float)
    minutes = time / 60
    seconds = time % 60
    length = "{0:02d}:{1:02d}".format(int(minutes), seconds)

    return length


def nr_format(track_nr):
	regex = re.search('[0-9]{1,2}', track_nr)
	format = regex.group(0)

	return "{0:0>2s}.".format(format)