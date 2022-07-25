const canvas = document.querySelector("canvas#canvas")
canvas.width = innerWidth
canvas.height = innerHeight
const ctx = canvas.getContext("2d")
// ctx.fillRect(0, 0, 200, 200)
// ctx.clearRect(0, 0, 190, 190)

// ctx.beginPath()
// ctx.arc(100, 100, 50, 0, Math.PI * 2, false)
// ctx.fillStyle = 'pink'
// ctx.fill()
// ctx.strokeStyle = 'red'
// ctx.lineWidth = 12
// ctx.stroke()
// ctx.fillRect(200, 100, 200, 200)

class Player {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
  }

  update() {
    this.draw()
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y

  }
}

class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
  }

  update() {
    this.draw()
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y

  }
}

const player = new Player(canvas.width / 2, canvas.height / 2, 30, 'blue')

const projectiles = []
const enemies = []

addEventListener('click', (event) => {
  const x = canvas.width / 2
  const y = canvas.height / 2
  const radius = 5
  const color = 'red'
  const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2)
  const velocity = { x: Math.cos(angle), y: Math.sin(angle) }

  const projectile = new Projectile(x, y, radius, color, velocity)
  projectiles.push(projectile)
})

function generateEnemies() {
  // setInterval(() => {
  const radius = 30
  let x
  let y

  if (Math.random() < 0.5) {
    x = Math.random() < 0.5 ? canvas.width + radius : 0 - radius
    y = Math.random() * canvas.height
  } else {
    x = Math.random() * canvas.width
    y = Math.random() < 0.5 ? canvas.height + radius : 0 - radius
  }

  // const y = Math.random() < 0.5 ? Math.random() * canvas.height : 0 - radius
  const color = 'green'
  const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)
  const velocity = { x: Math.cos(angle), y: Math.sin(angle) }

  enemies.push(new Enemy(x, y, radius, color, velocity))
  // }, 1000)
}

let animationId

function animate() {
  animationId = requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  player.draw()
  enemies.forEach((enemy) => {
    enemy.update()
    // End Game
    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
    if (dist - enemy.radius - player.radius < 1) {
      cancelAnimationFrame(animationId)
    }

    projectiles.forEach((projectile) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
      if (dist - enemy.radius - projectile.radius < 1) {

      }
    })

  })
  projectiles.forEach((projectile) => {
    projectile.update()
  })
}

animate()
generateEnemies()

// To the next Session
// [1, 2, 3, 4].forEach((item, index) => {
//   console.log(index);
// })