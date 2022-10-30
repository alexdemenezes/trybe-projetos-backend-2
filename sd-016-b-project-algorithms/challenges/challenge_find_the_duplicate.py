# refatorei para cobrir a situação de numeros negativos
# e tive que alterar a forma que estava fazendo devido a complexidade
def find_duplicate(nums):
    if not isinstance(nums, list):
        return False

    nums.sort()
    for i in range(len(nums) - 1):
        if isinstance(nums[i], str) or nums[i] < 0:
            return False
        if nums[i] == nums[i + 1]:
            return nums[i]
    return False

if __name__ == '__main__':
    print(find_duplicate([1, 2, 3, 1]))