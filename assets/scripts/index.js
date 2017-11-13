'use strict'
import * as Cookies from 'js-cookie'
// const setAPIOrigin = require('../../scr/set-api-origin')
// const config = require('./auth/config')
// const events = require('./auth/events'

// (() => {
// setAPIOrigin(location, config)
// })
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
let winner = null
let turn = 'X'
let state = {r0c0: null, r0c1: null, r0c2: null, r1c0: null, r1c1: null, r1c2: null, r2c0: null, r2c1: null, r2c2: null}
$('#game').hide()
$('#result').hide()
$('#sign-up').submit(function (e) {
  const signUpEmail = $('#sign-up-email').val()
  const signUpPassword = $('#sign-up-password').val()
  const signUpPasswordConfirmation = $('#sign-up-password-confirmation').val()
  const data = {'credentials': {'email': signUpEmail, 'password': signUpPassword, 'password_confirmation': signUpPasswordConfirmation}}
  const url = 'http://tic-tac-toe.wdibos.com/sign-up'
  $.ajax({
    type: 'POST',
    url: url,
    data: data,
    dataType: 'JSON',
    success: function (data) {
      Cookies.set('userdata', {'id': data.user.id, 'email': data.user.email})
      $('#game').show()
      console.log(data)
    }
  })
  e.preventDefault()
})
$('#sign-in').submit(function (e) {
  const signInEmail = $('#sign-in-email').val()
  const signInPassword = $('#sign-in-password').val()
  const data = {'credentials': {'email': signInEmail, 'password': signInPassword}}
  const url = 'http://tic-tac-toe.wdibos.com/sign-in'
  $.ajax({
    type: 'POST',
    url: url,
    data: data,
    dataType: 'JSON',
    success: function (data) {
      Cookies.set('userdata', {'id': data.user.id, 'email': data.user.email, 'token': data.user.token})
      $('#game').show()
      console.log(data)
    }
  })
  e.preventDefault()
})
$('#sign-out').submit(function (e) {
  // const signOut = $('#sign-out').val()
  const userId = Cookies.getJSON('userdata').id
  const userToken = Cookies.getJSON('userdata').token
  const data = {'id': userId}
  const url = 'http://tic-tac-toe.wdibos.com/sign-out' + userId
  $.ajax({
    type: 'DELETE',
    url: url,
    headers: {'Authorization': 'token=' + userToken}, // WTF? documentation unclear
    data: data,
    dataType: 'JSON',
    success: function (data) {
      Cookies.remove('userdata')
      $('#game').hide()
      console.log(data)
    }
  })
  e.preventDefault()
})
$('#change-password').submit(function (e) {
  const oldPassword = $('#old-password').val()
  const newPassword = $('#new-password').val()
  const userToken = Cookies.getJSON('userdata').token
  const data = {'old': oldPassword, 'new': newPassword}
  const userId = Cookies.getJSON('userdata').id
  const url = 'http://tic-tac-toe.wdibos.com/change-password/' + userId
  $.ajax({
    type: 'PATCH',
    url: url,
    headers: {'Authorization': 'token=' + userToken}, // WTF? documentation unclear
    data: data,
    dataType: 'JSON',
    success: function (data) {
      console.log(data)
      console.log(userToken)
    },
    error: function (data) {
      console.log(data)
      console.log(userToken)
    }
  })
  e.preventDefault()
})
$('#newGame').click(function () {
  // console.log('Yo')
  $('.square').each(function () {
    // console.log('sq')
    $(this).text('')
  })
  turn = 'X'
  state = {r0c0: null, r0c1: null, r0c2: null, r1c0: null, r1c1: null, r1c2: null, r2c0: null, r2c1: null, r2c2: null}
  winner = null
  $('#result').hide()
})
$('.square').click(function () {
  if (winner === null) {
  // const state = this.id
    if (state[this.id] === null) {
      $(this).text(turn) // this puts x or o in the box
      state[this.id] = turn // this puts x or o in the state variable
      winner = isWinner(state)
      // alert(winner)
      if (winner != null) {
        if (winner === 'draw') {
          // alert('game is a draw')
          $('#result').show()
          $('#result').text('game is a draw')
        } else {
          // alert(`winner is ${winner}`)
          $('#result').show()
          $('#result').text(`winner is ${winner}`)
        }
      }
      if (turn === 'X') {
        turn = 'O'
      } else {
        turn = 'X'
      }
    }
  }
})

// $('.square').on('click',)

// use require with a refer ence to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
