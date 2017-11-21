'use strict'
import * as Cookies from 'js-cookie'
// const setAPIOrigin = require('../../scr/set-api-origin')
// const config = require('./auth/config')
// const events = require('./auth/events'

// (() => {
// setAPIOrigin(location, config)
// })
function updateGame (token, id, index, value, over) {
  // console.log(token)
  const url = 'http://tic-tac-toe.wdibos.com/games/' + id
  const data = {'game': {'cell': {'index': index, 'value': value}, 'over': over}}
  $.ajax({
    type: 'PATCH',
    url: url,
    data: data,
    headers: {'Authorization': 'Token ' + token}, // WTF? documentation unclear
    dataType: 'JSON',
    success: function (data) {
      // console.log(data)
    }
  })
}
function getGame (token, id, state) {
  const url = 'http://tic-tac-toe.wdibos.com/games/' + id
  $.ajax({
    type: 'GET',
    url: url,

    headers: {'Authorization': 'Token ' + token}, // WTF? documentation unclear
    dataType: 'JSON',
    success: function (data) {
      // console.log(data)
      if (data['game']['cells'][0] === '') {
        data['game']['cells'][0] = null
      }
      if (data['game']['cells'][1] === '') {
        data['game']['cells'][1] = null
      }
      if (data['game']['cells'][2] === '') {
        data['game']['cells'][2] = null
      }
      if (data['game']['cells'][3] === '') {
        data['game']['cells'][3] = null
      }
      if (data['game']['cells'][4] === '') {
        data['game']['cells'][4] = null
      }
      if (data['game']['cells'][5] === '') {
        data['game']['cells'][5] = null
      }
      if (data['game']['cells'][6] === '') {
        data['game']['cells'][6] = null
      }
      if (data['game']['cells'][7] === '') {
        data['game']['cells'][7] = null
      }
      if (data['game']['cells'][8] === '') {
        data['game']['cells'][8] = null
      }
      state = {r0c0: data['game']['cells'][0], r0c1: data['game']['cells'][1], r0c2: data['game']['cells'][2], r1c0: data['game']['cells'][3], r1c1: data['game']['cells'][4], r1c2: data['game']['cells'][5], r2c0: data['game']['cells'][6], r2c1: data['game']['cells'][7], r2c2: data['game']['cells'][8]}
      console.log(state)
    }
  })
  console.log(state)
  return state
}

function createGame (token) {
  const url = 'http://tic-tac-toe.wdibos.com/games'
  $.ajax({
    type: 'POST',
    url: url,
    headers: {'Authorization': 'Token ' + token}, // WTF? documentation unclear
    dataType: 'JSON',
    success: function (data) {
      Cookies.set('game_id', data['game']['id'])
      // console.log(data)
    }
  })
}

function fetchGames (token) {
  const url = 'http://tic-tac-toe.wdibos.com/games'
  $.ajax({
    type: 'GET',
    url: url,
    headers: {'Authorization': 'Token ' + token}, // WTF? documentation unclear
    dataType: 'JSON',
    success: function (data) {
      // console.log(data)
      let htmlString = ''
      data['games'].map(function (item) {
        if (item === null) {
        } else {
          htmlString = htmlString + `<a href="#" class='gamelink' id=${item['id']}>game ${item['id']}</a><br>`
        }
      })
      $('#current_games').html(htmlString)
    }
  })
}

function drawState (state) {
  console.log(state)
  $.each(state, function (key, value) {
    $(`#${key}`).text(value)
  })
}

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
      // console.log(data)
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
      // store.user = data.user
      Cookies.set('userdata', {'id': data.user.id, 'email': data.user.email, 'token': data.user.token})
      $('#game').show()
      console.log(data)
      if (Cookies.getJSON('game_id') === undefined) {
        createGame(data.user.token)
      } else {
        getGame(Cookies.getJSON('userdata').token, Cookies.getJSON('game_id'), state)
        drawState(state)
      }
      fetchGames(data.user.token)
    }
  })
  e.preventDefault()
})
$('#sign-out').submit(function (e) {
  // const signOut = $('#sign-out').val()
  const userId = Cookies.getJSON('userdata').id
  const userToken = Cookies.getJSON('userdata').token
  const data = {'id': userId}
  const url = 'http://tic-tac-toe.wdibos.com/sign-out/' + userId
  $.ajax({
    type: 'DELETE',
    url: url,
    headers: {'Authorization': 'Token ' + userToken}, // WTF? documentation unclear
    data: data,
    dataType: 'JSON',
    success: function (data) {
      Cookies.remove('userdata')
      $('#game').hide()
      // console.log(data)
    }
  })
  e.preventDefault()
})
$('#change-password').submit(function (e) {
  const oldPassword = $('[name=old-password]').val()
  // console.log(oldPassword)
  const newPassword = $('[name=new-password]').val()
  // console.log(newPassword)
  const userToken = Cookies.getJSON('userdata').token
  const data = {'passwords': {'old': oldPassword, 'new': newPassword}}
  const userId = Cookies.getJSON('userdata').id
  const url = 'http://tic-tac-toe.wdibos.com/change-password/' + userId
  $.ajax({
    type: 'PATCH',
    url: url,
    headers: {'Authorization': 'Token ' + userToken}, // WTF? documentation unclear
    data: data,
    dataType: 'JSON',
    success: function (data) {
      // console.log(data)
      // console.log(userToken)
    },
    error: function (data) {
      // console.log(data)
      // console.log(userToken)
    }
  })
  e.preventDefault()
})
$('#newGame').click(function () {
  createGame(Cookies.getJSON('userdata').token)
  fetchGames(Cookies.getJSON('userdata').token)
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
      let index = 0
      if (this.id === 'r0c0') {
        index = 0
      } else if (this.id === 'r0c1') {
        index = 1
      } else if (this.id === 'r0c2') {
        index = 2
      } else if (this.id === 'r1c0') {
        index = 3
      } else if (this.id === 'r1c1') {
        index = 4
      } else if (this.id === 'r1c2') {
        index = 5
      } else if (this.id === 'r2c0') {
        index = 6
      } else if (this.id === 'r2c1') {
        index = 7
      } else if (this.id === 'r2c2') {
        index = 8
      }
      let over = true
      if (winner === null) {
        over = false
      }
      updateGame(Cookies.getJSON('userdata').token, Cookies.getJSON('game_id'), index, turn, over)
      if (turn === 'X') {
        turn = 'O'
      } else {
        turn = 'X'
      }
    }
  }
})

$('#current_games').on('click', '.gamelink', function (e) {
  const id = this.id
  console.log(id)
  const token = Cookies.getJSON('userdata').token
  Cookies.set('game_id', id)
  state = getGame(token, id, state)
  console.log(state)
  drawState(state)
  e.preventDefault()
})

// $('.square').on('click',)

// use require with a refer ence to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
