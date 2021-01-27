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

    return(bitstring)

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
    context = {
        'level': level,
        'maze_data': get_maze(level)
    }
    return render_template('maze.html', **context)

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
