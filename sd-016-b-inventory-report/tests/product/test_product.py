from inventory_report.inventory.product import Product


def test_cria_produto():
    produto = Product(
        7,
        "produto teste",
        "empresa teste",
        "04/05/2002",
        "04/05/2022",
        "1",
        "produto fragil"
    )

    assert produto.id == 7
    assert produto.nome_do_produto == "produto teste"
    assert produto.nome_da_empresa == "empresa teste"
    assert produto.data_de_fabricacao == "04/05/2002"
    assert produto.data_de_validade == "04/05/2022"
    assert produto.numero_de_serie == "1"
    assert produto.instrucoes_de_armazenamento == "produto fragil"
