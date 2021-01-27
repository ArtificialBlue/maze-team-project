from flask import Flask, request, render_template
app = Flask(__name__)

MAZE_FIELD_PATH = "./static/maze_fields"

def get_maze(level):
    """Reads maze field data from file, removes newline chars,
    returns resultant bitstring."""

    # filename = f"{MAZE_FIELD_PATH}/Dino.mz"
    filename = f"{MAZE_FIELD_PATH}/{level}.mz"

    with open(filename, "r") as bitstring:
        bitstring = bitstring.read()

    bitstring = bitstring.replace("\n", "")  # Removes newlines

    print(bitstring)

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
