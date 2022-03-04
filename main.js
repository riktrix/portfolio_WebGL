window.addEventListener("DOMContentLoaded", init);

function init() {
    
    const width = 960;
    const height = 540;

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
    
    // 3DS形式のモデルデータを読み込む
    const loader = new THREE.ColladaLoader();
    // 3dsファイルのパスを指定
    loader.load('./model/fish-3d.dae', (collada) => {
    // 読み込み後に3D空間に追加
     const model = collada.scene;
     scene.add(model);
    });

    const textureLoader = new THREE.TextureLoader();
    const geometry = new THREE.CubeGeometry(3000, 3000, 3000);
    const cubeMaterials = 
    [
        new THREE.MeshBasicMaterial({ map: textureLoader.load("./model/space.png"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: textureLoader.load("./model/space.png"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: textureLoader.load("./model/space.png"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: textureLoader.load("./model/space.png"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: textureLoader.load("./model/space.png"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: textureLoader.load("./model/space.png"), side: THREE.DoubleSide })
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
