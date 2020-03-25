class Point{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}
 class Cube{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
const canvas = document.getElementById("hexagon");
const ctx = canvas.getContext('2d');


canvas.width = 1000;
canvas.height = 1000;
const rect = canvas.getBoundingClientRect();
const p = new Point(rect.width /2, rect.height/2);

function hex_corners(center,size){
  const points = [];
  for(var i = 0 ; i <= 6; i++){
    var angle_deg = 60 *i;
    var angle_rad = Math.PI / 180 * angle_deg;
    points.push( new  Point(
    center.x + size * Math.cos(angle_rad),
    center.y + size * Math.sin(angle_rad)));
  }
  return points;
}

function cube_add(cube, cube_other){
  return new Cube(cube.x + cube_other.x,
                 cube.y + cube_other.y,
                  cube.z + cube_other.z);
}

function draw_hex(points){
  const start = points[0];
  ctx.moveTo(start.x,start.y);
  for(var i = 1; i <= 6; i++){
  ctx.lineTo(points[i].x,points[i].y ); 
  }
  ctx.fillStyle = "white"
  ctx.fill();
  ctx.stroke(); 
}

function cube_ring(center,radius){
   var results = [];
   var cube = cube_add(center, 
                        cube_scale(cube_direction(4),radius));
  for(var i = 0; i< 6; i++){
    for(var j = 0; j < radius; j++){
      results.push(cube);
      cube = cube_neighbor(cube, i);
    }
  }
return results;
}
 function cube_scale(cube, size){
      return new Cube(cube.x * size,
                      cube.y * size,
                      cube.z * size
                      );
 }
var cube_directions = [
  new Cube(+1, -1, 0), new Cube(+1, 0, -1), new Cube(0, +1, -1), 
  new Cube(-1,  +1, 0), new Cube(-1, 0, +1), new Cube(0, -1, +1), 
]

function cube_direction(direction){
  return cube_directions[direction];
}
function cube_neighbor(cube, direction){
  return cube_add(cube, cube_direction(direction));
}

function cube_spiral(center, radius){
    var results = [center];
    for (var k = 1;  k < radius; k++){
        results.push(...cube_ring(center, k));
      }
    return results;
}
function flat_hex_to_pixel(hex,size){
  
    var x = size * (3./2 * hex.x) + p.x ;
    var y = size * (Math.sqrt(3)/2 * hex.x + Math.sqrt(3) * hex.y) + p.y ;
    return  new Point(x, y);
}



function draw_hexs(){
  let t = prompt("enter number", 0)
  const cubes = cube_spiral(new Cube(0,0,0),t);
  for(var i = 0; i < cubes.length; i++){
     draw_hex(hex_corners(flat_hex_to_pixel(cubes[i],35),35));  
  }
}
draw_hexs();







