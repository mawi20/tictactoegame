'use strict'
const config = require('../config')

const signUp = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}
const signIn = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
}
const changePassword = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/change-password/' + 'id',
    method: 'PATCH',
    header: {
      Authorization: 'Token: token=' + 'id'
    },
    data
  })
}
const signOut = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + 'id',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + 'token'
    },
    data
  })
}
module.exports = {
  signIn,
  signUp,
  changePassword,
  signOut
}
