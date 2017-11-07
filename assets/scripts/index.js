'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
// const config = require('./auth/config')
// const events = require('./auth/events')
// function (() => {
//   setAPIOrigin(location, config)
// })
// $(() => {
//   events.addHandlers()
// $('.square').on('click')
// })
// console.log(this.id)
// alert(text)
// $('.square').on('click',)
function isWinner (state) {
  let winner = null
  if (state.r0c0 === state.r0c1 && state.r0c0 === state.r0c2 && state.r0c0 != null) {
    winner = state.r0c0
  } else if (state.r1c0 === state.r1c1 && state.r1c0 === state.r1c2 && state.r1c0 != null) {
    winner = state.r1c0
  } else if (state.r2c0 === state.r2c1 && state.r2c0 === state.r2c2 && state.r2c0 != null) {
    winner = state.r2c0
  } else if (state.r0c0 === state.r1c0 && state.r0c0 === state.r2c0 && state.r0c0 != null) {
    winner = state.r0c0
  } else if (state.r0c1 === state.r1c1 && state.r0c1 === state.r2c1 && state.r0c1 != null) {
    winner = state.r0c1
  } else if (state.r0c2 === state.r1c2 && state.r0c2 === state.r2c2 && state.r0c2 != null) {
    winner = state.r0c2
  } else if (state.r0c0 === state.r1c1 && state.r0c0 === state.r2c2 && state.r0c0 != null) {
    winner = state.r0c0
  } else if (state.r2c0 === state.r1c1 && state.r2c0 === state.r0c2 && state.r2c0 != null) {
    winner = state.r2c0
  } else if (state.r0c0 != null && state.r0c1 != null && state.r0c2 != null && state.r1c0 != null && state.r1c1 != null && state.r1c2 != null && state.r2c0 != null && state.r2c1 != null && state.r2c2 != null) {
    winner = 'draw'
  }
  return winner
}
$(document).ready()
$('#newGame').click(function () {
  $('.square').text('')
})
let turn = 'X'
const state = {r0c0: null, r0c1: null, r0c2: null, r1c0: null, r1c1: null, r1c2: null, r2c0: null, r2c1: null, r2c2: null}
$('.square').click(function () {
  let winner = null
  // const state = this.id
  if (state[this.id] === null) {
    $(this).text(turn) // this puts x or o in the box
    state[this.id] = turn // this puts x or o in the state variable
    winner = isWinner(state)
    // alert(winner)
    if (winner != null) {
      if (winner === 'draw') {
        alert('game is a draw')
      } else {
        alert(`winner is ${winner}`)
      }
    }
    if (turn === 'X') {
      turn = 'O'
    } else {
      turn = 'X'
    }
  }
  // console.log(this.id)
  // alert(text)
})

// $('.square').on('click',)

// use require with a refer ence to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
