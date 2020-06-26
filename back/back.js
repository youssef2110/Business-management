var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

//var bodyParser =require('body-parser');
const app = express();
//app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Client
app.get("/api/getclient", function(req, rep) {
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Fasta");
		const collection = dbo.collection("client");
		collection.find().toArray((err, cli) => {
			rep.json(cli);
		});
	});
});
app.post("/api/Addclient", function(req, rep) {
	client = req.body;
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Fasta");
		const collection = dbo.collection("client");
		collection.insertOne(
			{
				Ref: client.Ref,
				Nom: client.Nom,
				Tel: client.Tel,
				Address: client.Address,
				Ville: client.Ville,
				Email: client.Email
			},
			(err, cli) => {
				if (cli) {
					rep.send([{ statue: "Client Ajouté" }, { client: cli }]);
				} else rep.send([{ statue: "Echec" }, { client: cli }]);
			}
		);
	});
});

// Achat
app.get("/api/getachat", function(req, rep) {
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Fasta");
		const collection = dbo.collection("achat");
		collection.find().toArray((err, ch) => {
			rep.json(ch);
		});
	});
});
app.post("/api/Addachat", function(req, rep) {
	achat = req.body;
	data = [];
	n = achat.nbr;
	for (var i = 1; i <= achat.nbr; i++) {
		data.push(new mdata(achat["Nomp" + i], achat["quantite" + i]));
	}
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Fasta");
		const collection = dbo.collection("achat");
		const collection2 = dbo.collection("Stock");
		const collection3 = dbo.collection("prodentree");
		collection.insertOne(
			{
				Ref: achat.Ref,
				Nomf: achat.Nomf,
				nbr: achat.nbr,
				produit: data,
				date: achat.date
			},
			(err, vt) => {
				if (vt) {
					rep.send([{ statue: "Ajouté" }, { achat: vt }]);
				} else rep.send([{ statue: "Echec" }, { achat: vt }]);
			}
		);
		for (var j = 0; j < n; j++) {
			No = data[j].Nomp.toString();
			Nb = parseInt(data[j].quantite);

			collection2.updateOne(
				{ Nom: No },
				{ $inc: { stock: +Nb } },
				(err, it) => {}
			);
			collection2.findOne({ Nom: No }, (err, item) => {
				collection3.insertOne(
					{ Ref: achat.Ref, Nom: No, type: item.Type, nbrstock: Nb, derMaj: achat.date },
					(err, cc) => {}
				);
			});
		}
	});
});

// Vente
app.get("/api/getvente", function(req, rep) {
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Fasta");
		const collection = dbo.collection("vente");
		collection.find().toArray((err, vt) => {
			rep.json(vt);
		});
	});
});
app.post("/api/Addvente", function(req, rep) {
	vente = req.body;
	data = [];
	n = vente.nbr;
	for (var i = 1; i <= vente.nbr; i++) {
		data.push(new mdata(vente["Nomp" + i], vente["quantite" + i]));
	}
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Fasta");
		const collection = dbo.collection("vente");
		const collection2 = dbo.collection("Stock");
		const collection3 = dbo.collection("prodsortie");
		collection.insertOne(
			{
				Ref: vente.Ref,
				Nomc: vente.Nomc,
				nbr: vente.nbr,
				produit: data,
				type: vente.type,
				date: vente.date
			},
			(err, vt) => {
				if (vt) {
					rep.send([{ statue: "Ajouté" }, { vente: vt }]);
				} else rep.send([{ statue: "Echec" }, { vente: vt }]);
			}
		);
		for (var j = 0; j < n; j++) {
			No = data[j].Nomp.toString();
			Nb = parseInt(data[j].quantite);

			collection2.updateOne(
				{ Nom: No },
				{ $inc: { stock: -Nb } },
				(err, it) => {}
			);
			collection2.findOne({ Nom: No }, (err, item) => {
				collection3.insertOne(
					{ Ref: vente.Ref, Nom: No, type: item.Type, nbrstock: Nb, derMaj: vente.date },
					(err, cc) => {}
				);
			});
		}
	});
});

//Fournisseur
app.get("/api/getfournisseur", function(req, rep) {
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Fasta");
		const collection = dbo.collection("fournisseur");
		collection.find().toArray((err, frs) => {
			rep.json(frs);
		});
	});
});
app.post("/api/Addfourn", function(req, rep) {
	fourn = req.body;
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Fasta");
		const collection = dbo.collection("fournisseur");
		collection.insertOne(
			{
				Ref: fourn.Ref,
				Nom: fourn.Nom,
				Tel: fourn.Tel,
				Address: fourn.Address,
				Ville: fourn.Ville,
				Email: fourn.Email
			},
			(err, frn) => {
				if (frn) {
					rep.send([{ statue: "fournisseur Ajouté" }, { fourn: frn }]);
				} else rep.send([{ statue: "Echec" }, { fourn: frn }]);
			}
		);
	});
});

//test
app.get("/api/fourn", function(req, rep) {
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Fasta");
		const collection = dbo.collection("fournisseur");
		collection.findOne({ Id: "5542" }, (err, us) => {
			if (us) {
				rep.send({ user: us });
			} else {
			}
		});
	});
});

//Stock
app.get("/api/getstock", function(req, rep) {
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Fasta");
		const collection = dbo.collection("Stock");
		collection.find().toArray((err, prod) => {
			rep.json(prod);
		});
	});
});
app.get("/api/getstocke", function(req, rep) {
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Fasta");
		const collection = dbo.collection("prodentree");
		collection.find().toArray((err, prod) => {
			rep.json(prod);
		});
	});
});
app.get("/api/getstocks", function(req, rep) {
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Fasta");
		const collection = dbo.collection("prodsortie");
		collection.find().toArray((err, prod) => {
			rep.json(prod);
		});
	});
});
app.post("/api/Addproduit", function(req, rep) {
	stock = req.body;
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Fasta");
		const collection = dbo.collection("Stock");
		collection.insertOne(
			{
				Nom: stock.Nom,
				Type: stock.type,
				Ref: stock.Ref,
				Prix: stock.prix,
				stock: 0
			},
			(err, stk) => {
				if (stk) {
					rep.send([{ statue: "Produit Ajouté" }, { stock: stk }]);
				} else rep.send([{ statue: "Echec" }, { stock: stk }]);
			}
		);
	});
});
app.post("/api/Editsto", function(req, rep) {
	stock = req.body;
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Fasta");
		const collection = dbo.collection("Stock");
		collection.updateOne({Ref: stock.Tex}, {'$set': {
			Nom: stock.nom,
			Type: stock.Type,
			Ref: stock.num,
			Prix: stock.prix,
			stock: stock.nbrstock
		}}, (err, item) => {
		})
	});
});
app.get("/api/Delsto/:id", function(req, rep) {
	Num = req.params.id;
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Fasta");
		const collection = dbo.collection("Stock");
		collection.deleteOne({Ref: Num}, (err, item) => {
		})
	});
});

//Users
app.get("/api/getuser", function(req, rep) {
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Fasta");
		const collection = dbo.collection("user");
		collection.find().toArray((err, cli) => {
			rep.json(cli);
		});
	});
});
app.post("/api/Adduser", function(req, rep) {
	user = req.body;
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Fasta");
		const collection = dbo.collection("user");
		collection.insertOne(
			{
				Nom: user.Nom,
				Prenom: user.Prenom,
				Iden: user.Iden,
				Service: user.Service,
				Password: user.Password
			},
			(err, stk) => {
				if (stk) {
					rep.send([{ statue: "Utilisateur Ajouté" }, { stock: stk }]);
				} else rep.send([{ statue: "Echec" }, { stock: stk }]);
			}
		);
	});
});
app.post("/api/Edituse", function(req, rep) {
	user = req.body;
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Fasta");
		const collection = dbo.collection("user");
		collection.updateOne({Iden: user.Tex}, {'$set': {
			Nom: user.nom,
			Prenom: user.prenom,
			Iden: user.iden,
			Service: user.service,
			Password: user.password
		}}, (err, item) => {
		})
	});
});
app.get("/api/Deluse/:id", function(req, rep) {
	Num = req.params.id;
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Fasta");
		const collection = dbo.collection("user");
		collection.deleteOne({Iden: Num}, (err, item) => {
		})
	});
});

app.post("/api/TryLogin", function(req, rep) {
	user = req.body;
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Fasta");
		const collection = dbo.collection("user");
		collection.findOne({ Iden: user.Iden, Password: user.Pass }, (err, us) => {
			if (us) {
				if(us.Service != "Admin"){
				rep.send([{ statue: "Success" }, { user: us }]);
				}else rep.send([{ statue: "Echec" }, { user: us }]);
			} else rep.send([{ statue: "Echec" }, { user: us }]);
		});
	});
});
app.post("/api/TryLogina", function(req, rep) {
	user = req.body;
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Fasta");
		const collection = dbo.collection("user");
		collection.findOne({ Iden: user.Iden, Password: user.Pass,Service :"Admin" }, (err, us) => {
			if (us) {
				rep.send([{ statue: "Success" }, { user: us }]);
			} else rep.send([{ statue: "Echec" }, { user: us }]);
		});
	});
});
class mdata {
	Nomp;
	quantite;
	constructor(Nomp, quantite) {
		this.Nomp = Nomp;
		this.quantite = quantite;
	}
}

app.listen(3000);
