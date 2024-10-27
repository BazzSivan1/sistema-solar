import * as Three from 'three'
import './style.css'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const width = window.innerWidth
const height = window.innerHeight

const renderer = new Three.WebGLRenderer()
renderer.setSize( width, height )
renderer.shadowMap.enabled = true
renderer.setAnimationLoop( animate )
document.querySelector( 'body' ).appendChild( renderer.domElement )

const textureLoader = new Three.TextureLoader()

const modelLoader = new GLTFLoader()

const camera = new Three.PerspectiveCamera( 75, width / height, 0.1, 1000 )
camera.position.set( 0, 5 , 5 )

const scene = new Three.Scene()

const light = new Three.DirectionalLight(0xffffff, 10)
light.position.set( 0, 1, 0 )
light.rotation.set( 45, 45, 0 )
light.castShadow = true
scene.add( light )

const ambientLight = new Three.AmbientLight( 0x404040 )
scene.add( ambientLight )

// controls
const controls = new OrbitControls( camera, renderer.domElement )

// textures of cube
// const diff = "textures/concrete_pavers/concrete_pavers_diff.jpg"
// const nor = "textures/concrete_pavers/concrete_pavers_nor.jpg"

// const diffTexture = textureLoader.load( diff )
// const norTexture = textureLoader.load( nor )

// cube
// const cubeGeo = new Three.BoxGeometry( 2, 2, 2 )
// const cubeMat = new Three.MeshStandardMaterial( { 
//   map: diffTexture,
//   normalMap: norTexture,
//   normalScale: new Three.Vector2( 2, 2 )
//  } )
// const cube = new Three.Mesh( cubeGeo, cubeMat )
// cube.castShadow = true
// scene.add( cube )

// model spray
// let model = null
// modelLoader.load( "models/spray/spray.gltf",
//   (gltf) => {
//     model = gltf.scene
//     model.scale.set( 10, 10, 10 )
//     model.position.set( 0, 0, 0 )
//     model.castShadow = true
//     scene.add( model )
//     // carregat
//   },
//   (xhr) => {
//     console.log( ( xhr.loaded / xhr.total ) * 100 + "% loaded" )
//     // cada iteracio
//   },
//   (error) => {
//     // error
//   }
// )

// sphere
const sphereGeo = new Three.SphereGeometry( 15, 32, 16 )
const sphereMat = new Three.MeshStandardMaterial( { 
  color: 0xffffff
 } )
const sphere = new Three.Mesh( sphereGeo, sphereMat )
sphere.castShadow = true
scene.add( sphere )

// pla
const plaGeo = new Three.PlaneGeometry( 15, 15 )
const plaMat = new Three.MeshStandardMaterial( { color: 0xffffff,
  side: Three.DoubleSide } )
const pla = new Three.Mesh( plaGeo, plaMat )
pla.position.set( 0, -5, 0 )
pla.rotation.set( 90 * Math.PI / 4, 0, 0 )
pla.receiveShadow = true
scene.add( pla )

let time = Date.now()

function animate() {
  const currentTime = Date.now()
  const daltaTime = currentTime - time
  time = currentTime

  // cube.rotateX( 0.001 * daltaTime )
  // cube.rotateY( 0.001 * daltaTime )
  // cube.rotateZ( 0.001 * daltaTime )

  // camera.lookAt( cube.position )

  // if ( model != null ) {
  //   model.rotateX( 0.001 * daltaTime )
  //   model.rotateY( 0.001 * daltaTime )
  //   model.rotateZ( 0.001 * daltaTime )
  
  //   camera.lookAt( model.position )
  // }

  sphere.rotateX( 0.001 * daltaTime )
  sphere.rotateY( 0.001 * daltaTime )
  sphere.rotateZ( 0.001 * daltaTime )

  camera.lookAt( sphere.position )

  renderer.render( scene, camera )
}