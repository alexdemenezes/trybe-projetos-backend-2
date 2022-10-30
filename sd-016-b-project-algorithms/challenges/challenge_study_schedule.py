def study_schedule(permanence_period, target_time):
    try:
        target_time_counter = 0
        # https://www.geeksforgeeks.org/python-check-if-variable-is-tuple/
        for (stdnt_in, stdnt_out) in permanence_period:
            if stdnt_in <= target_time and target_time <= stdnt_out:
                target_time_counter += 1
        return target_time_counter
    except (TypeError, ValueError):
        return None
