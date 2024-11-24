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
camera.position.set( 0, 25 , 25 )

const scene = new Three.Scene()

const light = new Three.DirectionalLight(0xffffff, 10)
light.position.set(10, 20, 10) // Eleva la luz para que proyecte sombras amplias
light.castShadow = true
light.target.position.set(0, 0, 0) // Asegura que apunte al centro de la escena
scene.add(light)
scene.add(light.target)

const ambientLight = new Three.AmbientLight( 0x404040 )
scene.add( ambientLight )

// Configuración de sombras para la luz direccional
light.shadow.mapSize.width = 4096
light.shadow.mapSize.height = 4096
light.shadow.camera.near = 0.5
light.shadow.camera.far = 100
light.shadow.camera.left = -30
light.shadow.camera.right = 30
light.shadow.camera.top = 30
light.shadow.camera.bottom = -30
light.shadow.bias = -0.002

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
//   ( gltf ) => {
//     model = gltf.scene
//     model.scale.set( 10, 10, 10 )
//     model.position.set( 0, 0, 0 )
//     model.castShadow = true
//     scene.add( model )
//     // carregat
//   },
//   ( xhr ) => {
//     console.log( ( xhr.loaded / xhr.total ) * 100 + "% loaded" )
//     // cada iteracio
//   },
//   ( error ) => {
//     // error
//   }
// )

const system = new Three.Object3D()

// sun
// const sunGeo = new Three.SphereGeometry( 3, 100, 100 )
// const sunMat = new Three.MeshStandardMaterial( { 
//   color: 0xff0000
//  } )
// const sun = new Three.Mesh( sunGeo, sunMat )
// sun.castShadow = true
// sun.add( light )
// sun.add( ambientLight )
// system.add( sun )

let sun = null
modelLoader.load( "models/halloween_pumpkin_tim_burton_style/scene.gltf",
  ( gltf ) => {
    sun = gltf.scene
    sun.scale.set( 4, 4, 4 )
    sun.position.set( 0, 0, 0 )
    sun.castShadow = true
    system.add( sun )
  }
)

// mercury
const mercuryRotation = new Three.Object3D()

// const mercuryGeo = new Three.SphereGeometry( 0.5, 100, 100 )
// const mercuryMat = new Three.MeshStandardMaterial( { 
//   color: 0x9b9b9b
//  } )
// const mercury = new Three.Mesh( mercuryGeo, mercuryMat )
// mercury.castShadow = true
// mercury.position.set( 5, 0, 0 )
// mercuryRotation.add(mercury)

let mercury = null
modelLoader.load( "models/giant_skull_gorilla_tag/scene.gltf",
  ( gltf ) => {
    mercury = gltf.scene
    mercury.scale.set( 0.1, 0.1, 0.1 )
    mercury.position.set( 5, 0, 0 )
    mercury.castShadow = true
    mercuryRotation.add( mercury )
  }
)

system.add(mercuryRotation)

// venus
const venusRotation = new Three.Object3D()

// const venusGeo = new Three.SphereGeometry( 0.9, 100, 100 )
// const venusMat = new Three.MeshStandardMaterial( { 
//   color: 0xa18262
//  } )
// const venus = new Three.Mesh( venusGeo, venusMat )
// venus.castShadow = true
// venus.position.set( 7.2, 0, 0 )
// venusRotation.add(venus)

let venus = null
modelLoader.load( "models/ghost_in_a_white_sheet/scene.gltf",
  ( gltf ) => {
    venus = gltf.scene
    venus.scale.set( 1, 1, 1 )
    venus.position.set( 7.2, 0, 0 )
    venus.castShadow = true
    venusRotation.add( venus )
  }
)

system.add(venusRotation)

// earth
const earthRotation = new Three.Object3D()
const earthPosition = new Three.Object3D()
earthPosition.position.set( 10, 0, 0 )
earthRotation.add(earthPosition)
earthRotation.castShadow = true

// const earthGeo = new Three.SphereGeometry( 1, 100, 100 )
// const earthMat = new Three.MeshStandardMaterial( { 
//   color: 0x0000ff
//  } )
// const earth = new Three.Mesh( earthGeo, earthMat )
// earth.castShadow = true
// earth.receiveShadow = true
// earth.position.set( 10, 0, 0 )
// earthRotation.add( earth )

let earth = null
modelLoader.load( "models/freak_fortress_2_monoculus_rig/scene.gltf",
  ( gltf ) => {
    earth = gltf.scene
    earth.scale.set( 0.3, 0.3, 0.3 )
    earth.castShadow = true
    earth.receiveShadow = true
    earthPosition.add( earth )
  }
)

// moon
const moonRotation = new Three.Object3D()
moonRotation.castShadow = true
earthPosition.add( moonRotation )

// const moonGeo = new Three.SphereGeometry( 0.15, 100, 100 )
// const moonMat = new Three.MeshStandardMaterial( { 
//   color: 0xcfcfcf
//  } )
// const moon = new Three.Mesh( moonGeo, moonMat )
// moon.castShadow = true
// moon.receiveShadow = true
// moon.position.set( 1.5, 0, 0 )
// moonRotation.add( moon )

let moon = null
modelLoader.load( "models/gazing_moon/scene.gltf",
  ( gltf ) => {
    moon = gltf.scene
    moon.scale.set( 0.05, 0.05, 0.05 )
    moon.position.set( 1.5, 0, 0 )
    moon.castShadow = true
    moon.receiveShadow = true
    moonRotation.add( moon )
  }
)

let moon1 = null
modelLoader.load( "models/gazing_moon/scene.gltf",
  ( gltf ) => {
    moon1 = gltf.scene
    moon1.scale.set( 0.05, 0.05, 0.05 )
    moon1.position.set( -1.5, 0, 0 )
    moon1.castShadow = true
    moon1.receiveShadow = true
    moonRotation.add( moon1 )
  }
)

system.add( earthRotation )

// mars
const marsRotation = new Three.Object3D()
marsRotation.castShadow = true

// const marsGeo = new Three.SphereGeometry( 0.7, 100, 100 )
// const marsMat = new Three.MeshStandardMaterial( { 
//   color: 0xfff000
//  } )
// const mars = new Three.Mesh( marsGeo, marsMat )
// mars.castShadow = true
// mars.position.set( 13, 0, 0 )
// marsRotation.add( mars )

let mars = null
modelLoader.load( "models/halloween_pumpkin/scene.gltf",
  ( gltf ) => {
    mars = gltf.scene
    mars.scale.set( 0.7, 0.7, 0.7 )
    mars.position.set( 13, 0, 0 )
    mars.castShadow = true
    mars.receiveShadow = true
    marsRotation.add( mars )
  }
)

system.add( marsRotation )

scene.add( system )

// pla
const plaGeo = new Three.PlaneGeometry( 100, 100 )
const plaMat = new Three.MeshStandardMaterial( { color: 0xffffff,
  side: Three.DoubleSide } )
const pla = new Three.Mesh( plaGeo, plaMat )
pla.position.set( 0, -10, 0 )
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

  sun.rotateY( 0.0001 * daltaTime )
  mercuryRotation.rotateY( 0.0002 * daltaTime )
  mercury.rotateY( 0.0003 * daltaTime )
  venusRotation.rotateY( 0.0003 * daltaTime )
  venus.rotateY( 0.0004 * daltaTime )
  earthRotation.rotateY( 0.0005 * daltaTime )
  earth.rotateY( 0.0006 * daltaTime )
  moonRotation.rotateY( 0.00005 * daltaTime )
  moon.rotateY( 0.0001 * daltaTime )
  moon1.rotateY( 0.0001 * daltaTime )
  marsRotation.rotateY( 0.0004 * daltaTime )
  mars.rotateY( 0.0005 * daltaTime )

  camera.lookAt( system.position )

  renderer.render( scene, camera )
}