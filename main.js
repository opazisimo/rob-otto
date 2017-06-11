/* ---------- Comienzo Model ---------- */

// Modelo Tablero
class Tablero {
  constructor(w, h){
   this.x = 0 //Posiciones
   this.y = 0
   this.width = w //Medidas del tablero
   this.height = h
  }
}
// Modelo meta/PowerUp
class Meta{
  constructor(x,y){
    this.pos_x = x //Posiciones
    this.pos_y = y
  }
}
// Modelo Player
class Player {
  constructor(x,y,colour){
    this.pos_x = x //Posiciones
    this.pos_y = y
    this.colour = colour //Color jugador
    this.div = `<div class='${this.colour}'></div>`
    this.name = ' '
    this.puntos = 0
  }
}
// Modelo que contiene la muestra de los turnos
class Turnos{
  constructor() {
    this.player1 = document.getElementById('player1')
    this.player2 = document.getElementById('player2')
  }
}
// Modelo que crea el juego
class Game{
  constructor(){
    this.board = new Tablero(10,10)
    this.player1 = new Player(~~(Math.random() * 10),~~(Math.random() * 10), 'green')
    this.player2 = new Player(~~(Math.random() * 10),~~(Math.random() * 10), 'crimson')
    this.meta = new Meta(~~(Math.random() * 10),~~(Math.random() * 10)) // Ubicación random del PowerUp
    this.turnar = new Turnos()
    this.partidas = 0
  }
}


/* ---------- Fin Model ---------- */



/* ---------- Comienzo View ---------- */

// Imprimir tablero
Tablero.prototype.print = function(){
  let tabla = document.getElementById('game')
  let html = ''
  // Se crea la grilla de divs
  for (var i = 0; i < this.height; i++){
    html += '<div class="fila">'
    for (var j = 0; j < this.width; j++){
      html += '<div class="square"></div> '
    }
    html += '</div>'
  }
  tabla.innerHTML = html
}
// Imprimir meta
Meta.prototype.draw = function(){
  let filas = document.getElementsByClassName('fila')
  let cols = filas[this.pos_y].getElementsByClassName('square')
  cols[this.pos_x].innerHTML = `<div id='powerup'></div>`
}
// Imprimir puntos
Player.prototype.printPuntos = function(id){
  var p1 = document.getElementById(id)
  p1.innerHTML = `Puntos: ${this.puntos}`
}
// Dibujar player y contar puntos (separar función)
Player.prototype.draw = function(){
  var filas = document.getElementsByClassName('fila')
  var cols = filas[this.pos_y].getElementsByClassName('square')
  var newMeta = new Meta(~~(Math.random() * 10),~~(Math.random() * 10))
  if(cols[this.pos_x].innerHTML !== ''){
    alert('punto para ' + this.name)
    this.puntos++
    if(this.name == document.getElementById('player1').value){
      this.printPuntos('puntos1')
      newMeta.draw()
    } else {
      this.printPuntos('puntos2')
      newMeta.draw()
    }
  } else {
    cols[this.pos_x].innerHTML = this.div
  }
}

// Eliminar rastro player
Player.prototype.undraw = function(){
  let filas = document.getElementsByClassName('fila')
  let cols = filas[this.pos_y].getElementsByClassName('square')
  cols[this.pos_x].innerHTML = ""
}
// Cambiar color de las teclas al avanzar
Turnos.prototype.changeTeclaActiva = function(jugador, mov, active){
  let anterior = document.getElementsByClassName(active)[0]
  var arriba, abajo, izquierda, derecha

  if(jugador=='crimson'){
    arriba = document.getElementsByClassName('letra-up')[0]
    abajo = document.getElementsByClassName('letra-down')[0]
    izquierda = document.getElementsByClassName('letra-left')[0]
    derecha = document.getElementsByClassName('letra-right')[0]
  } else {
    arriba = document.getElementsByClassName('caret-up')[0]
    abajo = document.getElementsByClassName('caret-down')[0]
    izquierda = document.getElementsByClassName('caret-left')[0]
    derecha = document.getElementsByClassName('caret-right')[0]
  }

  switch (mov){
    case 'right':
      if(derecha==anterior){
        derecha.classList.add(active)
        break
      }
      derecha.classList.add(active)
      anterior.classList.remove(active)
      break
    case 'left':
      if(izquierda==anterior){
        izquierda.classList.add(active)
        break
      }
      izquierda.classList.add(active)
      anterior.classList.remove(active)
      break
    case 'up':
      if(arriba==anterior){
        arriba.classList.add(active)
        break
      }
      arriba.classList.add(active)
      anterior.classList.remove(active)
      break
    case 'down':
      if(abajo==anterior){
        abajo.classList.add(active)
        break
      }
      abajo.classList.add(active)
      anterior.classList.remove(active)
      break
  }
}
//Mostrar el juego al hacer click en el botón jugar
Game.prototype.mostrarJuego = function(){
  let juego = document.getElementById('juego')
  let nombres = document.getElementById('nombres')
  nombres.classList.add('invisible')
  juego.classList.remove('invisible')
  juego.classList.add('visible')
  var p1 = document.getElementById('nPlay1')
  var p2 = document.getElementById('nPlay2')
  var player1 = document.getElementById('player1')
  var player2 = document.getElementById('player2')
  p1.innerHTML = player1.value
  p2.innerHTML = player2.value
}

/* ---------- Fin View ---------- */



/* ---------- Comienzo Controlador ---------- */

// Método para mover a los players
Player.prototype.mover = function(mov){
  let filas = document.getElementsByClassName('fila')
  let cols = filas[this.pos_y].getElementsByClassName('square')
  var moveHorizontal, moveVertical
  if(mov == 'left' || mov == 'right'){
    switch (mov) {
      case 'right':
        moveHorizontal = this.pos_x + 1
        break
      case 'left':
        moveHorizontal = this.pos_x - 1
        break
    }
    this.undraw()
    this.pos_x = moveHorizontal
    this.draw()
  } else {
    switch (mov) {
      case 'up':
        moveVertical = this.pos_y - 1
        break
      case 'down':
        moveVertical = this.pos_y + 1
        break
    }
    this.undraw()
    this.pos_y = moveVertical
    this.draw()
  }
}
// Mover izquierda
Player.prototype.moveL = function() {
  this.mover('left')
}
// Mover derecha
Player.prototype.moveR = function() {
  this.mover('right')
}
// Mover arriba
Player.prototype.moveU = function() {
  this.mover('up')
}
// Mover abajo
Player.prototype.moveD = function() {
  this.mover('down')
}
// Reconocer nombre player y agregarlo al modelo
Player.prototype.agregarNombre = function(name){
  this.name = name
}

// Activar la funcionalidad del juego
Game.prototype.activarJuego = function(){
  var p1 = this.player1
  var p2 = this.player2
  this.player1.agregarNombre(document.getElementById('player1').value)
  this.player2.agregarNombre(document.getElementById('player2').value)
  var turno = this.turnar
  document.onkeydown = function(ev){
    // Hacer que cambie el mensaje de turno
    var player1 = document.getElementById('player1')
    var player2 = document.getElementById('player2')
    var box = document.getElementById("mensaje")
    var aux1 = p1
    var aux2 = p2
    var aux3 = turno
    // Cambiar el mensaje y según él, dejar jugar al player
    if (box.innerHTML === "Turno de " + player2.value) {
      box.innerHTML = "Turno de " + player1.value
      box.classList.add('msjGreen')
      box.classList.remove('msjCrim')
      switch (ev.keyCode) {
        case 65:
          aux2.moveL()
          aux3.changeTeclaActiva('crimson', 'left', 'active-crimson')
          break
        case 87:
          //'up'
          aux2.moveU()
          aux3.changeTeclaActiva('crimson', 'up', 'active-crimson')
          break
        case 68:
          //'right'
          aux2.moveR()
          aux3.changeTeclaActiva('crimson', 'right', 'active-crimson')
          break
        case 83:
          //'down'
          aux2.moveD()
          aux3.changeTeclaActiva('crimson', 'down', 'active-crimson')
          break
      }
    } else {
      box.innerHTML = "Turno de " + player2.value
      box.classList.add('msjCrim')
      box.classList.remove('msjGreen')
      switch (ev.keyCode) {
        case 37:
          aux1.moveL()
          aux3.changeTeclaActiva('green', 'left', 'active-green')
          break
        case 38:
          //'up'
          aux1.moveU()
          aux3.changeTeclaActiva('green', 'up', 'active-green')
          break
        case 39:
          //'right'
          aux1.moveR()
          aux3.changeTeclaActiva('green', 'right', 'active-green')
          break
        case 40:
          //'down'
          aux1.moveD()
          aux3.changeTeclaActiva('green', 'down', 'active-green')
          break
      }
    }
  }
}
// Darle play
Game.prototype.iniciar = function(){
  this.board.print() //Imprime el tablero
  this.meta.draw() //Dibuja la meta
  this.player1.draw() //Dibuja la posición inicial de los players
  this.player2.draw()
  this.activarJuego()
}
Game.prototype.play = function(){
  this.mostrarJuego()
  this.iniciar()
}
/* ---------- Fin Controlador ---------- */



//Comienzo juego
let game = new Game()
let btn = document.getElementById('jugar')
btn.addEventListener('click',function(){
  game.play()
})