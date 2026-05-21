"use client"

import { useEffect, useRef } from 'react'
import {
  Clock, Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector2, Vector3, WebGLRenderer
} from 'three'

const vertexShader = `
precision highp float;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3  iResolution;
uniform float animationSpeed;

uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;

uniform vec3 lineGradient[8];
uniform int lineGradientCount;

const vec3 BLACK = vec3(0.0);

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
  float time = iTime * animationSpeed;
  float x_offset   = offset;
  float x_movement = time * 0.1;
  float amp        = sin(offset + time * 0.2) * 0.3;
  float y          = sin(uv.x + x_offset + x_movement) * amp;

  if (shouldBend) {
    vec2 d = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius);
    float bendOffset = (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
    y += bendOffset;
  }

  float m = uv.y - y;
  return 0.0175 / max(abs(m) + 0.01, 1e-3) + 0.01;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;
  
  if (parallax) {
    baseUv += parallaxOffset;
  }

  vec3 col = vec3(0.0);
  vec2 mouseUv = vec2(0.0);
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }
  
  if (enableBottom) {
    for (int i = 0; i < bottomLineCount; ++i) {
      float fi = float(i);
      float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += vec3(0.4, 0.4, 0.4) * wave(
        ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y),
        1.5 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.2;
    }
  }

  if (enableMiddle) {
    for (int i = 0; i < middleLineCount; ++i) {
      float fi = float(i);
      float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += vec3(0.4, 0.4, 0.4) * wave(
        ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y),
        2.0 + 0.15 * fi,
        baseUv,
        mouseUv,
        interactive
      );
    }
  }

  if (enableTop) {
    for (int i = 0; i < topLineCount; ++i) {
      float fi = float(i);
      float angle = topWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      ruv.x *= -1.0;
      col += vec3(0.4, 0.4, 0.4) * wave(
        ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y),
        1.0 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.1;
    }
  }

  fragColor = vec4(col, 1.0);
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`

type WavePosition = { x: number; y: number; rotate: number }

interface FloatingLinesProps {
  strokeColor?: string
  numberOfLines?: number
  opacity?: number
}

export default function FloatingLines({
  strokeColor = '#01696F',
  numberOfLines = 6,
  opacity = 0.1
}: FloatingLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const targetMouseRef = useRef<Vector2>(new Vector2(-1000, -1000))
  const currentMouseRef = useRef<Vector2>(new Vector2(-1000, -1000))
  const targetInfluenceRef = useRef<number>(0)
  const currentInfluenceRef = useRef<number>(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let active = true
    const scene = new Scene()
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
    camera.position.z = 1

    const renderer = new WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    container.appendChild(renderer.domElement)

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new Vector3(1, 1, 1) },
      animationSpeed: { value: 0.5 },
      enableTop: { value: true },
      enableMiddle: { value: true },
      enableBottom: { value: true },
      topLineCount: { value: numberOfLines },
      middleLineCount: { value: numberOfLines },
      bottomLineCount: { value: numberOfLines },
      topLineDistance: { value: 0.05 },
      middleLineDistance: { value: 0.05 },
      bottomLineDistance: { value: 0.05 },
      topWavePosition: { value: new Vector3(10.0, 0.5, -0.4) },
      middleWavePosition: { value: new Vector3(5.0, 0.0, 0.2) },
      bottomWavePosition: { value: new Vector3(2.0, -0.7, 0.4) },
      iMouse: { value: new Vector2(-1000, -1000) },
      interactive: { value: true },
      bendRadius: { value: 5.0 },
      bendStrength: { value: -0.5 },
      bendInfluence: { value: 0 },
      parallax: { value: false },
      parallaxStrength: { value: 0.2 },
      parallaxOffset: { value: new Vector2(0, 0) },
      lineGradient: { value: Array.from({ length: 8 }, () => new Vector3(0.4, 0.4, 0.4)) },
      lineGradientCount: { value: 0 }
    }

    const material = new ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true })
    const geometry = new PlaneGeometry(2, 2)
    const mesh = new Mesh(geometry, material)
    scene.add(mesh)
    const clock = new Clock()

    const setSize = () => {
      if (!active) return
      const width = container.clientWidth || 1
      const height = container.clientHeight || 1
      renderer.setSize(width, height, false)
      uniforms.iResolution.value.set(renderer.domElement.width, renderer.domElement.height, 1)
    }
    setSize()

    const ro = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => { if (active) setSize() })
      : null
    if (ro) ro.observe(container)

    const handlePointerMove = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const dpr = renderer.getPixelRatio()
      targetMouseRef.current.set(x * dpr, (rect.height - y) * dpr)
      targetInfluenceRef.current = 1.0
    }

    const handlePointerLeave = () => { targetInfluenceRef.current = 0.0 }

    renderer.domElement.addEventListener('pointermove', handlePointerMove)
    renderer.domElement.addEventListener('pointerleave', handlePointerLeave)

    let raf = 0
    const renderLoop = () => {
      if (!active) return
      uniforms.iTime.value = clock.getElapsedTime()
      currentMouseRef.current.lerp(targetMouseRef.current, 0.05)
      uniforms.iMouse.value.copy(currentMouseRef.current)
      currentInfluenceRef.current += (targetInfluenceRef.current - currentInfluenceRef.current) * 0.05
      uniforms.bendInfluence.value = currentInfluenceRef.current
      renderer.render(scene, camera)
      raf = requestAnimationFrame(renderLoop)
    }
    renderLoop()

    return () => {
      active = false
      cancelAnimationFrame(raf)
      if (ro) ro.disconnect()
      renderer.domElement.removeEventListener('pointermove', handlePointerMove)
      renderer.domElement.removeEventListener('pointerleave', handlePointerLeave)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement)
      }
    }
  }, [strokeColor, numberOfLines, opacity])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
    />
  )
}
