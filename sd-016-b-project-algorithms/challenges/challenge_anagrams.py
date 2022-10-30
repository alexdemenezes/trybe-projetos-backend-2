# https://www.educative.io/answers/how-to-implement-selection-sort-in-python

def selection_sort(string):
    string_to_list = list(string)
    n = len(string)
    for i in range(n):
        minimum = i

        for j in range(1+i, n):
            if string_to_list[j] < string_to_list[minimum]:
                minimum = j
        old_element = string_to_list[i]
        string_to_list[i] = string_to_list[minimum]
        string_to_list[minimum] = old_element
    return string_to_list


def verify(str1, str2):
    n = len(str1)
    for i in range(n):
        if str1[i] != str2[i]:
            return False
    return True


def is_anagram(first_string, second_string):
    try:
        if first_string == '' or second_string == '':
            return False
        str1_sorted = selection_sort(first_string.lower())
        str2_sorted = selection_sort(second_string.lower())
        return verify(str1_sorted, str2_sorted)
    except IndexError:
        return False
