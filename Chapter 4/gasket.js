var canvas;
var gl;

var points = [];

var numTimesToSubdivide = 0;

var bufferId;

function init() {
  canvas = document.getElementById("gl-canvas");

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }

  // Webgl canvas 구조생성
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  //  쉐이더 연결
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  // 버퍼생성 및 연결
  bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, 8 * Math.pow(3, 6), gl.STATIC_DRAW);

  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  // 슬라이더 이벤트 생성
  document.getElementById("slider").onchange = function (event) {
    numTimesToSubdivide = event.target.value;
    render();
  };

  render();
}

// 삼각형 생성 함수
function triangle(a, b, c) {
  points.push(a, b, c);
}

// 삼각형 분할 함수
function divideTriangle(a, b, c, count) {
  if (count == 0) {
    triangle(a, b, c);
  } else {
    var ab = mix(a, b, 0.5);
    var ac = mix(a, c, 0.5);
    var bc = mix(b, c, 0.5);

    --count;

    // 분할 후 세개의 새로운 삼각형 생성
    divideTriangle(a, ab, ac, count);
    divideTriangle(c, ac, bc, count);
    divideTriangle(b, bc, ab, count);
  }
}

window.onload = init;

// 렌더링 함수
function render() {
  var vertices = [vec2(-1, -1), vec2(0, 1), vec2(1, -1)];
  points = [];
  divideTriangle(vertices[0], vertices[1], vertices[2], numTimesToSubdivide);

  gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, points.length);
  points = [];
}
