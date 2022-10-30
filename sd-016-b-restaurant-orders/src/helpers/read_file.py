
def read(path):
    with open(path, 'r') as file:
        list_of_line = file.read().splitlines()
        return [line.split(',') for line in list_of_line]
