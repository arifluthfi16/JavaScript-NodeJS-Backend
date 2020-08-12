// run_backup.js
require('dotenv').config();
const execFile = require('child_process').execFile;
const date = new Date();
const current_date = `${date.getFullYear()}-${date.getMonth() +
	1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}`;
const backup_file = `export_${current_date}`;
const backup_file_ext = `export_${current_date}.tar`;

let backup_script = `pg_dump --username=${process.env.DB_USER} ${process.env.DB_DATABASE}`;

var script = execFile(
  `./backup.sh`,
  [backup_script, backup_file, process.env.DB_PASSWORD],
  (error, stdout, stderr) => {
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
    console.log('Backup complete!')
  }
);