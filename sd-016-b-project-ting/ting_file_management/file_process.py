import sys
from ting_file_management.file_management import txt_importer


def process(path_file, instance):
    for d in instance.data:
        if d["nome_do_arquivo"] == path_file:
            return None
    data_list = txt_importer(path_file)
    new_data = {
        "nome_do_arquivo": path_file,
        "qtd_linhas": len(data_list),
        "linhas_do_arquivo": data_list
    }
    instance.enqueue(new_data)
    return sys.stdout.write(str(new_data))
    
        
def remove(instance):
    if (instance.dataLength > 0):
        data = instance.dequeue()
        return sys.stdout.write(
            f"Arquivo {data['nome_do_arquivo']} removido com sucesso\n"
            )
    else: 
        return sys.stdout.write("Não há elementos\n")


def file_metadata(instance, position):
    try:
        data = instance.search(position)
        return sys.stdout.write(str(data))
    except IndexError:
        return sys.stderr.write("Posição inválida")
