/* Upper level interface for all objects within our game
interface RenderableObject {
  // Properties for all renderable objects
   position:Vector;
   size:Vector;
   color:string;
   movable:boolean;

   // We need to be able to change the position
   // Always return the new position
   updatePosition(delta:Vector):Vector;

   // Check for collision between this object and a specified object
   // Based on both objects positions and sizes
   checkCollision(target:RenderableObject):boolean;

   // Every drawn object needs to have some logic that draws it
   // Dependency injection is the canvas context
   draw(ctx:CanvasRenderingContext2D):void;
}
*/
/* General vector class for physics calculations */
var Vector = /** @class */ (function () {
    // Instantiation methods
    function Vector(x, y) {
        this.x_component = x;
        this.y_component = y;
    }
    Object.defineProperty(Vector.prototype, "x", {
        // Accessors
        get: function () {
            return this.x_component;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "y", {
        get: function () {
            return this.y_component;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "mag", {
        get: function () {
            return Math.sqrt((this.x_component ^ 2) + (this.y_component ^ 2));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "dir", {
        get: function () {
            return Math.atan(this.y_component / this.x_component);
        },
        enumerable: false,
        configurable: true
    });
    // Modifiers
    Vector.prototype.update = function (new_x, new_y) {
        this.x_component = new_x;
        this.y_component = new_y;
    };
    return Vector;
}());
/* This class will represent our base class for everything we draw on the screen */
var Sprite = /** @class */ (function () {
    // Instantiation
    function Sprite(x, y, width, height, color, movable) {
        this.position = new Vector(x, y);
        this.size = new Vector(width, height);
        this.color = color;
        this.movable = movable;
    }
    Object.defineProperty(Sprite.prototype, "x", {
        // Accessors
        get: function () {
            return this.position.x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "y", {
        get: function () {
            return this.position.y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "width", {
        get: function () {
            return this.size.x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "height", {
        get: function () {
            return this.size.y;
        },
        enumerable: false,
        configurable: true
    });
    // Modifiers
    Sprite.prototype.updatePosition = function (delta) {
        if (this.movable) {
            var new_x = this.x + delta.x;
            var new_y = this.y + delta.y;
            this.position.update(new_x, new_y);
            return this.position;
        }
    };
    // Check for collisions
    Sprite.prototype.checkCollision = function (target) {
        if (this.position.x + this.size.x > target.position.x && this.position.x - 8 < target.position.x + target.size.x) {
            if (this.position.y + this.size.y > target.position.y && this.position.y - 8 < target.position.y + target.size.y) {
                return true;
            }
        }
        return false;
    };
    // Render
    Sprite.prototype.draw = function (ctx) {
        var canvasWidth = ctx.canvas.clientWidth;
        var canvasHeight = ctx.canvas.clientHeight;
        // Draw the object using our instance properties
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };
    return Sprite;
}());
var MazeGame = /** @class */ (function () {
    function MazeGame() {
        var _this = this;
        // Note: lamba syntax is required here to make sure the 'this' context persists through animation frames
        this.run = function () {
            _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            _this.player.draw(_this.ctx);
            _this.maze.forEach(function (brick) {
                brick.draw(_this.ctx);
            });
            requestAnimationFrame(_this.run);
        };
        this.keyDownHandler = function (e) {
            if (e.key === 'Right' || e.key === 'ArrowRight') {
                _this.player.updatePosition(new Vector(10, 0));
            }
            else if (e.key === 'Left' || e.key === 'ArrowLeft') {
                _this.player.updatePosition(new Vector(-10, 0));
            }
            else if (e.key === 'Up' || e.key === 'ArrowUp') {
                _this.player.updatePosition(new Vector(0, -10));
            }
            else if (e.key === 'Down' || e.key === 'ArrowDown') {
                _this.player.updatePosition(new Vector(0, 10));
            }
        };
        this.canvas = document.getElementById('maze-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvasBounds = [
            new Sprite(-100, -100, 100, this.canvas.height + 100, 'none', false),
            new Sprite(-100, -100, this.canvas.width + 100, 100, 'none', false),
            new Sprite(this.canvas.width, -100, 100, this.canvas.height + 100, 'none', false),
            new Sprite(-100, this.canvas.height, this.canvas.width + 100, 100, 'none', false)
        ];
        var mazeData = document.querySelector('#maze-data').innerHTML.split('');
        var bricks = [];
        var numCols = Math.sqrt(mazeData.length);
        var brickSize = this.canvas.width / numCols;
        this.player = new Sprite(0, 0, brickSize, brickSize, '#ff0000', true);
        var col = 0;
        var row = 0;
        mazeData.forEach(function (bit) {
            if (bit === '1') {
                var x = col * brickSize;
                var y = row * brickSize;
                bricks.push(new Sprite(x, y, brickSize, brickSize, '#0040F5', false));
            }
            col++;
            if (col >= numCols) {
                col = 0;
                row++;
            }
        });
        this.maze = [new Sprite(50, 50, brickSize, brickSize, '#00405f', false)];
    }
    return MazeGame;
}());
var game = new MazeGame();
document.addEventListener('keydown', game.keyDownHandler, false);
game.run();
//# sourceMappingURL=maze.js.map