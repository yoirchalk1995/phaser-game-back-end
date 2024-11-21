const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'sql205.infinityfree.com',
  user: 'if0_37758413',
  password: '5rFXXYSe7V4r95',
  database: 'if0_37758413_high_scores'
})

db.connect((err)=>{
  if (err){
    console.log('database conection failes:', err.stack);
    return;
  }
  console.log('connected to database')
});

module.exports = db;