var express = require('express');
var app = express();
var sqlite3 = require("sqlite3");
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(bodyParser.json());

console.log(process.env.connectionstring)

dbFactory = {
  getConnection: () => {
    file = process.env.connectionstring || "juridico.db";
    return new sqlite3.Database(file);
  }
}


app.get("/", function (req, res) {
  var db = dbFactory.getConnection();
  var sql = "select * from processos"
  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });

  db.close();
});

app.get("/:numero", function (req, res) {
  var db = dbFactory.getConnection();
  db.serialize(function () {
    db.get("select * from processos where numero=$numero", { $numero: req.params.numero }, function (err, row) {
      res.send(row);
    });

  });

  db.close();
});

app.post("/", function (req, res) {
  var db = dbFactory.getConnection();
  db.run("insert into processos(numero, uf_sigla, cidade, reu, identidade, cliente, status) values($numero, $uf_sigla, $cidade, $reu, $identidade, $cliente, $status )", {
    $numero: req.body.numero,
    $uf_sigla: req.body.uf_sigla,
    $cidade: req.body.cidade,
    $reu: req.body.reu,
    $identidade: req.body.identidade,
    $cliente: req.body.cliente,
    $status: req.body.status
  }, (err) => {
    if (err == null)
    {
      res.status(202);
      res.send("Processo lançado");
    }
    else {

      console.log(err);
      res.send(err);
      res.status(500);
    }
  });
})

app.put("/status", function (req, res) {
  var db = dbFactory.getConnection();
  db.run("update processos set status=$status where numero=$numero", {
    $status: req.body.status,
    $numero: req.body.numero
  },
    (err) => {
      if (err == null)
        res.send("Status Alterado");
      else {
        console.log(err);
        res.send(err);
        res.status(500);
      }
    });
})

app.delete("/:numero", function (req, res) {
  var db = dbFactory.getConnection();
  db.run("delete from processos where numero=$numero", { $numero: req.params.numero },
    (err) => {
      if (err == null)
        res.send("Processo excluido");
      else {
        console.log(err);
        res.send(err);
        res.status(500);
      }
    });
})

app.listen('3001');
console.log("Server running on port 3001");


class processo {
  numero
  uf_sigla
  cidade
  reu
  cliente
  status
}
