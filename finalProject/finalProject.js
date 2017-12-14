
////////////////////////////////////////////////////////////////////////////////
/*global THREE, Coordinates, document, window  */
var camera, scene, renderer, gui;
var stats;
var cameraControls;
var clock = new THREE.Clock();
var cycle = 0;
var scene = new THREE.Scene();
function fillScene() {
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x808080, 2000, 4000 );

	// LIGHTS

	scene.add( new THREE.AmbientLight( 0x222222 ) );

	//var light = new THREE.DirectionalLight( 0xffffff, 0.7 );
	//light.position.set( 200, 500, 500 );

	//scene.add( light );

	//light = new THREE.DirectionalLight( 0xffffff, 0.9 );
	//light.position.set( -200, -100, -400 );

	//scene.add( light );

//grid xz
 var gridXZ = new THREE.GridHelper(2000, 100, new THREE.Color(0xCCCCCC), new THREE.Color(0x888888));
 scene.add(gridXZ);

// gui
	
	gui = new dat.GUI({
		autoPlace: false,
    height : (32 * 3)- 1
	});

  params = {
		size: 300,
		//bend: 0,
		//grab: 0
  };
  
	gui.add(params, 'size').min(150).max(400).step(10).name('size').listen().onChange(function (value){	
    emitter.size.value[ 0 ] = value;
    emitter.size.value = emitter.size.value;
	});
	//gui.add(params, 'bend').min(-90).max(90).step(10).name('bend');
	//gui.add(params, 'grab').min(0).max(30).step(1).name('grab');
	gui.domElement.style.position = "relative";
	gui.domElement.style.top = "-400px";
	gui.domElement.style.left = "350px";


 //axes
 var axes = new THREE.AxisHelper(150);
 axes.position.y = 1;
 scene.add(axes);

	scene.background = new THREE.CubeTextureLoader()
		.setPath( '' )
		.load( [
			'sky-xneg.png',
			'sky-xpos.png',
			'sky-yneg.png',
			'sky-ypos.png',
			'sky-zneg.png',
			'sky-zpos.png'
		] );
 drawFire();
}

function drawFire() {	
	// materials
	var woodMaterial = new THREE.MeshPhongMaterial();
	woodMaterial.color.setHex(0x4f3100);	
	var burningWoodMaterial = new THREE.MeshPhongMaterial();
	burningWoodMaterial.color.setRGB( 0, 0, 1 );	
	var stoneMaterial = new THREE.MeshPhongMaterial();
	stoneMaterial.color.setRGB( 0.0, 0.1, 0.4 );	

	//objects
	var log1, log2, log3, burningLog1, burningLog2, burningLog3, stone;
	
	log1 = new THREE.Mesh(
		new THREE.CylinderGeometry(25, 25, 120, 8, 15, false), woodMaterial);
	log1.position.x = 200;
	log1.position.y = 20;
	log1.position.z = 200;
	log1.rotation.x = Math.PI/2;
	log1.rotation.z = Math.PI/2;
	scene.add(log1);
	
	burningLog1 = new THREE.Mesh(
		new THREE.CylinderGeometry(25, 25, 250, 8, 15, false), burningWoodMaterial);
	burningLog1.position.x = 40;
	burningLog1.position.y = 70;
	burningLog1.position.z = 0;
	//burningLog1.rotation.x = Math.PI/3;
	//burningLog1.rotation.z = Math.PI/2;
	//burningLog1.rotation.y = Math.PI/2;
	scene.add(burningLog1);

	burningLog2= new THREE.Mesh(
		new THREE.CylinderGeometry(25, 25, 250, 8, 15, false), burningWoodMaterial);
	burningLog2.position.x = 25;
	burningLog2.position.y = 70;
	burningLog2.position.z = 40;
	//burningLog1.rotation.x = Math.PI/3;
	//burningLog1.rotation.z = Math.PI/2;
	//burningLog1.rotation.y = Math.PI/2;
	scene.add(burningLog2);

	burningLog3 = new THREE.Mesh(
		new THREE.CylinderGeometry(25, 25, 250, 8, 15, false), burningWoodMaterial);
	burningLog3.position.x = -30;
	burningLog3.position.y = 70;
	burningLog3.position.z = -30;
	//burningLog1.rotation.x = Math.PI/3;
	//burningLog1.rotation.z = Math.PI/2;
	//burningLog1.rotation.y = Math.PI/2;
	scene.add(burningLog3);
	group = new SPE.Group( {
                    // Possible API for animated textures...
	texture: {
    value: THREE.ImageUtils.loadTexture( './img/sprite-flame2.jpg' ),
    frames: new THREE.Vector2( 8, 4 ),
    // frameCount: 8,
    loop: 2
  },

  depthTest: true,
  scale: window.innerHeight / 2.0
} ),

emitter = new SPE.Emitter( {
  particleCount: 200,
  maxAge: {
		value: 2,
    spread: 0
  },
  position: {
    value: new THREE.Vector3( 0, 130, 0 ),
    spread: new THREE.Vector3( 10, 0, 0 ),
    spreadClamp: new THREE.Vector3( 0, 0, 0 ),
    distribution: SPE.distributions.BOX,
    randomise: false
  },
  radius: {
  value: 5,
  spread: 20,
  scale: new THREE.Vector3( 1, 1, 1 ),
  spreadClamp: new THREE.Vector3( 2, 2, 2 ),
  },
  velocity: {
    value: new THREE.Vector3( 0, 0, 0 ),
    spread: new THREE.Vector3( 0, 0, 0 ),
    // distribution: SPE.distributions.BOX,
    randomise: false
  },
  acceleration: {
    value: new THREE.Vector3( 0, 0, 0 ),
    spread: new THREE.Vector3( 0, 0, 0 ),
    // distribution: SPE.distributions.BOX,
    randomise: false
  },
  drag: {
    value: 0.5,
    spread: 0
  },
  wiggle: {
    value: 0,
    spread: 0
  },
  rotation: {
    axis: new THREE.Vector3( 0, 1, 0 ),
    axisSpread: new THREE.Vector3( 0, 0, 0 ),
    angle:  0, // radians
    angleSpread: 0, // radians
    static: false,
    center: new THREE.Vector3( 0, 0, 0 )
  },
  size: {
    value: 300,
    spread: 0
  },
  opacity: {
  value: 0.02
  },
  angle: {
		value: 0,
    spread: 0
  }
});

group.addEmitter( emitter );
scene.add( group.mesh );
camera.position.z = 50;
camera.position.y = 0;
camera.lookAt( scene.position );


	
//renderer.setClearColor( 0x222222, 0.1 );
//renderer.setSize( window.innerWidth, window.innerHeight );
//document.body.appendChild( renderer.domElement );
//document.body.appendChild( stats.domElement );
}	


function init() {
	var canvasWidth = 600;
	var canvasHeight = 400;
	var canvasRatio = canvasWidth / canvasHeight;
  stats = new Stats(),

	// RENDERER
	renderer = new THREE.WebGLRenderer( { antialias: true } );	
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColor( 0xAAAAAA, 1.0 );

	// CAMERA
	camera = new THREE.PerspectiveCamera( 45, canvasRatio, 1, 4000 );
	console.log("super new camera");
  //camera = new THREE.PerspectiveCamera( 64, window.innerWidth / window.innerHeight, 0.1, 10000 ),
	// CONTROLS
	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	camera.position.set( -800, 600, -500);
	cameraControls.target.set(4,301,92);
}

function addToDOM() {
    var canvas = document.getElementById('canvas');
    canvas.appendChild(renderer.domElement);
    canvas.appendChild(gui.domElement);
}

function animate() {
	window.requestAnimationFrame(animate);
	render();
}

function render() {
	var delta = clock.getDelta();
	group.tick(delta);
	cameraControls.update(delta);
	renderer.render(scene, camera);
}

function onAnimate() {
	// get rid of the date.now
	var now = Date.now() * 0.001;
	camera.position.x = Math.sin( now ) * 100;
	camera.position.z = Math.cos( now ) * 100;
	camera.lookAt( scene.position );
}

try {
  init();
  fillScene();
  addToDOM();
  animate();
} catch(error) {
    console.log("Your program encountered an unrecoverable error, can not draw on canvas. Error was:");
    console.log(error);
}
