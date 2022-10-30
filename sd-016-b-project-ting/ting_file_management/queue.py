class Queue:
    def __init__(self):
        self.data = list()
        # n precisar utilizar memoria e processamento 
        # chamando o len()
        self.dataLength = 0

    def __len__(self):
        return self.dataLength

    def enqueue(self, value):
        self.data.append(value)
        self.dataLength += 1

    def dequeue(self):
        self.dataLength -= 1
        return self.data.pop(0)

    def search(self, index):
        if index < 0 or index > self.dataLength - 1:
            raise IndexError
        return self.data[index]
