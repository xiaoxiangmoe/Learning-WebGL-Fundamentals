import {
  AxesHelper,
  BufferAttribute,
  BufferGeometry,
  Clock,
  Color,
  DoubleSide,
  Mesh,
  OrthographicCamera,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three';
import vert from './shader/plane_vert.glsl?raw';
import frag from './shader/plane_frag.glsl?raw';

function getGeometry() {
  const itemSize = 3;
  const itemCount = 4;
  const positions = new BufferAttribute(
    new Float32Array(itemSize * itemCount),
    itemSize
  );
  positions.setXYZ(0, -0.5, 0, 0);
  positions.setXYZ(1, 0.5, 0, 0);
  positions.setXYZ(2, 0.5, 0.5, 0);
  positions.setXYZ(3, -0.5, 0.5, 0);

  const buffer = new BufferGeometry();
  buffer.setAttribute('position', positions);
  const indexes = new BufferAttribute(new Uint8Array(6), 1);
  indexes.copyArray(
    [
      [0, 1, 2],
      [0, 2, 3],
    ].flat()
  );
  buffer.setIndex(indexes);
  return buffer;
}

function getPlane() {
  /**
   * 着色器
   */
  const shader = new ShaderMaterial({
    vertexShader: vert,
    fragmentShader: frag,
    transparent: true,
    uniforms: {
      color: { value: new Color(0xffff00) },
    },
    side: DoubleSide,
  });
  const plane = new Mesh(getGeometry(), shader);
  return plane;
}

/**
 * 场景
 */
const scene = new Scene();
/**
 * 正交相机
 */
const camera = new OrthographicCamera(
  0,
  window.innerWidth,
  0,
  window.innerHeight,
  0,
  20
);

const renderer = new WebGLRenderer();

const clock = new Clock();

function init() {
  camera.position.set(0, 0, 1);
  camera.lookAt(scene.position);
  renderer.setClearColor(0xff0000);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  scene.add(new AxesHelper(10));

  scene.add(getPlane());
  animate();
}

function render() {
  const delta = clock.getDelta();
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

init();
