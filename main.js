const canvas = document.querySelector("canvas#canvas")
canvas.width = innerWidth
canvas.height = innerHeight
const ctx = canvas.getContext("2d")
const projectileSound = document.querySelector("audio.projectile-sound")
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

const player = new Player(canvas.width / 2, canvas.height / 2, 10, 'white')

const projectiles = []
const enemies = []

addEventListener('click', (event) => {
  const x = player.x
  const y = player.y
  const radius = 5
  const color = player.color
  const angle = Math.atan2(event.clientY - player.y, event.clientX - player.x)
  const velocity = { x: Math.cos(angle) * 5, y: Math.sin(angle) * 5}

  const projectile = new Projectile(x, y, radius, color, velocity)
  projectiles.push(projectile)
  // TODO::  sound effect stops when player lose
  if (animationId) {
    projectileSound.currentTime = 0
    projectileSound.play()
  }
})

function generateEnemies() {
  setInterval(() => {
  let radius = Math.random() * (30 - 4) + 4 
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
    const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
  const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)
  const velocity = { x: Math.cos(angle), y: Math.sin(angle) }

  enemies.push(new Enemy(x, y, radius, color, velocity))
  }, 1000)
}

let animationId

function animate() {
  animationId = requestAnimationFrame(animate)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  player.draw()
  enemies.forEach((enemy, enemyIndex) => {
    enemy.update()
    // End Game
    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
    if (dist - enemy.radius - player.radius < 1) {
      cancelAnimationFrame(animationId)
    }

    // Array splice
    // const r = [1, 2, 3, 4]
    // r.splice(0, 1)
    // console.log(r)

    //projectile touch enemy
    projectiles.forEach((projectile, projectileIndex) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
      if (dist - enemy.radius - projectile.radius < 1) {
        if (enemy.radius - 10 > 5) {
          enemy.radius -= 10
          setTimeout(() => {
            projectiles.splice(projectileIndex, 1)
          }, 0)
        } else {
          setTimeout(() => {
            enemies.splice(enemyIndex, 1)
            projectiles.splice(projectileIndex, 1)
          }, 0)
        }
      }
    })

  })
  projectiles.forEach((projectile, projectileIndex) => {
    projectile.update()
    if (projectile.x - projectile.radius < 0 || 
        projectile.x + projectile.radius > canvas.width ||
        projectile.y - projectile.radius < 0 ||
        projectile.y + projectile.radius > canvas.height
      )  {
      setTimeout(() => {
        projectiles.splice(projectileIndex, 1)
      }, 0)
    }
  })
}

animate()
generateEnemies()

