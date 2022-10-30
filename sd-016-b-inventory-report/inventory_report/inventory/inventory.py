import csv
import json
import xml.etree.ElementTree as ET
from ..reports.simple_report import SimpleReport
from ..reports.complete_report import CompleteReport


class Inventory:
    @classmethod
    def import_data(self, path, reportType):
        products = self.products_from_file_type(path)
        if reportType == "simples":
            return SimpleReport.generate(products)
        elif reportType == "completo":
            return CompleteReport.generate(products)
        return ""

    @classmethod
    def products_from_file_type(self, path):
        products = []
        if path.endswith(".csv"):
            with open(path) as csv_file:
                reader = csv.DictReader(csv_file)
                products = [row for row in reader]
        elif path.endswith(".json"):
            with open(path) as json_file:
                products = json.load(json_file)
        elif path.endswith(".xml"):
            with open(path) as xml_file:
                tree = ET.parse(xml_file)
                root = tree.getroot()
                products = [
                    {element.tag: element.text for element in record}
                    for record in root
                ]
        return products
