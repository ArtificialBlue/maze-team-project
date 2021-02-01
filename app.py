"""Random Maze Game (by Wildebeests)."""

from maze_prototype import createMaze

from flask import Flask, render_template
app = Flask(__name__)

MZ_PATH = "./static/maze_fields"

def get_maze(level):
    """Reads maze field data from file, removes newline chars,
    returns resultant bitstring."""

    filename = f"{MZ_PATH}/{level}.mz"

    # Read and remove newlines
    with open(filename, "r") as mz:
        bitstring = mz.read().replace("\n", "")

    return bitstring

@app.route('/')
def home():
    """Home page."""
    return render_template('home.html')

@app.route('/about')
def about():
    """About page."""
    return render_template('about.html')

@app.route('/maze/<level>')
def maze(level):
    """Main game page."""
    # if level < 0 or > max, redirect to level 0
    context = {
        'level': int(level),
        'maze_data': createMaze(15, 15)
        # 'maze_data': get_maze(level)
    }
    return render_template('maze.html', **context)

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
