class SimpleReport:
    @staticmethod
    def generate(products):
        max_f_date = min(product["data_de_fabricacao"] for product in products)    
        next_e_date = min(product["data_de_validade"] for product in products)
        companies = [product["nome_da_empresa"] for product in products]
        company_with_more_products = ""
        min_product_quantity = 0
        # codigo complexo, refatorar depois

        for company in companies:
            if companies.count(company) > min_product_quantity:
                min_product_quantity = companies.count(company)
                company_with_more_products = company
        return (
                f'Data de fabricação mais antiga: {max_f_date}\n'
                f'Data de validade mais próxima: {next_e_date}\n'
                f'Empresa com mais produtos: {company_with_more_products}'
            )
