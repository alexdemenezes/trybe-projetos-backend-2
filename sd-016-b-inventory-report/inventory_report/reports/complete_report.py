from inventory_report.reports.simple_report import SimpleReport


# forma de resolucao extraida do colega de turma israel santanna
# linha muito grande tive que partir o link em dois para o flake8 n reclamar
# link https://github.com/tryber/sd-016-b-inventory-report/
# pull/23/commits/12200197302f4393acadb7dbf1e1c5c5c55f82ff#top
# gostei muito de como ele apresentou algo simples e bem direto.

class CompleteReport(SimpleReport):
    @staticmethod
    def generate(products):
        simple_report = SimpleReport.generate(products)
 
        products_by_company_dict = dict()
        for product in products:
            company = product['nome_da_empresa']
            if company in products_by_company_dict:
                products_by_company_dict[company] += 1
            else:
                products_by_company_dict[company] = 1
   
        products_by_company = [
            f'- {key}: {value}\n'
            for (key, value) in products_by_company_dict.items()
        ]

        return (
            f'{simple_report}\n'
            "Produtos estocados por empresa:\n"
            f'{"".join(count for count in products_by_company)}'
        )