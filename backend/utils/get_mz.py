def get_mz(level):
    filename = f"utils/maze_fields/{level}.mz"
    with open(filename, "r") as mz:
        bitstring = mz.read().replace("\n", "")
    return bitstring
