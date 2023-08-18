import "./style.css";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import * as lilGui from "lil-gui";
import gsap from "gsap";

// Canvas basic scene
const canvas = document.querySelector('canvas');

// Scene -- > for this we instansiate from the class scene

const scene = new THREE.Scene();

// Camera --> perspective camera
// aspect ratio = width of the scene / height

const camera = new THREE.PerspectiveCamera(
    45,// filed of view
    window.innerWidth / window.innerHeight,    //aspect ration
    0.1, // Near
    1000 // far
);

// initial position of the camera
camera.position.set(3.1418607600532855,3.4345401272468097,-3.950680508552855);
camera.rotation.set(-2.8065435392996787,0.7126838920440848, 2.917747033283456);



//Renderer--> this is the screenshot i.e you take the camera and the scene and you create a screenshot
const renderer = new THREE.WebGL1Renderer({
    canvas: canvas,
});
renderer.setSize(window.innerWidth,window.innerHeight);

// Orbit Controls--> Getting the exact values to where to move and animate the camera
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true; // give a sense of weight 

let position = 0;

// GLTF Loader --> to Import the whole scene/ the model

const gltfLoader = new GLTFLoader();
gltfLoader.load('/model/the_great_drawing_room/scene.gltf',(gltf)=>{
    console.log(gltf);
    // contains the gltf model that we load
    const model = gltf.scene; // to get the scene from the model
    scene.add(model);

    /*
        arrow functino takes in the loaded gltf then we creaate a model with the value
        gltf.scene
    */

    
    // window.addEventListener("mouseup",function(){
    //     console.log(camera.position);
    //     console.log(camera.rotation);
    // });

    window.addEventListener("mouseup", function(){
        switch(position) {
            case 0:
                cameraMovement(-4.285806784929495,2.103855619715744,0.2221450455019096);
                cameraRotation(-3.098800448892881,-0.8676940783751438, -3.108940717651078);
                position = 1;
                break;
            
            case 1:
                cameraMovement(0.48,2.09,-2.11);
                cameraRotation(-3.12,0.22,3.13);
                position = 2;
                break;

            case 2:
                cameraMovement(-1.49,1.70,0.48);
                cameraRotation(0.44,1.43,-0.44);
                position = 3;
            case 3:
                cameraMovement(-1,1.70,0.48);
                cameraRotation(-3.12,0.22,3.13);
                position = 4;
            case 4:
                cameraMovement(-3.5,2.3,0.3);
                cameraRotation(-3.12,0.22,3.13);
                position = 0;
            
                
        }
    });



    



/*
        // GUI configurator 
    const gui  = new lilGui.GUI();
    gui.add(model.position,'x')
    .min(-100)
    .max(100)
    .step(0.001) // step is to add accuracy change from 1,2,3, or 0.01,0.02
    .name('model X Axis Position');

    gui.add(model.position,'y')
    .min(-100)
    .max(100)
    .step(0.001) // step is to add accuracy change from 1,2,3, or 0.01,0.02
    .name('model Y Axis Position');

    gui.add(model.position,'z')
    .min(-100)
    .max(100)
    .step(0.001) // step is to add accuracy change from 1,2,3, or 0.01,0.02
    .name('model Z Axis Position');

*/



}); // we add the path of the model

function cameraMovement(x,y,z){
    gsap.to(camera.position,{
        x,
        y,
        z,
        duration: 3,
    });
}

function cameraRotation(x,y,z){
    gsap.to(camera.rotation,{
        x,
        y,
        z,
        duration: 3,
    });
}





// animate function that makes animation possible.
// to render the scene on each frame
const animate = ()=>{
    renderer.render(scene,camera);

    // controls.update();
};

renderer.setAnimationLoop(animate);

animate();











