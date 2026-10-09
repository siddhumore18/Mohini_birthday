// Web Audio API generator for ultra-realistic paper turning rustle and soothing ambient music

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

/**
 * Ambient background music synthesizer (soft music box / calm piano arpeggios)
 */
class AmbientMusicPlayer {
  constructor() {
    this.isPlaying = false
    this.timer = null
    this.notes = [
      261.63, 329.63, 392.00, 523.25, // C chord
      293.66, 369.99, 440.00, 587.33, // D chord
      220.00, 261.63, 329.63, 440.00, // A minor
      174.61, 220.00, 261.63, 349.23, // F chord
    ]
    this.step = 0
  }

  playPluck(freq, time, duration = 1.2) {
    if (!this.isPlaying) return
    const ctx = getAudioContext()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, time)

    gain.gain.setValueAtTime(0.001, time)
    gain.gain.linearRampToValueAtTime(0.05, time + 0.04)
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(time)
    osc.stop(time + duration)
  }

  start() {
    this.isPlaying = true
    const ctx = getAudioContext()
    if (!ctx) return

    const tick = () => {
      if (!this.isPlaying) return
      const now = ctx.currentTime
      const chordIndex = Math.floor((this.step / 4) % 4)
      const noteInChord = this.step % 4
      const freq = this.notes[chordIndex * 4 + noteInChord]

      this.playPluck(freq, now, 1.4)
      
      if (this.step % 8 === 0) {
        this.playPluck(freq * 2, now + 0.2, 1.6)
      }

      this.step = (this.step + 1) % 16
      this.timer = setTimeout(tick, 750)
    }

    tick()
  }

  stop() {
    this.isPlaying = false
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }
}

export const ambientSynth = new AmbientMusicPlayer()
