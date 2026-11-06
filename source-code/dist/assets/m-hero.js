import * as THREE from './vendor/three.module.min.js';

// A dimensional brand initial, lit like a studio object above a quiet data field.
const canvas = document.querySelector('[data-m-scene]');
if (canvas) {
  const stage = canvas.parentElement;
  const hero = stage.closest('.hero');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true, powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.setClearColor(0x05070b, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, .1, 70);
    camera.position.set(0, 2.1, 13);
    camera.lookAt(0, 0, 0);

    // Local procedural studio lighting; no remote image or video dependency.
    const studio = document.createElement('canvas');
    studio.width = 512; studio.height = 256;
    const ctx = studio.getContext('2d');
    ctx.fillStyle = '#373e48'; ctx.fillRect(0, 0, 512, 256);
    for (const [x, width, shade] of [[55,95,'#cad0d9'],[275,35,'#ffffff'],[405,65,'#787f8b']]) {
      const glow = ctx.createLinearGradient(x, 0, x + width, 0);
      glow.addColorStop(0, '#373e48'); glow.addColorStop(.45, shade); glow.addColorStop(.55, shade); glow.addColorStop(1, '#373e48');
      ctx.fillStyle = glow; ctx.fillRect(x, 24, width, 205);
    }
    let environment;
    function createEnvironment() {
      const studioTexture = new THREE.CanvasTexture(studio);
      studioTexture.mapping = THREE.EquirectangularReflectionMapping;
      studioTexture.colorSpace = THREE.SRGBColorSpace;
      const pmrem = new THREE.PMREMGenerator(renderer);
      environment?.dispose();
      environment = pmrem.fromEquirectangular(studioTexture);
      scene.environment = environment.texture;
      studioTexture.dispose(); pmrem.dispose();
    }
    createEnvironment();
    scene.add(new THREE.HemisphereLight(0xd9e4f5, 0x171921, 1.4));
    const key = new THREE.DirectionalLight(0xf1f4ff, 3.3);
    key.position.set(-2, 6, 8); scene.add(key);
    const rim = new THREE.DirectionalLight(0x9caec9, 2.5);
    rim.position.set(8, 2, -4); scene.add(rim);
    const warm = new THREE.PointLight(0xff8742, 65, 18, 2);
    warm.position.set(7, -.5, 3); scene.add(warm);

    const outline = new THREE.Shape();
    const vertices = [[0,0],[0,3.2],[.75,3.2],[1.8,1.3],[2.85,3.2],[3.6,3.2],[3.6,0],[2.78,0],[2.78,1.82],[1.8,.3],[.82,1.82],[.82,0]];
    vertices.forEach(([x,y], i) => i ? outline.lineTo(x,y) : outline.moveTo(x,y));
    outline.closePath();
    const letterGeometry = new THREE.ExtrudeGeometry(outline, {depth:.68, bevelEnabled:true, bevelThickness:.07, bevelSize:.065, bevelSegments:4, steps:1, curveSegments:1});
    letterGeometry.center();
    const front = new THREE.MeshPhysicalMaterial({color:0x9aa0aa, metalness:.85, roughness:.24, clearcoat:.65, clearcoatRoughness:.22, envMapIntensity:1.3});
    const side = new THREE.MeshPhysicalMaterial({color:0x282e38, metalness:.8, roughness:.3, clearcoat:.5, envMapIntensity:1.6});
    const letter = new THREE.Mesh(letterGeometry, [front, side]);
    letter.scale.setScalar(1.28);
    letter.rotation.set(-.08, -.46, -.02);
    scene.add(letter);

    const columns = 155, rows = 92;
    const positions = new Float32Array(columns * rows * 3);
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const index = (row * columns + col) * 3;
        positions[index] = (col / (columns - 1) - .5) * 34;
        positions[index + 1] = -2.75;
        positions[index + 2] = -20 + row / (rows - 1) * 28;
      }
    }
    const fieldGeometry = new THREE.BufferGeometry();
    fieldGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const fieldMaterial = new THREE.ShaderMaterial({
      transparent:true, depthWrite:false,
      uniforms:{time:{value:0},pixelRatio:{value:renderer.getPixelRatio()},mobile:{value:0}},
      vertexShader:`
        uniform float time;
        uniform float pixelRatio;
        uniform float mobile;
        varying float opacity;
        void main() {
          vec3 p = position;
          p.y += sin(p.x * .52 + time * .28) * cos(p.z * .32 + time * .18) * .34;
          p.y += sin(p.x * .19 - p.z * .35 + time * .2) * .22;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = clamp(25.0 / -mv.z, .8 + mobile * .55, 2.3) * pixelRatio;
          opacity = smoothstep(-18.0, -5.0, p.z) * (1.0 - smoothstep(5.0, 8.0, p.z)) * (.65 + mobile * .15);
        }`,
      fragmentShader:`
        varying float opacity;
        void main() {
          float distanceFromCenter = length(gl_PointCoord - .5);
          float alpha = (1.0 - smoothstep(.18, .5, distanceFromCenter)) * opacity;
          gl_FragColor = vec4(.67, .72, .81, alpha);
        }`
    });
    const field = new THREE.Points(fieldGeometry, fieldMaterial);
    scene.add(field);

    let frame = 0, visible = true, elapsed = 0, previous = 0, baseY = .5, contextLost = false;
    const canAnimate = () => !contextLost && visible && !document.hidden && !reduced.matches && !document.documentElement.classList.contains('intro-pending');
    function render(time = 0) {
      frame = 0;
      if (contextLost) return;
      if (previous && canAnimate()) elapsed += Math.min(time - previous, 60) / 1000;
      previous = time;
      letter.position.y = baseY + Math.sin(elapsed * .36) * .07;
      letter.rotation.y = -.46 + Math.sin(elapsed * .22) * .13;
      letter.rotation.x = -.08 + Math.sin(elapsed * .18) * .025;
      warm.position.x = 7 + Math.sin(elapsed * .3) * 1.6;
      fieldMaterial.uniforms.time.value = elapsed;
      renderer.render(scene, camera);
      stage.classList.add('m-canvas-ready');
      if (canAnimate()) frame = requestAnimationFrame(render);
    }
    function resume() {
      previous = 0;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      if (contextLost) return;
      frame = requestAnimationFrame(render);
    }
    function resize() {
      const width = stage.clientWidth, height = stage.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      const mobile = width <= 800;
      // On phones the letter sits below the copy, with its own breathing room.
      letter.scale.setScalar(mobile ? .67 : 1.28);
      letter.position.x = mobile ? .45 : camera.aspect * 2.05;
      baseY = mobile ? -1.6 : .5;
      front.metalness = mobile ? .5 : .7;
      front.roughness = mobile ? .32 : .24;
      front.emissive.set(0x4a5364);
      front.emissiveIntensity = mobile ? .9 : .18;
      field.position.y = mobile ? .45 : 0;
      fieldMaterial.uniforms.mobile.value = mobile ? 1 : 0;
      resume();
    }
    new ResizeObserver(resize).observe(stage);
    new IntersectionObserver(([entry]) => {visible = entry.isIntersecting; resume();}, {threshold:0}).observe(hero);
    new MutationObserver(resume).observe(document.documentElement, {attributes:true, attributeFilter:['class']});
    document.addEventListener('visibilitychange', resume);
    reduced.addEventListener('change', resume);
    canvas.addEventListener('webglcontextlost', event => {
      event.preventDefault();
      contextLost = true;
      cancelAnimationFrame(frame);
      stage.classList.remove('m-canvas-ready');
    });
    canvas.addEventListener('webglcontextrestored', () => {
      contextLost = false;
      createEnvironment();
      resize();
    });
    resize();
  } catch {
    // The typographic fallback remains visible when WebGL is unavailable.
    renderer?.dispose();
  }
}
