"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

// Cena do D20 — SÓ roda no navegador (importada com ssr:false em D20.tsx).
// Arquivo: app/components/D20Cena.tsx

const RAIO = 1.6;
const TAM_NUMERO = 0.55; // tamanho do número dentro da face triangular

// Desenha o número num canvas e vira textura (sem baixar fonte da internet)
function texturaNumero(n: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, 256, 256);
  ctx.font = "bold 150px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // Contorno escuro para ler bem sobre o cristal
  ctx.lineWidth = 12;
  ctx.strokeStyle = "rgba(60, 10, 45, 0.9)";
  ctx.strokeText(String(n), 128, 136);
  ctx.fillStyle = "#ffffff";
  ctx.fillText(String(n), 128, 136);
  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 4;
  return tex;
}

type Face = {
  centro: THREE.Vector3;
  normal: THREE.Vector3;
  topo: THREE.Vector3; // vértice mais alto da face (para orientar o número)
  numero: number;
};

// Lê as 20 faces do icosaedro e numera de 1 a 20 com layout fixo.
// Faces opostas somam 21, como num D20 de verdade.
function construirFaces(): Face[] {
  const geo = new THREE.IcosahedronGeometry(RAIO, 0);
  const pos = geo.getAttribute("position");
  const base: Omit<Face, "numero">[] = [];

  for (let f = 0; f < 20; f++) {
    const a = new THREE.Vector3().fromBufferAttribute(pos, f * 3);
    const b = new THREE.Vector3().fromBufferAttribute(pos, f * 3 + 1);
    const c = new THREE.Vector3().fromBufferAttribute(pos, f * 3 + 2);
    const ab = new THREE.Vector3().subVectors(b, a);
    const ac = new THREE.Vector3().subVectors(c, a);
    const normal = new THREE.Vector3().crossVectors(ab, ac).normalize();
    const centro = a.clone().add(b).add(c).divideScalar(3);
    if (normal.dot(centro) < 0) normal.negate(); // garante normal para fora
    const topo = [a, b, c].reduce((m, v) => (v.y > m.y ? v : m));
    base.push({ centro, normal, topo });
  }
  geo.dispose();

  // Pareia faces opostas (centro invertido) e dá números que somam 21
  const usadas = new Array(20).fill(false);
  const faces: Face[] = new Array(20);
  const pares = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let k = 0;
  for (let i = 0; i < 20; i++) {
    if (usadas[i]) continue;
    let j = -1;
    let melhor = Infinity;
    for (let m = 0; m < 20; m++) {
      if (m === i || usadas[m]) continue;
      const d = base[i].centro.clone().add(base[m].centro).length();
      if (d < melhor) {
        melhor = d;
        j = m;
      }
    }
    faces[i] = { ...base[i], numero: pares[k] };
    faces[j] = { ...base[j], numero: 21 - pares[k] };
    k++;
    usadas[i] = true;
    usadas[j] = true;
  }
  return faces;
}

// Posição e rotação do número: colado na face, virado para fora,
// com o topo da letra apontando para o vértice mais alto da face.
function poseNumero(face: Face): {
  posicao: THREE.Vector3;
  quat: THREE.Quaternion;
} {
  const n = face.normal;
  const dummy = new THREE.Object3D();
  dummy.position.copy(face.centro).addScaledVector(n, 0.02);
  dummy.lookAt(face.centro.clone().addScaledVector(n, 2));

  const projetar = (v: THREE.Vector3) => {
    const p = v.clone().addScaledVector(n, -v.dot(n));
    return p.lengthSq() > 1e-6 ? p.normalize() : new THREE.Vector3(1, 0, 0);
  };
  const cima = projetar(new THREE.Vector3(0, 1, 0));
  const alvo = projetar(face.topo.clone().sub(face.centro));
  const ang = Math.atan2(
    new THREE.Vector3().crossVectors(cima, alvo).dot(n),
    cima.dot(alvo)
  );
  dummy.quaternion.premultiply(
    new THREE.Quaternion().setFromAxisAngle(n, ang)
  );
  return { posicao: dummy.position.clone(), quat: dummy.quaternion.clone() };
}

function Dado() {
  const grupo = useRef<THREE.Group>(null);
  const rolando = useRef(false);

  // Geometria + faces numeradas (calculado 1 vez)
  const { geometria, faces, texturas } = useMemo(() => {
    const faces = construirFaces();
    return {
      geometria: new THREE.IcosahedronGeometry(RAIO, 0),
      faces,
      texturas: faces.map((f) => texturaNumero(f.numero)),
    };
  }, []);

  useEffect(() => {
    const g = geometria;
    const t = texturas;
    return () => {
      g.dispose();
      t.forEach((tex) => tex.dispose());
    };
  }, [geometria, texturas]);

  // Gira devagar parado
  useFrame((_, delta) => {
    if (grupo.current && !rolando.current) {
      grupo.current.rotation.y += delta * 0.35;
      grupo.current.rotation.x += delta * 0.12;
    }
  });

  function rolar(e: { stopPropagation: () => void }) {
    if (!grupo.current || rolando.current) return;
    e.stopPropagation(); // clica no dado sem sair da página
    rolando.current = true;

    // Sorteia a face e calcula a rotação que a deixa virada para cima
    const face = faces[Math.floor(Math.random() * 20)];
    const paraCima = new THREE.Quaternion().setFromUnitVectors(
      face.normal,
      new THREE.Vector3(0, 1, 0)
    );
    const giro = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      Math.random() * Math.PI * 2
    );
    const alvo = giro.multiply(paraCima);
    const euler = new THREE.Euler().setFromQuaternion(alvo, "XYZ");
    const volta = Math.PI * 2;

    // Gira várias voltas e pousa exatamente na face sorteada
    gsap.to(grupo.current.rotation, {
      x: euler.x + volta * 2,
      y: euler.y + volta * 2,
      z: euler.z + volta,
      duration: 2.2,
      ease: "power4.out",
      onComplete: () => {
        rolando.current = false;
      },
    });
  }

  return (
    <group
      ref={grupo}
      onClick={rolar}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      {/* Cristal translúcido rosa */}
      <mesh geometry={geometria}>
        <meshPhysicalMaterial
          color="#f9a8d4"
          transmission={1}
          thickness={1.2}
          roughness={0.15}
          ior={1.4}
          iridescence={0.5}
          iridescenceIOR={1.3}
          attenuationColor="#ec4899"
          attenuationDistance={2.5}
        />
      </mesh>
      {/* Núcleo roxo brilhante por dentro */}
      <mesh scale={0.55}>
        <icosahedronGeometry args={[RAIO, 0]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#a855f7"
          emissiveIntensity={1.2}
          roughness={0.4}
        />
      </mesh>
      {/* Números 1 a 20, um por face */}
      {faces.map((f, i) => {
        const { posicao, quat } = poseNumero(f);
        return (
          <mesh key={i} position={posicao} quaternion={quat}>
            <planeGeometry args={[TAM_NUMERO, TAM_NUMERO]} />
            <meshBasicMaterial map={texturas[i]} transparent depthWrite={false} />
          </mesh>
        );
      })}
    </group>
  );
}

export function D20Cena({ tamanho = 112 }: { tamanho?: number }) {
  return (
    <span
      className="inline-block shrink-0 align-middle"
      style={{ width: tamanho, height: tamanho }}
    >
      <span className="block cursor-pointer" style={{ width: tamanho, height: tamanho }}>
        <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 5.2], fov: 40 }}>
          <ambientLight intensity={0.35} />
          <pointLight position={[4, 3, 4]} intensity={60} color="#ec4899" />
          <pointLight position={[-4, -2, 3]} intensity={60} color="#a855f7" />
          <Dado />
          {/* Reflexos rosa e roxos sem baixar nada da internet */}
          <Environment resolution={256}>
            <Lightformer
              intensity={2.5}
              color="#f9a8d4"
              position={[0, 5, 0]}
              rotation-x={Math.PI / 2}
              scale={[10, 10, 1]}
            />
            <Lightformer
              intensity={2.5}
              color="#c084fc"
              position={[-5, 1, -1]}
              rotation-y={Math.PI / 2}
              scale={[8, 8, 1]}
            />
            <Lightformer
              intensity={1.5}
              color="#f472b6"
              position={[5, -1, 1]}
              rotation-y={-Math.PI / 2}
              scale={[8, 8, 1]}
            />
          </Environment>
        </Canvas>
      </span>
    </span>
  );
}
