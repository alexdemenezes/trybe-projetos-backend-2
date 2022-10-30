def exists_word(word, instance):
    result = list()
    ocurencies = 0
    for index, data in enumerate(instance.data):
        result.append({
                "palavra": word,
                "arquivo": data['nome_do_arquivo'],
                "ocorrencias": list()
            })
        for i, line in enumerate(data["linhas_do_arquivo"]):
            if word.lower() in line.lower():
                ocurencies += 1
                result[index]['ocorrencias'].append({"linha": i + 1}) 
    if ocurencies == 0:
        return list()
    return result
         

def search_by_word(word, instance):
    ...