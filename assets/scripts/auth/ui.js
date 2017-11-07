'use strict'

const signInSuccess = function (data) {
  console.log(data)
  $('#message').text('Signed in succesfully')
}

const signInFailure = function (error) {
  console.error(error)
  $('#message').text('Error on sign in')
}
const signUpFailure = function (error) {
  console.error(error)
  $('#message').text('Error on sign up')
}
const signUpSuccess = function (data) {
  console.log(data)
  $('#message').text('Signed up succesfully')
}
const changePasswordFailure = function (error) {
  console.error(error)
  $('#message').text('changePassword ')
}
const changePasswordSuccess = function (data) {
  console.log(data)
  $('#message').text('changePassword succesfully')
}
const signOut = function (data) {
  console.log(data)
  $('#message').text('signOut')
}
module.exports = {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
  changePasswordFailure,
  changePasswordSuccess,
  signOut
}
