/**
 * Example of multiple JS stacks
 */

function a() {
  b();
}

function b() {
  c();
}

function c() {
  console.log('Hello, World!');
}

function x() {
  y();
}

function y() {
  z();
}

function z() {
  console.log('Goodbye!');
}

a();
x();