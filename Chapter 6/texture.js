function init() {
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
  camera.position.set(0, 40, 150);
  camera.lookAt(scene.position);

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
  //그림자 생성
  renderer.shadowMap.enabled = true;

  // 바닥판 생성
  var planeGeometry = new THREE.PlaneGeometry(100, 200);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: "rgb(255,102,120)",
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);

  // 바닥판이 바닥으로 가도록 세팅
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(0, 0, 0);
  scene.add(plane);

  //바닥판은 그림자를 받음
  plane.receiveShadow = true;

  // 텍스처 지정
  var texture = new THREE.TextureLoader();
  var select1 = texture.load("texture/Image1.jpg");
  var select2 = texture.load("texture/Image2.jpg");

  // 구생성
  var sphereGeometry = new THREE.SphereGeometry(20, 32, 32);
  var sphereMaterial = new THREE.MeshLambertMaterial({
    map: select1,
  });
  var Sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  Sphere.position.set(-40, 20, 0);
  scene.add(Sphere);
  Sphere.castShadow = true;

  var sphereMaterial = new THREE.MeshLambertMaterial({
    map: select2,
  });
  var Sphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial);
  Sphere2.position.set(40, 20, 0);
  scene.add(Sphere2);
  Sphere2.castShadow = true;

  // 변수 전달
  document.getElementById("threejs_scene").appendChild(renderer.domElement);

  // 렌더링
  renderScene();

  // 렌더링 함수
  function renderScene() {
    renderer.render(scene, camera);
    requestAnimationFrame(renderScene);
  }
}
window.onload = init();
