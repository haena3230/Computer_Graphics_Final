function init() {
  // 다리 움직임을 위한 변수
  var step = 0;

  // renderer 생성
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color("rgb(204,204,204)"));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // scene 생성
  var scene = new THREE.Scene();

  // camera 생성
  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(50, 50, -1000);
  camera.lookAt(0, 50, 0);

  // 편의성을 위한 축 생성
  var axes = new THREE.AxesHelper(20);
  axes.position.set(0, 0, 0);
  scene.add(axes);

  // 조명 생성
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(20, 50, 100);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize = new THREE.Vector2(5120, 5120);
  scene.add(spotLight);

  // 격자 생성
  var size = 2000;
  var divisions = 100;
  var gridHelper = new THREE.GridHelper(size, divisions);
  console.log(gridHelper);
  scene.add(gridHelper);

  // 큐브생성
  var cubeGeometry = new THREE.CubeGeometry(20, 60, 20);
  var cubeMaterial = new THREE.MeshLambertMaterial();
  var Box1 = new THREE.Mesh(cubeGeometry, cubeMaterial);
  Box1.position.set(-70, 30, 0);
  scene.add(Box1);

  var Box2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
  Box2.position.set(70, 30, 100);
  scene.add(Box2);

  var Box3 = new THREE.Mesh(cubeGeometry, cubeMaterial);
  Box3.position.set(30, 30, -100);
  scene.add(Box3);
  // 변수 전달
  document.getElementById("threejs_scene").appendChild(renderer.domElement);

  // 렌더링
  renderScene();

  // 렌더링 함수
  function renderScene() {
    //카메라 움직임
    var move = 0;
    move += 1;
    camera.translateZ(-move);

    renderer.render(scene, camera);
    requestAnimationFrame(renderScene);
  }
}
window.onload = init();
