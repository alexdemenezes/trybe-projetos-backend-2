
def write(path, content):
    with open(path, 'a', newline=None) as f:
        if path.endswith('.txt'):
            for item in content:
                f.write(f'{item}\n')
