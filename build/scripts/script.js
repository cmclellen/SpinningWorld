function animate(){requestAnimationFrame(animate),render()}function render(){var e=clock.getDelta();earthMesh.rotation.y+=rotationSpeed*e,renderer.render(scene,camera)}var rotationSpeed=.05,clock=new THREE.Clock,WIDTH=window.innerWidth-30,HEIGHT=window.innerHeight-30,angle=45,aspect=WIDTH/HEIGHT,near=.1,far=1e4,container=document.getElementById("container"),camera=new THREE.PerspectiveCamera(angle,aspect,near,far);camera.position.set(0,0,0);var scene=new THREE.Scene,light=new THREE.SpotLight(16777215,1,0,Math.PI/2,1);light.position.set(4e3,4e3,1500),light.target.position.set(1e3,3800,1e3),scene.add(light);var earthGeo=new THREE.SphereGeometry(30,40,400),earthMat=new THREE.MeshPhongMaterial;earthMat.map=THREE.ImageUtils.loadTexture("https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/earthmap.jpg"),earthMat.bumpMap=THREE.ImageUtils.loadTexture("https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/bump-map.jpg"),earthMat.bumpScale=8;var earthMesh=new THREE.Mesh(earthGeo,earthMat);earthMesh.position.set(-100,0,0),earthMesh.rotation.y=5,scene.add(earthMesh),camera.lookAt(earthMesh.position);var renderer=new THREE.WebGLRenderer({antialiasing:!0});renderer.setSize(WIDTH,HEIGHT),renderer.domElement.style.position="relative",container.appendChild(renderer.domElement),renderer.autoClear=!1,renderer.shadowMapEnabled=!0,animate();