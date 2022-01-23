const fs = require('fs');

fs.readFile('/etc/passwd',
  (err, data) => {
    if (err) throw err;
    console.log(data);
  }
);

setImmediate(() => {
  console.log('This run while file is being read!!!');
});

