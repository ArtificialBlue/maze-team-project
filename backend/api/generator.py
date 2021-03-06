import random
from itertools import chain

maze = []


def clear_maze():
    maze.clear()


def init_maze(size):
    """Initialize maze of given size."""
    maze
    for i in range(0, size):
        line = ["u"] * size
        maze.append(line)


def make_walls(width, height):
    for i in range(0, height):
        for j in range(0, width):
            if maze[i][j] == "u":
                maze[i][j] = "1"


def delete_wall(walls, rand_wall):
    """Remove the processed cell from the wall list."""
    for wall in walls:
        if wall[0] == rand_wall[0] and wall[1] == rand_wall[1]:
            walls.remove(wall)


def create_entrance(maze, width):
    """Create maze entrance."""
    for i in range(0, width):
        if maze[1][i] == "0":
            maze[0][i] = "2"
            break


def create_exit(maze, width, height):
    """Create maze exit."""
    for i in range(width - 1, 0, -1):
        if maze[height - 2][i] == "0":
            maze[height - 1][i] = "2"
            break


def create_entrance_exit(maze, width, height):
    """Create maze entrance and exit."""
    create_entrance(maze, width)
    create_exit(maze, width, height)


def flatten_maze(maze):
    """Turn a 2D maze into a string."""
    return "".join(list(chain.from_iterable(maze)))


def surrounding_cells(rand_wall):
    s_cells = 0

    if maze[rand_wall[0] - 1][rand_wall[1]] == "0":
        s_cells += 1
    if maze[rand_wall[0] + 1][rand_wall[1]] == "0":
        s_cells += 1
    if maze[rand_wall[0]][rand_wall[1] - 1] == "0":
        s_cells += 1
    if maze[rand_wall[0]][rand_wall[1] + 1] == "0":
        s_cells += 1

    return s_cells


def create_maze(maze, width, height, walls):
    while walls:
        # Pick a random wall
        rand_wall = walls[int(random.random() * len(walls)) - 1]

        # Check if it is a left wall
        if rand_wall[1] != 0:
            if (
                maze[rand_wall[0]][rand_wall[1] - 1] == "u"
                and maze[rand_wall[0]][rand_wall[1] + 1] == "0"
            ):
                # Find the number of surrounding cells
                s_cells = surrounding_cells(rand_wall)

                if s_cells < 2:
                    # Denote the new path
                    maze[rand_wall[0]][rand_wall[1]] = "0"

                    # Mark the new walls
                    # Upper cell
                    if rand_wall[0] != 0:
                        if maze[rand_wall[0] - 1][rand_wall[1]] != "0":
                            maze[rand_wall[0] - 1][rand_wall[1]] = "1"
                        if [rand_wall[0] - 1, rand_wall[1]] not in walls:
                            walls.append([rand_wall[0] - 1, rand_wall[1]])

                    # Bottom cell
                    if rand_wall[0] != height - 1:
                        if maze[rand_wall[0] + 1][rand_wall[1]] != "0":
                            maze[rand_wall[0] + 1][rand_wall[1]] = "1"
                        if [rand_wall[0] + 1, rand_wall[1]] not in walls:
                            walls.append([rand_wall[0] + 1, rand_wall[1]])

                    # Leftmost cell
                    if rand_wall[1] != 0:
                        if maze[rand_wall[0]][rand_wall[1] - 1] != "0":
                            maze[rand_wall[0]][rand_wall[1] - 1] = "1"
                        if [rand_wall[0], rand_wall[1] - 1] not in walls:
                            walls.append([rand_wall[0], rand_wall[1] - 1])
                delete_wall(walls, rand_wall)
                continue

        # Check if it is an upper wall
        if rand_wall[0] != 0:
            if (
                maze[rand_wall[0] - 1][rand_wall[1]] == "u"
                and maze[rand_wall[0] + 1][rand_wall[1]] == "0"
            ):

                s_cells = surrounding_cells(rand_wall)
                if s_cells < 2:
                    # Denote the new path
                    maze[rand_wall[0]][rand_wall[1]] = "0"

                    # Mark the new walls
                    # Upper cell
                    if rand_wall[0] != 0:
                        if maze[rand_wall[0] - 1][rand_wall[1]] != "0":
                            maze[rand_wall[0] - 1][rand_wall[1]] = "1"
                        if [rand_wall[0] - 1, rand_wall[1]] not in walls:
                            walls.append([rand_wall[0] - 1, rand_wall[1]])

                    # Leftmost cell
                    if rand_wall[1] != 0:
                        if maze[rand_wall[0]][rand_wall[1] - 1] != "0":
                            maze[rand_wall[0]][rand_wall[1] - 1] = "1"
                        if [rand_wall[0], rand_wall[1] - 1] not in walls:
                            walls.append([rand_wall[0], rand_wall[1] - 1])

                    # Rightmost cell
                    if rand_wall[1] != width - 1:
                        if maze[rand_wall[0]][rand_wall[1] + 1] != "0":
                            maze[rand_wall[0]][rand_wall[1] + 1] = "1"
                        if [rand_wall[0], rand_wall[1] + 1] not in walls:
                            walls.append([rand_wall[0], rand_wall[1] + 1])
                delete_wall(walls, rand_wall)
                continue

        # Check the bottom wall
        if rand_wall[0] != height - 1:
            if (
                maze[rand_wall[0] + 1][rand_wall[1]] == "u"
                and maze[rand_wall[0] - 1][rand_wall[1]] == "0"
            ):

                s_cells = surrounding_cells(rand_wall)
                if s_cells < 2:
                    # Denote the new path
                    maze[rand_wall[0]][rand_wall[1]] = "0"

                    # Mark the new walls
                    if rand_wall[0] != height - 1:
                        if maze[rand_wall[0] + 1][rand_wall[1]] != "0":
                            maze[rand_wall[0] + 1][rand_wall[1]] = "1"
                        if [rand_wall[0] + 1, rand_wall[1]] not in walls:
                            walls.append([rand_wall[0] + 1, rand_wall[1]])
                    if rand_wall[1] != 0:
                        if maze[rand_wall[0]][rand_wall[1] - 1] != "0":
                            maze[rand_wall[0]][rand_wall[1] - 1] = "1"
                        if [rand_wall[0], rand_wall[1] - 1] not in walls:
                            walls.append([rand_wall[0], rand_wall[1] - 1])
                    if rand_wall[1] != width - 1:
                        if maze[rand_wall[0]][rand_wall[1] + 1] != "0":
                            maze[rand_wall[0]][rand_wall[1] + 1] = "1"
                        if [rand_wall[0], rand_wall[1] + 1] not in walls:
                            walls.append([rand_wall[0], rand_wall[1] + 1])
                delete_wall(walls, rand_wall)
                continue

        # Check the right wall
        if rand_wall[1] != width - 1:
            if (
                maze[rand_wall[0]][rand_wall[1] + 1] == "u"
                and maze[rand_wall[0]][rand_wall[1] - 1] == "0"
            ):

                s_cells = surrounding_cells(rand_wall)
                if s_cells < 2:
                    # Denote the new path
                    maze[rand_wall[0]][rand_wall[1]] = "0"

                    # Mark the new walls
                    if rand_wall[1] != width - 1:
                        if maze[rand_wall[0]][rand_wall[1] + 1] != "0":
                            maze[rand_wall[0]][rand_wall[1] + 1] = "1"
                        if [rand_wall[0], rand_wall[1] + 1] not in walls:
                            walls.append([rand_wall[0], rand_wall[1] + 1])
                    if rand_wall[0] != height - 1:
                        if maze[rand_wall[0] + 1][rand_wall[1]] != "0":
                            maze[rand_wall[0] + 1][rand_wall[1]] = "1"
                        if [rand_wall[0] + 1, rand_wall[1]] not in walls:
                            walls.append([rand_wall[0] + 1, rand_wall[1]])
                    if rand_wall[0] != 0:
                        if maze[rand_wall[0] - 1][rand_wall[1]] != "0":
                            maze[rand_wall[0] - 1][rand_wall[1]] = "1"
                        if [rand_wall[0] - 1, rand_wall[1]] not in walls:
                            walls.append([rand_wall[0] - 1, rand_wall[1]])
                delete_wall(walls, rand_wall)
                continue

        delete_wall(walls, rand_wall)


def generate_maze(height, width):
    wall = "1"
    cell = "0"

    clear_maze()

    init_maze(height)

    # Randomize starting point and set it a cell
    starting_height = int(random.random() * height)
    starting_width = int(random.random() * width)
    if starting_height == 0:
        starting_height += 1
    if starting_height == height - 1:
        starting_height -= 1
    if starting_width == 0:
        starting_width += 1
    if starting_width == width - 1:
        starting_width -= 1

    # Mark it as cell and add surrounding walls to the list
    maze[starting_height][starting_width] = cell
    walls = []
    walls.append([starting_height - 1, starting_width])
    walls.append([starting_height, starting_width - 1])
    walls.append([starting_height, starting_width + 1])
    walls.append([starting_height + 1, starting_width])

    # Denote walls in maze
    maze[starting_height - 1][starting_width] = "1"
    maze[starting_height][starting_width - 1] = "1"
    maze[starting_height][starting_width + 1] = "1"
    maze[starting_height + 1][starting_width] = "1"

    create_maze(maze, width, height, walls)

    make_walls(width, height)

    create_entrance_exit(maze, width, height)

    return flatten_maze(maze)
