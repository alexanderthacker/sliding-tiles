var tiles_completed = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ' '];
var tiles = ['C', 'D', 'A', 'B', 'E', 'G', 'H', 'F', ' '];

var rows = 3;
var columns = 3;

document.addEventListener('DOMContentLoaded', function () {

		var sliding_container = document.querySelector('#sliding-container');

		for(var x = 0; x < tiles.length; x++) {
				if(tiles[x] != ' ') {
						sliding_container.innerHTML += '<div class="tile" id="tile'+x+'"><div class="tile-sizer"><div class="tile-inner">'+tiles[x]+'</div></div></div>';
						// <div class="tile-controls"><div class="up">˄</div><div class="right">˃</div><div class="down">˅</div><div class="left">˂</div></div>
				} else {
						sliding_container.innerHTML += '<div class="tile blank-tile"></div>';
				}
		}

		var tiles_dom = document.querySelectorAll('.tile');
		for (i = 0; i < tiles_dom.length; i++) {
				tiles_dom[i].addEventListener('click', function() {
						shift(findCoordinates(this));
				});
		}
		
		/*
		var up_elems = document.querySelectorAll('.up');
		for (i = 0; i < up_elems.length; i++) {
				up_elems[i].addEventListener('click', function() {
						move(this.parentNode.parentNode.parentNode, 'up');
				});
		}

		var right_elems = document.querySelectorAll('.right');
		for (i = 0; i < right_elems.length; i++) {
				right_elems[i].addEventListener('click', function() {
						move(this.parentNode.parentNode.parentNode, 'right');
				});
		}

		var down_elems = document.querySelectorAll('.down');
		for (i = 0; i < down_elems.length; i++) {
				down_elems[i].addEventListener('click', function() {
						move(this.parentNode.parentNode.parentNode, 'down');
				});
		}

		var left_elems = document.querySelectorAll('.left');
		for (i = 0; i < left_elems.length; i++) {
				left_elems[i].addEventListener('click', function() {
						move(this.parentNode.parentNode.parentNode, 'left');
				});
		}
		*/
});

function indexToCoordinates(dom_index) {
		var x_coord = dom_index % columns;
		var y_coord = parseInt(dom_index / rows);
		return [x_coord, y_coord];		
}

function findIndex(dom_elem) {
		return Array.prototype.slice.call(dom_elem.parentNode.children).indexOf(dom_elem);
}

function findCoordinates(dom_elem) {
		return indexToCoordinates(findIndex(dom_elem));
}

function coordinatesToIndex(coordinates) {
		return coordinates[0] + rows * coordinates[1];
}

function coordinatesToDom(coordinates) {
		var index = coordinatesToIndex(coordinates);
		var tiles = document.querySelectorAll('.tile');
		return tiles[index];
}

function findBlankCoordinates() {
		var blank_tile = document.querySelector('.blank-tile');
		var all_tiles = document.querySelectorAll('.tile');
		for(i = 0; i < all_tiles.length; i++) {
				if(all_tiles[i] == blank_tile) {
						return indexToCoordinates(i);
				}
		}
}

function shift(clicked_coords) {
		/* Clicked Tile and Blank Tile must be in either same row or column */
		/* Swap one by one until the Blank Tile is where the Clicked Tile originally was */
		var blank_coords = findBlankCoordinates();
	
		var axis;
		var direction;
		var number_to_move;
		if(clicked_coords[0] == blank_coords[0]) {
				axis = 1;
				direction = findDirection(clicked_coords, blank_coords, axis);
				number_to_move = Math.abs(clicked_coords[1] - blank_coords[1]);
		} else if(clicked_coords[1] == blank_coords[1]) {
				axis = 0;
				direction = findDirection(clicked_coords, blank_coords, axis);
				number_to_move = Math.abs(clicked_coords[0] - blank_coords[0]);
		} else {
				alert('Choose another tile');
		}

		var previous_coords = [...blank_coords];
		previous_coords[axis] += direction * 1;
		for(i = 0; i < number_to_move; i++) {
				swapDom(coordinatesToDom(blank_coords), coordinatesToDom(previous_coords));
				blank_coords[axis] += direction * 1
				previous_coords[axis] += direction * 1;
		}
}

function findDirection(clicked_coords, blank_coords, axis) {
		if(clicked_coords[axis] < blank_coords[axis]) {
				return -1;
		} else {
				return 1;
		}		
}

function swapDom(a, b) {
		var tempNode = document.createElement('div');
		a.parentNode.insertBefore(tempNode, a);
		a.parentNode.insertBefore(a, b);
		b.parentNode.insertBefore(b, tempNode);
		tempNode.remove();
}
