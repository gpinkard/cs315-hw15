
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

	var light = new THREE.DirectionalLight( 0xffffff, 0.7 );
	light.position.set( 200, 500, 500 );

	scene.add( light );

	light = new THREE.DirectionalLight( 0xffffff, 0.9 );
	light.position.set( -200, -100, -400 );

	scene.add( light );

// gui
	
	gui = new dat.GUI({
		autoPlace: false,
    height : (32 * 3)- 1
	});

  params = {
		flameSize: 400,
		smokeHeight: 300,
		smokeDensity: 200 
		//bend: 0,
		//grab: 0
  };
  
	gui.add(params, 'flameSize').min(0).max(600).step(10).name('flameSize').listen().onChange(function (value){	
    emitter.size.value[ 0 ] = value;
    emitter.size.value = emitter.size.value;
	});
	gui.add(params, 'smokeHeight').min(200).max(600).step(10).name('smokeHeight').listen().onChange(function (value){	
    smokeEmitter.position.spread.setY(value);
    smokeEmitter.position.spread = smokeEmitter.position.spread;
	});
	gui.add(params, 'smokeDensity').min(0).max(500).step(10).name('smokeDensity').listen().onChange(function (value){	
    smokeEmitter.size.value = value;
    smokeEmitter.size.value = smokeEmitter.size.value;
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
			'0003.png',
			'0004.png',
			'0006.png',
			'0005.png',
			'0002.png',
			'0001.png'
		] );
 drawFire();
}

function drawFire() {	
	// materials
	var loader = new THREE.TextureLoader();
	// burning texture
	var burningTexture = loader.load( './img/burningWoodTexture.png', render );
	burningTexture.wrapS = burningTexture.wrapT = THREE.RepeatWrapping;
	burningTexture.matrixAutoUpdate = false; // set this to false to update texture.matrix manually
	var burningWoodMaterial = new THREE.MeshPhongMaterial( { map : burningTexture, side: THREE.DoubleSide} );	
	
	var woodTexture = loader.load('./img/woodTexture.png', render );
	woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
	woodTexture.matrixAutoUpdate = false; // set this to false to update texture.matrix manually
	var woodMaterial = new THREE.MeshPhongMaterial({map : woodTexture});
	
	//var stoneMaterial = new THREE.MeshPhongMaterial();
	var stoneTexture = loader.load('./img/stoneTexture.jpg', render );
	stoneTexture.wrapS = stoneTexture.wrapT = THREE.RepeatWrapping;
	stoneTexture.matrixAutoUpdate = false; // set this to false to update texture.matrix manually
	var stoneMaterial= new THREE.MeshPhongMaterial({map : stoneTexture});
	//stoneMaterial.color.setRGB( 0.0, 0.1, 0.4 );	
	
	var firePitTexture = loader.load('./img/firePitTexture.jpg', render);
	firePitTexture.wrapS = firePitTexture.wrapT = THREE.RepeatWrapping;
	firePitTexture.matrixAutoAupdate = false;
	var firePitMaterial = new THREE.MeshPhongMaterial({map : firePitTexture, side: THREE.DoubleSide});

	var groundTexture = loader.load('./img/groundTexture.jpg', render);
	groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
	groundTexture.matrixAutoAupdate = false;
	var groundMaterial = new THREE.MeshPhongMaterial({map : groundTexture, side: THREE.DoubleSide});

	//objects
	var log1, log2, log3, burningLog1, burningLog2, burningLog3, burningLog4, burningLogSmall1;
	var stone1, stone2, stone3, stone4, stone5, stone6, stone7, stone8, stone9, stone10, stone11;	
	var stone12, stone13, stone14, stone15, stone16, stone17, stone18;
	var firePit, ground;

	var manager = new THREE.LoadingManager();
		manager.onProgress = function ( item, loaded, total ) {
			console.log( item, loaded, total );
		};
		var objectLoader = new THREE.OBJLoader( manager );
		objectLoader.load( 'rock.obj', function ( object ) {
		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = stoneTexture;
			}
		} );
			object.scale.x = 20;
			object.scale.y = 20;
			object.scale.z = 20;
			object.position.x = 125;
			object.position.y = -10;
			object.position.z = 50;
			stone1 = object
			scene.add( stone1 );
	} );	

		objectLoader.load( 'rock.obj', function ( object ) {
		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = stoneTexture;
			}
		} );
			object.scale.x = 20;
			object.scale.y = 20;
			object.scale.z = 20;
			object.position.x = 125;
			object.position.y = -10;
			object.position.z = -50;
			stone2 = object
			scene.add( stone2 );
	} );	

		objectLoader.load( 'rock.obj', function ( object ) {
		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = stoneTexture;
			}
		} );
			object.scale.x = 20;
			object.scale.y = 20;
			object.scale.z = 20;
			object.position.x = 140;
			object.position.y = -10;
			object.position.z = 0;
			stone3 = object
			scene.add( stone3 );
	} );	

		objectLoader.load( 'rock.obj', function ( object ) {
		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = stoneTexture;
			}
		} );
			object.scale.x = 20;
			object.scale.y = 20;
			object.scale.z = 20;
			object.position.x = 100;
			object.position.y = -10;
			object.position.z = 100;
			stone4 = object
			scene.add( stone4 );
	} );	


		objectLoader.load( 'rock.obj', function ( object ) {
		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = stoneTexture;
			}
		} );
			object.scale.x = 20;
			object.scale.y = 20;
			object.scale.z = 20;
			object.position.x = 55;
			object.position.y = -10;
			object.position.z = 120;
			stone5 = object
			scene.add( stone5 );
	} );	

		objectLoader.load( 'rock.obj', function ( object ) {
		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = stoneTexture;
			}
		} );
			object.scale.x = 20;
			object.scale.y = 20;
			object.scale.z = 20;
			object.position.x = 110;
			object.position.y = -10;
			object.position.z = -100;
			stone6 = object
			scene.add( stone6 );
	} );	


		objectLoader.load( 'rock.obj', function ( object ) {
		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = stoneTexture;
			}
		} );
			object.scale.x = 20;
			object.scale.y = 20;
			object.scale.z = 20;
			object.position.x = 30;
			object.position.y = -10;
			object.position.z = -125;
			stone7 = object
			scene.add( stone7 );
	} );	


		objectLoader.load( 'rock.obj', function ( object ) {
		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = stoneTexture;
			}
		} );
			object.scale.x = 20;
			object.scale.y = 20;
			object.scale.z = 20;
			object.position.x = -85;
			object.position.y = -10;
			object.position.z = 100;
			stone9 = object
			scene.add( stone9 );
	} );	


		objectLoader.load( 'rock.obj', function ( object ) {
		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = stoneTexture;
			}
		} );
			object.scale.x = 20;
			object.scale.y = 20;
			object.scale.z = 20;
			object.position.x = -100;
			object.position.y = -10;
			object.position.z = 55;
			stone10 = object
			scene.add( stone10 );
	} );	


		objectLoader.load( 'rock.obj', function ( object ) {
		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = stoneTexture;
			}
		} );
			object.scale.x = 20;
			object.scale.y = 20;
			object.scale.z = 20;
			object.position.x = -10;
			object.position.y = -10;
			object.position.z = -120;
			stone11 = object
			scene.add( stone11 );
	} );	


		objectLoader.load( 'rock.obj', function ( object ) {
		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = stoneTexture;
			}
		} );
			object.scale.x = 20;
			object.scale.y = 20;
			object.scale.z = 20;
			object.position.x = -60;
			object.position.y = -10;
			object.position.z = -120;
			stone12 = object
			scene.add( stone12 );
	} );	


		objectLoader.load( 'rock.obj', function ( object ) {
		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = stoneTexture;
			}
		} );
			object.scale.x = 20;
			object.scale.y = 20;
			object.scale.z = 20;
			object.position.x = -100;
			object.position.y = -10;
			object.position.z = -80;
			stone13 = object
			scene.add( stone13 );
	} );	


		objectLoader.load( 'rock.obj', function ( object ) {
		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = stoneTexture;
			}
		} );
			object.scale.x = 20;
			object.scale.y = 20;
			object.scale.z = 20;
			object.position.x = -110;
			object.position.y = -10;
			object.position.z = -30;
			stone14 = object
			scene.add( stone14);
	} );	


		objectLoader.load( 'rock.obj', function ( object ) {
		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = stoneTexture;
			}
		} );
			object.scale.x = 20;
			object.scale.y = 20;
			object.scale.z = 20;
			object.position.x = -40;
			object.position.y = -10;
			object.position.z = 120;
			stone15 = object
			scene.add( stone15 );
	} );	


		objectLoader.load( 'rock.obj', function ( object ) {
		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = stoneTexture;
			}
		} );
			object.scale.x = 20;
			object.scale.y = 20;
			object.scale.z = 20;
			object.position.x = 5;
			object.position.y = -10;
			object.position.z = 130;
			stone16 = object
			scene.add( stone16 );
	} );	


		objectLoader.load( 'rock.obj', function ( object ) {
		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = stoneTexture;
			}
		} );
			object.scale.x = 20;
			object.scale.y = 20;
			object.scale.z = 20;
			object.position.x = 70;
			object.position.y = -10;
			object.position.z = -120;
			stone17 = object
			scene.add( stone17 );
	} );	


		objectLoader.load( 'rock.obj', function ( object ) {
		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = stoneTexture;
			}
		} );
			object.scale.x = 20;
			object.scale.y = 20;
			object.scale.z = 20;
			object.position.x = -110;
			object.position.y = -10;
			object.position.z = 5;
			stone18 = object
			scene.add( stone18 );
	} );	

	objectLoader.load('teapot.obj', function (object) {
		object.traverse(function (child) {
			if(child instanceof THREE.Mesh ){
			child.material.map = stoneTexture;
			};
		});
		object.scale.x = 0.8;
		object.scale.y = 0.8;
		object.scale.z = 0.8;
		object.position.x = 0;
		object.position.y = 300;
		object.position.x = 0;
		var teapot = object;
		scene.add(teapot);
	});

	firePit = new THREE.Mesh(
		new THREE.PlaneGeometry(220, 220, 10 ), burningWoodMaterial);
	firePit.position.x = 4;
	firePit.position.y = 8;
	firePit.position.z = 0;
	//firePit.rotation.z = Math.PI/2;
	firePit.rotation.x = Math.PI/2;
	scene.add(firePit);

	ground = new THREE.Mesh(
		new THREE.PlaneGeometry(1600,1600,10), groundMaterial);
	ground.position.x = 0;
	ground.position.y = 5;
	ground.position.z = 0;
	ground.rotation.x = Math.PI/2;
	scene.add(ground);

	log1 = new THREE.Mesh(
		new THREE.CylinderGeometry(25, 25, 160, 8, 15, false), woodMaterial);
	log1.position.x = 230;
	log1.position.y = 20;
	log1.position.z = 260;
	log1.rotation.z = Math.PI/2;
	log1.rotation.x = Math.PI/2;
	scene.add(log1);


	log2 = new THREE.Mesh(
		new THREE.CylinderGeometry(25, 25, 160, 8, 15, false), woodMaterial);
	log2.position.x = 200;
	log2.position.y = 20;
	log2.position.z = 208;
	log2.rotation.z = Math.PI/2;
	log2.rotation.x = Math.PI/2;
	scene.add(log2);
	
	log3 = new THREE.Mesh(
		new THREE.CylinderGeometry(25, 25, 160, 8, 15, false), woodMaterial);
	log3.position.x = 210;
	log3.position.y = 60;
	log3.position.z = 230;
	log3.rotation.z = Math.PI/2;
	log3.rotation.x = Math.PI/2;
	scene.add(log3);

	pole1 = new THREE.Mesh(
		new THREE.CylinderGeometry(10,10,440,10,15,false), woodMaterial);
	pole1.position.x = 140;
	pole1.position.y = 170;
	pole1.position.z = 70;
	scene.add(pole1);

	pole2 = new THREE.Mesh(
		new THREE.CylinderGeometry(10,10,440,10,15,false), woodMaterial);
	pole2.position.x = -140;
	pole2.position.y = 170;
	pole2.position.z = -70;
	scene.add(pole2);

	pole3 = new THREE.Mesh(
		new THREE.CylinderGeometry(6, 6,350,10,15,false), woodMaterial);
	pole3.position.x = 0;
	pole3.position.y = 360;
	pole3.position.z = 0;
	pole3.rotation.y = -9.9;
	pole3.rotation.z = Math.PI/2;
	scene.add(pole3);
	
	burningLog1 = new THREE.Mesh(
		new THREE.CylinderGeometry(25, 25, 250, 8, 15, false), burningWoodMaterial);
	burningLog1.position.x = 40;
	burningLog1.position.y = 100;
	burningLog1.position.z = 40;
	burningLog1.rotation.z = 16;
	burningLog1.rotation.y = -13.5;
	//burningLog1.rotation.x = 15.5;
	scene.add(burningLog1);

	burningLog2= new THREE.Mesh(
		new THREE.CylinderGeometry(25, 25, 250, 8, 15, false), burningWoodMaterial);
	burningLog2.position.x = 40;
	burningLog2.position.y = 100;
	burningLog2.position.z = -40;
	burningLog2.rotation.z = 16;
	burningLog2.rotation.y = 13.5;
	//burningLog2.rotation.x = -15.5;
	scene.add(burningLog2);

	burningLog3 = new THREE.Mesh(
		new THREE.CylinderGeometry(25, 25, 250, 8, 15, false), burningWoodMaterial);
	burningLog3.position.x = -40;
	burningLog3.position.y = 100;
	burningLog3.position.z = 40;
	burningLog3.rotation.z = -16;
	burningLog3.rotation.y = 13.5;
	scene.add(burningLog3);

	burningLog4 = new THREE.Mesh(
		new THREE.CylinderGeometry(25, 25, 250, 8, 15, false), burningWoodMaterial);
	burningLog4.position.x = -40;
	burningLog4.position.y = 100;
	burningLog4.position.z = -40;
	burningLog4.rotation.z = -16;
	burningLog4.rotation.y = -13.5;
	scene.add(burningLog4);

	burningLogSmall1 = new THREE.Mesh(
		new THREE.CylinderGeometry(35, 35, 100, 8, 10, false), burningWoodMaterial);
	burningLogSmall1.position.x = 0;
	burningLogSmall1.position.y = 20;
	burningLogSmall1.position.z = 0;
	burningLogSmall1.rotation.x = Math.PI/2;
	burningLogSmall1.rotation.z = Math.PI/2;
	scene.add(burningLogSmall1);
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
    value: new THREE.Vector3( 0, 180, 0 ),
    spread: new THREE.Vector3(0, 200, 0 ),
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

smokeGroup = new SPE.Group({
	texture: {
    value: THREE.ImageUtils.loadTexture( './img/cloudSml.png' ),
  },
  blending: THREE.NormalBlending
});

smokeEmitter = new SPE.Emitter({

    maxAge: { value: 1 },
    position: { 
        value: new THREE.Vector3( 0, 300, 0 ),
        spread: new THREE.Vector3( 30, 300, 30),
				distribution: SPE.distributions.BOX,
				randomise: false
    },
    size: {
				value: 200,
				spread: 10
    },
    acceleration: {
        value: new THREE.Vector3( 0, 0, 0 ),
    },
    rotation: {
        axis: new THREE.Vector3( 0, 1, 0 ),
        spread: new THREE.Vector3( 0, 0, 0 ),
        angle: 100 * Math.PI / 180,
    },
    velocity: {
        value: new THREE.Vector3( 0, 20, 0.5 ),
        spread: new THREE.Vector3( 0.25, 0.5, 0.25 )
    },
    opacity: {
        value: [ 0.2, 0.5, 0 ]
    },
    color: {
        value: [ new THREE.Color( 0x625e5e), new THREE.Color( 0x111111 ) ],
        spread: [ new THREE.Vector3( 0.2, 0.1, 0.1 ), new THREE.Vector3( 0, 0, 0 ) ]
    },
    particleCount: 50,
});

smokeGroup.addEmitter(smokeEmitter);
group.addEmitter( emitter );
scene.add( group.mesh );
scene.add(smokeGroup.mesh);
camera.position.z = 350;
camera.position.y = 400;
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
	smokeGroup.tick(delta);
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
