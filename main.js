window.addEventListener("DOMContentLoaded", init);

function init() {
    
    const width = 960;
    const height = 540;

    const canvasElement = document.querySelector("#canvas");
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#canvas"),
        antialias: true,
        alpha: true 
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(5, 0, 15);
    
    const mtlloader = new THREE.MTLLoader();
    mtlloader.setPath("model/E-45-Aircraft/");
    mtlloader.load("E 45 Aircraft_obj.mtl",function(materials){
        materials.preload();
        const objloader = new THREE.OBJLoader();
        objloader.setPath("model/E-45-Aircraft/");
        objloader.setMaterials(materials);
        objloader.load("E 45 Aircraft_obj.obj",function (object){
            object.rotation.x = Math.PI / 6;
            scene.add(object); 
        }); 
    });    

    const textureLoader = new THREE.TextureLoader();
    const geometry = new THREE.CubeGeometry(3000, 3000, 3000);
    const cubeMaterials = 
    [
        new THREE.MeshBasicMaterial({ map: textureLoader.load("model/space.png"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: textureLoader.load("model/space.png"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: textureLoader.load("model/space.png"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: textureLoader.load("model/space.png"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: textureLoader.load("model/space.png"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: textureLoader.load("model/space.png"), side: THREE.DoubleSide })
    ];
    const material = new THREE.MeshFaceMaterial(cubeMaterials);
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const light = new THREE.DirectionalLight(0xFFFFFF, 2);
    light.position.set(1, 1, 1);
    scene.add(light);

    tick();

    function tick() {
        requestAnimationFrame(tick);        
        cube.rotation.x -= 0.001;
        renderer.render(scene, camera);
    }
    
}
