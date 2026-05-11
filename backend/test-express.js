const express = require('express');
const app = express();
try {
  app.get('*', (req, res) => {});
  console.log("'*' worked");
} catch(e) {
  console.log("'*' failed:", e.message);
}
try {
  app.get('/*', (req, res) => {});
  console.log("'/*' worked");
} catch(e) {
  console.log("'/*' failed:", e.message);
}
try {
  app.get('/(.*)', (req, res) => {});
  console.log("'/(.*)' worked");
} catch(e) {
  console.log("'/(.*)' failed:", e.message);
}
try {
  app.get(/.*/, (req, res) => {});
  console.log("/.*/ worked");
} catch(e) {
  console.log("/.*/ failed:", e.message);
}
