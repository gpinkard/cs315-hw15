////////////////////////////////////////////////////////////////////////////////
/*global THREE, Coordinates, document, window  */
var camera, scene, renderer, gui;
var cameraControls;
var swivelRot1, swivelRot2, bendRot1, bendRot2, grabRot1, grabRot2, everything;
var legRot1, legRot2;
var clock = new THREE.Clock();
var cycle = 0;
var keyBoard = new KeyboardState();
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

//grid xz
 var gridXZ = new THREE.GridHelper(2000, 100, new THREE.Color(0xCCCCCC), new THREE.Color(0x888888));
 scene.add(gridXZ);

// gui
	
	gui = new dat.GUI({
		autoPlace: false,
    height : (32 * 3)- 1
	});

  params = {
		swivel: 0,
		bend: 0,
		grab: 0
  };
  
	gui.add(params, 'swivel').min(-90).max(90).step(10).name('swivel');
	gui.add(params, 'bend').min(-90).max(90).step(10).name('bend');
	gui.add(params, 'grab').min(0).max(30).step(1).name('grab');
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
 drawRobot();
}

function drawRobot() {

	/// ANIMATIONS ///
	
	everything = new THREE.Object3D();
	swivelRot1 = new THREE.Object3D();
	swivelRot2 = new THREE.Object3D();
	bendRot1 = new THREE.Object3D();
	bendRot2 = new THREE.Object3D();
	grabRot1 = new THREE.Object3D();
	grabRot2 = new THREE.Object3D();
	legRot1 = new THREE.Object3D();
	legRot2 = new THREE.Object3D();

	//////////////////////////////
	// MATERIALS

	var bodyMaterial = new THREE.MeshPhongMaterial();
	bodyMaterial.color.setRGB( 0.0, 0.1, 0.4 );
	var eyeMaterial = new THREE.MeshPhongMaterial();
	eyeMaterial.color.setRGB(0.1, 0.3, 0.9);
	var pupilMaterial = new THREE.MeshPhongMaterial();
	pupilMaterial.color.setRGB(0.0, 0.0, 0.0);
	var redMaterial = new THREE.MeshLambertMaterial();
	redMaterial.color.setRGB(0.3, 0.0, 0.0);
	var mirrorMaterial = new THREE.MeshBasicMaterial( { color: 0xad00fd, envMap: scene.background } );
	var glassMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, transparent: true, opacity: 0.2}); 

	//// MODELS ////
	var head, body;
	var eye1, eye2, pupil1, pupil2, glassEye1, glassEye2;
	var mouthShape, extrudeMouth;
	var legConnector1, legConnector2;
	var femur1, femur2, tibia1, tibia2;
	var knee1, knee2, foot1, foot2, ankle1, ankle2;
	var armConnector1, armConnector2;
	var shoulderConnector, shoulder1, shoulder2;
	var humerus1, humerus2, forarm1, forarm2;
	var clawShape;
	var elbow1, elbow2, wrist1, wrist2;
	var extrudeClawR1, extrudeClawL1, extrudeClawR2, extrudeClawL2;
	var antenna, antennaConnector, antennaTip, antennaGlassTip;

	antennaConnector = new THREE.Mesh(
		new THREE.TorusGeometry(10, 10, 20, 20, 2 * Math.PI), pupilMaterial);
	antennaConnector.position.x = 0;
	antennaConnector.position.y = 425;
	antennaConnector.position.z = 0;
	antennaConnector.rotation.x = Math.PI/2;
	scene.add( antennaConnector );

	antenna = new THREE.Mesh(
		new THREE.CylinderGeometry(5, 5, 110, 20, 35, false), eyeMaterial);
	antenna.position.x = 0;
	antenna.position.y = 470;
	antenna.position.z = 0;
	scene.add( antenna );

	var antennaTip = new THREE.Mesh(
		new THREE.SphereGeometry(12, 10, 10, 0, (2 * Math.PI), 0, Math.PI), redMaterial);
	antennaTip.position.x = 0;
	antennaTip.position.y = 520;
	antennaTip.position.z = 0;
	scene.add( antennaTip);

	antennaGlassTip = new THREE.Mesh(
		new THREE.SphereGeometry(55, 10, 10, 0, (2 * Math.PI), 0, Math.PI), glassMaterial);
	antennaGlassTip.position.x = 0;
	antennaGlassTip.position.y = 520;
	antennaGlassTip.position.z = 0;
	scene.add( antennaGlassTip );

	body = new THREE.Mesh(
		new THREE.BoxGeometry(110, 90, 90), bodyMaterial);
	body.position.x = 0;
	body.position.y = 330;
	body.position.z = 0;
	scene.add( body );
	
	head = new THREE.Mesh(
		new THREE.BoxGeometry(170, 100, 90), bodyMaterial);
	head.position.x = 0;
	head.position.y = 375;
	head.position.z = 0;
	scene.add( head );

	/// ARMS ///

	armConnector1 = new THREE.Mesh(
		new THREE.TorusGeometry(20, 10, 20, 20, 2 * Math.PI), bodyMaterial);
	armConnector1.position.x = 90;
	armConnector1.position.y = 360;
	armConnector1.position.z = 0;
	armConnector1.rotation.y = Math.PI/2
	scene.add( armConnector1 );

	armConnector2 = new THREE.Mesh(
		new THREE.TorusGeometry(20, 10, 20, 20, 2 * Math.PI), bodyMaterial);
	armConnector2.position.x = -90;
	armConnector2.position.y = 360;
	armConnector2.position.z = 0;
	armConnector2.rotation.y = Math.PI/2
	scene.add( armConnector2 );
	
	shoulderConnector = new THREE.Mesh(
		new THREE.CylinderGeometry(12, 12, 220, 20, 1, false), eyeMaterial);
	shoulderConnector.position.x = 0;
	shoulderConnector.position.y = 360;
	shoulderConnector.position.z = 0;
	shoulderConnector.rotation.x = Math.PI/2;
	shoulderConnector.rotation.z = Math.PI/2;
	scene.add( shoulderConnector );

	shoulder1 = new THREE.Mesh(
		new THREE.CylinderGeometry(15, 15, 30, 20, 1, false), bodyMaterial);
	shoulder1.position.x = 120;
	shoulder1.position.y = 360;
	shoulder1.position.z = 0;
	//shoulder1.rotation.x = Math.PI/2;
	//shoulder1.rotation.y = Math.PI/2;
	scene.add( shoulder1 );

	shoulder2 = new THREE.Mesh(
		new THREE.CylinderGeometry(15, 15, 30, 20, 1, false), bodyMaterial);
	shoulder2.position.x = -120;
	shoulder2.position.y = 360;
	shoulder2.position.z = 0;
	scene.add( shoulder2 );

	humerus1 = new THREE.Mesh(
		new THREE.CylinderGeometry(10, 10, 160, 20, 1, false), eyeMaterial);
	humerus1.position.x = 0;
	humerus1.position.y = -50;
	humerus1.position.z = 0;
	//scene.add( humerus1 );

	humerus2 = new THREE.Mesh(
		new THREE.CylinderGeometry(10, 10, 160, 20, 1, false), eyeMaterial);
	humerus2.position.x = 0;
	humerus2.position.y = -50;
	humerus2.position.z = 0;
	//scene.add( humerus2 );

	elbow1 = new THREE.Mesh(
		new THREE.CylinderGeometry(20, 20, 20, 20, 1, false), bodyMaterial);
	elbow1.position.x = 0;
	elbow1.position.y = 0;
	elbow1.position.z = 0;
	elbow1.rotation.x = Math.PI/2;
	elbow1.rotation.z = Math.PI/2;
	//scene.add( elbow1 );

	elbow2 = new THREE.Mesh(
		new THREE.CylinderGeometry(20, 20, 20, 20, 1, false), bodyMaterial);
	elbow2.position.x = 0;
	elbow2.position.y = 0;
	elbow2.position.z = 0;
	elbow2.rotation.x = Math.PI/2;
	elbow2.rotation.z = Math.PI/2;
	//scene.add( elbow2 );

	forarm1 = new THREE.Mesh(
		new THREE.CylinderGeometry(10, 10, 90, 20, 1, false), eyeMaterial);
	forarm1.position.x = 0;
	forarm1.position.y = -40;
	forarm1.position.z = 0;
	//scene.add( forarm1 );

	forarm2 = new THREE.Mesh(
		new THREE.CylinderGeometry(10, 10, 90, 20, 1, false), eyeMaterial);
	forarm2.position.x = 0;
	forarm2.position.y = -40;
	forarm2.position.z = 0;
	//scene.add( forarm2 );

	wrist1 = new THREE.Mesh(
		new THREE.CylinderGeometry(15, 15, 20, 20, 1, false), bodyMaterial);
	wrist1.position.x = 0;
	wrist1.position.y = -90;
	wrist1.position.z = 0;
	wrist1.rotation.x = Math.PI/2;
	//scene.add( wrist1 );

	wrist2 = new THREE.Mesh(
		new THREE.CylinderGeometry(15, 15, 20, 20, 1, false), bodyMaterial);
	wrist2.position.x = 0;
	wrist2.position.y = -90;
	wrist2.position.z = 0;
	wrist2.rotation.x = Math.PI/2;
	//scene.add( wrist2 );

	var options = {
		amount: 10,
		bevelThickness: 2,
		bevelSize: 1,
		bevelSegments: 3,
		bevelEnabled: true,
		curveSegments: 12,
		steps: 1,
		material: eyeMaterial
	};

	var mouthOptions = {
		amount: 3,
		bevelThickness: 1,
		bevelSize: 1,
		bevelSegments: 1,
		bevelEnabled: true,
		steps: 1,
		material: eyeMaterial
	}

	/// MOUTH ///
	extrudeMouth = new THREE.Mesh(
		new THREE.ExtrudeGeometry(drawMouth(), mouthOptions));
	extrudeMouth.position.x = 40;
	extrudeMouth.position.y = 300;
	extrudeMouth.position.z = -50;
	extrudeMouth.rotation.z = Math.PI/2;
	extrudeMouth.material = pupilMaterial;
	scene.add( extrudeMouth );

	/// CLAWS ///
	extrudeClawR1 = new THREE.Mesh(
		new THREE.ExtrudeGeometry(drawClaw(), options));
	extrudeClawR1.position.x = 5;
	extrudeClawR1.position.y = 150;
	extrudeClawR1.position.z = 5;
	extrudeClawR1.rotation.y = Math.PI;
	extrudeClawR1.rotation.z = Math.PI * 1.5;
	extrudeClawR1.material = pupilMaterial;
	//scene.add( extrudeClawR1 );

	extrudeClawL1 = new THREE.Mesh(
		new THREE.ExtrudeGeometry(drawClaw(), options));
	extrudeClawL1.position.x = -5;
	extrudeClawL1.position.y = -80;
	extrudeClawL1.position.z = -5;
	extrudeClawL1.rotation.z = Math.PI * 1.5;
	extrudeClawL1.material = pupilMaterial;
	//scene.add( extrudeClawL1 );

	extrudeClawR2 = new THREE.Mesh(
		new THREE.ExtrudeGeometry(drawClaw(), options));
	extrudeClawR2.position.x = 5;
	extrudeClawR2.position.y = 150;
	extrudeClawR2.position.z = 5;
	extrudeClawR2.rotation.y = Math.PI;
	extrudeClawR2.rotation.z = Math.PI * 1.5;
	extrudeClawR2.material = pupilMaterial;
	//scene.add( extrudeClawR2 );

	extrudeClawL2 = new THREE.Mesh(
		new THREE.ExtrudeGeometry(drawClaw(), options));
	extrudeClawL2.position.x = -5;
	extrudeClawL2.position.y = -80;
	extrudeClawL2.position.z = -5;
	extrudeClawL2.rotation.z = Math.PI * 1.5;
	extrudeClawL2.material = pupilMaterial;
	//scene.add( extrudeClawL2 );

	/// EYES///

	eye1 = new THREE.Mesh(
		new THREE.TorusGeometry(20, 5, 3, 20, 2 * Math.PI), pupilMaterial );
	eye1.position.x = 40;
	eye1.position.y = 370;
	eye1.position.z = -50;
	//eye1.rotation.z = Math.PI/2;
	//eye1.rotation.y = Math.PI/2;
	scene.add( eye1 );

	eye2 = new THREE.Mesh(
		new THREE.TorusGeometry(20, 5, 3, 20, 2 * Math.PI), pupilMaterial);
	eye2.position.x = -40;	
	eye2.position.y = 370;
	eye2.position.z = -50;
	scene.add( eye2 );
	
	pupil1 = new THREE.Mesh(
		new THREE.CircleGeometry(20, 20, 0, 2 * Math.PI), mirrorMaterial); // HERE!
	pupil1.position.x = 40;
	pupil1.position.y = 370;
	pupil1.position.z = -57; 
	pupil1.rotation.y = Math.PI;
	scene.add( pupil1 );

	pupil2 = new THREE.Mesh(
		new THREE.CircleGeometry(20, 20, 0, 2 * Math.PI), mirrorMaterial);
	pupil2.position.x = -40;
	pupil2.position.y = 370;
	pupil2.position.z = -57;
	pupil2.rotation.y = Math.PI;
	scene.add( pupil2 );

	/// LEGS ///

	legConnector1 = new THREE.Mesh(
		new THREE.SphereGeometry(15, 10, 10, 0, (2 * Math.PI), 0, Math.PI), bodyMaterial);
	legConnector1.position.x = 40;
	legConnector1.position.y = 280;
	legConnector1.position.z = 0;
	scene.add( legConnector1 );

	legConnector2 = new THREE.Mesh(
		new THREE.SphereGeometry(15, 10, 10, 0, (2 * Math.PI), 0, Math.PI), bodyMaterial);
	legConnector2.position.x = -40;
	legConnector2.position.y = 280;
	legConnector2.position.z = 0;
	scene.add( legConnector2 );

	femur1 = new THREE.Mesh(
		new THREE.CylinderGeometry(10, 10, 130, 20, 35, false), eyeMaterial);
	femur1.position.x = 0;
	femur1.position.y = -60;
	femur1.position.z = 0;

	femur2 = new THREE.Mesh(
		new THREE.CylinderGeometry(10, 10, 130, 20, 35, false), eyeMaterial);
	femur2.position.x = 0;
	femur2.position.y = -60;
	femur2.position.z = 0;

	knee1 = new THREE.Mesh(
		new THREE.CylinderGeometry(20, 20, 20, 20, 1, false), bodyMaterial);
	knee1.position.x = 0;
	knee1.position.y = -130;
	knee1.position.z = 0;
	knee1.rotation.x = Math.PI/2;
	knee1.rotation.z = Math.PI/2;

	knee2 = new THREE.Mesh(
		new THREE.CylinderGeometry(20, 20, 20, 20, 1, false), bodyMaterial);
	knee2.position.x = 0;
	knee2.position.y = -130;
	knee2.position.z = 0;
	knee2.rotation.x = Math.PI/2;
	knee2.rotation.z = Math.PI/2;

	tibia1 = new THREE.Mesh(
		new THREE.CylinderGeometry(10, 10, 130, 20, 35, false), eyeMaterial);
	tibia1.position.x = 0;
	tibia1.position.y = -200;
	tibia1.position.z = 0;

	tibia2 = new THREE.Mesh(
		new THREE.CylinderGeometry(10, 10, 130, 20, 35, false), eyeMaterial);
	tibia2.position.x = 0;
	tibia2.position.y = -200;
	tibia2.position.z = 0;

	foot1 = new THREE.Mesh(
		new THREE.BoxGeometry(30, 20, 80, 1, 1, 1), bodyMaterial);
	foot1.position.x = 0;
	foot1.position.y = -270;
	foot1.position.z = -20;

	foot2 = new THREE.Mesh(	
		new THREE.BoxGeometry(30, 20, 80, 1, 1, 1), bodyMaterial);
	foot2.position.x = 0;
	foot2.position.y = -270;
	foot2.position.z = -20;

	ankle1 = new THREE.Mesh(
		new THREE.SphereGeometry(15, 10, 10, 0, (2 * Math.PI), 0, Math.PI), bodyMaterial);
	ankle1.position.x = 0;
	ankle1.position.y = -260;
	ankle1.position.z = 0;

	ankle2 = new THREE.Mesh(
		new THREE.SphereGeometry(15, 10, 10, 0, (2 * Math.PI), 0, Math.PI), bodyMaterial);
	ankle2.position.x = 0;
	ankle2.position.y = -260;
	ankle2.position.z = 0;


	/// ADDING THINGS TOGETHER

	grabRot1.add(extrudeClawR1);
	//grabRot1.add(extrudeClawL1);
	grabRot2.add(extrudeClawR2);
	//grabRot2.add(extrudeClawL2);
	grabRot1.position.set(0, -230, 0);
	grabRot2.position.set(0, -230, 0);
	scene.add(grabRot1);
	scene.add(grabRot2);
	bendRot1.add(wrist1);
	bendRot2.add(wrist2);
	bendRot1.add(forarm1);
	bendRot2.add(forarm2);
	bendRot1.add(elbow1);
	bendRot2.add(elbow2);
	bendRot1.add(extrudeClawL1);
	bendRot2.add(extrudeClawL2);
	bendRot1.add(grabRot1);
	bendRot2.add(grabRot2);
	bendRot1.position.set(0, -140, 0);	
	bendRot2.position.set(0, -140, 0);
	scene.add(bendRot1);
	scene.add(bendRot2);
	swivelRot1.add(humerus1);
	swivelRot2.add(humerus2);
	swivelRot1.add(bendRot1);
	swivelRot2.add(bendRot2);
	swivelRot1.position.set(120,360,0);
	swivelRot2.position.set(-120,360,0);
	scene.add(swivelRot1);
	scene.add(swivelRot2);
	legRot1.add(femur1);
	legRot2.add(femur2);
	legRot1.add(knee1);
	legRot2.add(knee2);
	legRot1.add(tibia1);
	legRot2.add(tibia2);
	legRot1.add(ankle1);
	legRot2.add(ankle2);
	legRot1.add(foot1);
	legRot2.add(foot2);
	legRot1.position.set(40, 280, 0);
	legRot2.position.set(-40, 280, 0);
	scene.add(legRot1);
	scene.add(legRot2);
	everything.add(legRot1);
	everything.add(legRot2);
	everything.add(swivelRot1);
	everything.add(swivelRot2);
	everything.add(head);
	everything.add(body);
	everything.add(eye1);
	everything.add(eye2);
	everything.add(shoulder1);
	everything.add(shoulder2);
	everything.add(shoulderConnector);
	everything.add(pupil1);
	everything.add(armConnector1);
	everything.add(armConnector2);
	everything.add(pupil2);
	everything.add(glassEye1);
	everything.add(glassEye2);
	everything.add(extrudeMouth);
	everything.add(legConnector1);
	everything.add(legConnector2);
	everything.add(antenna);
	everything.add(antennaConnector);
	everything.add(antennaTip);
	everything.add(antennaGlassTip);
	everything.position.set(0, 0, 0);
	scene.add(everything);
}	

function drawClaw() {
	var claw = new THREE.Shape();
	claw.moveTo(10, 10); // starting point
	claw.bezierCurveTo(20, 35, 50, 35, 60, 10);
	claw.bezierCurveTo(50, 20, 20, 20, 10, 10);
	return claw;
}

function drawMouth() {
	var mouth = new THREE.Shape();
	mouth.moveTo(10, 10);
	mouth.lineTo(20, 20);
	mouth.lineTo(10, 30);
	mouth.lineTo(20, 40);
	mouth.lineTo(10, 50);
	mouth.lineTo(20, 60);
	mouth.lineTo(10, 70);
	mouth.lineTo(15, 70);
	mouth.lineTo(25, 60);
	mouth.lineTo(15, 50);
	mouth.lineTo(25, 40);
	mouth.lineTo(15, 30);
	mouth.lineTo(25, 20);
	mouth.lineTo(15, 10);
	mouth.lineTo(10, 10);
	return mouth;
}

function init() {
	var canvasWidth = 600;
	var canvasHeight = 400;
	var canvasRatio = canvasWidth / canvasHeight;

	// RENDERER
	renderer = new THREE.WebGLRenderer( { antialias: true } );

	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColor( 0xAAAAAA, 1.0 );

	// CAMERA
	camera = new THREE.PerspectiveCamera( 45, canvasRatio, 1, 4000 );
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
	keyBoard.update();
	swivelRot1.rotation.y = params.swivel * (Math.PI/180);
	swivelRot2.rotation.y = params.swivel * (Math.PI/180);
	bendRot1.rotation.x = params.bend * (Math.PI/180);
	bendRot2.rotation.x = params.bend * (Math.PI/180);	
	grabRot1.rotation.z = params.grab * -.1 * (Math.PI/180);
	grabRot2.rotation.z = params.grab * -.1 * (Math.PI/180);
	if(keyBoard.pressed("A")){
		cycle = cycle == 360 ? 1 : ++cycle;
		cycle += 1;
		legRot1.rotation.x = Math.cos(cycle * (Math.PI/180));
		legRot2.rotation.x = Math.cos(cycle * (Math.PI/180) + Math.PI);
		everything.rotation.y -= 0.02;
	}
	if(keyBoard.pressed("S")){
		cycle = cycle == 360 ? 1 : ++cycle;
		cycle += 1;
		legRot1.rotation.x = Math.cos(cycle * (Math.PI/180));
		legRot2.rotation.x = Math.cos(cycle * (Math.PI/180) + Math.PI);
		everything.rotation.y += 0.02;
	}
	if(keyBoard.pressed("W")){
		cycle = cycle == 360 ? 1 : cycle += 5;
		cycle += 1;
		legRot1.rotation.x = Math.cos(cycle * (Math.PI/180));
		legRot2.rotation.x = Math.cos(cycle * (Math.PI/180) + Math.PI);
		everything.translateZ(-2);
	}
	window.requestAnimationFrame(animate);
  //armRot.rotation.x = Math.cos(cycle * (Math.PI/180)) - 0.5;
	render();
}

function moveLegs(){
  cycle = cycle == 360 ? 1 : ++cycle;
	cycle += 1;
  legRot1.rotation.x = Math.cos(cycle * (Math.PI/180));
	legRot2.rotation.x = Math.cos(cycle * (Math.PI/180) + Math.PI);
}

function render() {
	var delta = clock.getDelta();
	cameraControls.update(delta);
	renderer.render(scene, camera);
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
