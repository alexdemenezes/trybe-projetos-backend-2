from inventory_report.inventory.product import Product


def test_relatorio_produto():
    id = 7,
    nome_da_empresa = "produto teste"
    nome_do_produto = "empresa teste",
    data_de_fabricacao = "04/05/2002",
    data_de_validade = "04/05/2022",
    numero_de_serie = "1",
    instrucoes_de_armazenamento = "produto fragil"

    product = Product(
        id,
        nome_do_produto,
        nome_da_empresa,
        data_de_fabricacao,
        data_de_validade,
        numero_de_serie,
        instrucoes_de_armazenamento,
    )

    assert repr(product) == (
        f"O produto {product.nome_do_produto} fabricado em"
        f" {product.data_de_fabricacao} por {product.nome_da_empresa} com"
        f" validade até {product.data_de_validade} precisa ser armazenado"
        f" {product.instrucoes_de_armazenamento}."
    )
