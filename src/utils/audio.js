// Web Audio API generator for ultra-realistic tactile paper turning rustle sound only

let audioCtx = null

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (AudioContext) {
      audioCtx = new AudioContext()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

/**
 * Synthesizes a multi-layered, tactile paper scrape and settling rustle
 */
export function playPaperTurnSound() {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime

    // 1. Initial paper lift friction (70ms)
    createRustleBurst(ctx, now, 0.09, 1600, 0.16)

    // 2. Air sweep / bend (mid phase, 120ms later)
    createRustleBurst(ctx, now + 0.14, 0.15, 1200, 0.12)

    // 3. Crisp landing tap on stack (280ms later)
    createRustleBurst(ctx, now + 0.35, 0.12, 1800, 0.18)
  } catch {
    // Ignore audio errors if blocked
  }
}

function createRustleBurst(ctx, startTime, duration, centerFreq, volume) {
  const bufferSize = Math.floor(ctx.sampleRate * duration)
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)

  // Pink / filtered noise texture
  let b0 = 0, b1 = 0, b2 = 0
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1
    b0 = 0.98 * b0 + white * 0.06
    b1 = 0.94 * b1 + white * 0.12
    b2 = 0.84 * b2 + white * 0.22
    const progress = i / bufferSize
    // Envelope: quick attack, textured friction decay
    const env = Math.sin(progress * Math.PI) * Math.pow(1 - progress, 0.6)
    data[i] = (b0 + b1 + b2) * env
  }

  const noise = ctx.createBufferSource()
  noise.buffer = buffer

  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(centerFreq, startTime)
  filter.Q.setValueAtTime(1.5, startTime)

  const gain = ctx.createGain()
  gain.gain.setValueAtTime(volume, startTime)
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)

  noise.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)

  noise.start(startTime)
  noise.stop(startTime + duration)
}
