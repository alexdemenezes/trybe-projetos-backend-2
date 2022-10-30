import sys


def txt_importer(path_file):
    try:
        if(path_file.endswith(".txt")):
            with open(path_file, 'r') as file:
                # https://appdividend.com/2022/09/04/python-string-splitlines/
                return file.read().splitlines()
        else:
            return sys.stderr.write("Formato inválido\n")
    except FileNotFoundError:
        return sys.stderr.write(f"Arquivo {path_file} não encontrado\n")