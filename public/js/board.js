"use strict";

var NB_CASES = 9;
var TAILLE_CASE = "64px";
var TAILLE_MUR = "12px";

/**
 * Class Case
 */
function Case(ligne, col) {
    this.ligne = ligne;
    this.col = col;
}

Case.prototype.display = function() {
    return $("<img/>")
        .attr("src", "img/case.png")
        .css("width", TAILLE_CASE);
};


/**
 * Class Mur
 */
function Mur(type, ligne, col) {
    this.type = type;
    this.etat = "vide";
    this.ligne = ligne;
    this.col = col;
}

Mur.prototype.display = function() {
    var disp = $("<td/>")
        .click(this.onClick);

    if (this.type == "vertical") {
        disp.css("width", TAILLE_MUR);
    } else {
        disp.css("width", TAILLE_CASE)
            .css("height", TAILLE_MUR);
    }
    return disp;
};

Mur.prototype.onClick = function() {
    console.log("l:" + this.ligne + " c:" + this.col + " type:" + this.type);
};


/**
 * Class Plateau
 */
function Plateau(taille) {
    this.taille = taille;
    this.cases = [];
    this.mursVerticaux = [];
    this.mursHorizontaux = [];

    for (var ligne = 0; ligne < this.taille; ligne++) {
        this.cases[ligne] = [];
        this.mursVerticaux[ligne] = [];
        this.mursHorizontaux[ligne] = [];

        for (var col = 0; col < this.taille; col ++) {
            this.cases[ligne][col] = new Case(ligne, col);
            this.mursVerticaux[ligne][col] = new Mur("vertical", ligne, col);
            this.mursHorizontaux[ligne][col] = new Mur("horizontal", ligne, col);
        }
    }
}

Plateau.prototype.display = function() {
    var table = $("#plateau");

    for (var l = 0; l < this.taille; l++) {
        var tr = $("<tr/>");
        for (var c = 0; c < this.taille; c++) {
            var td = $("<td/>");
            td.append(this.cases[l][c].display());
            tr.append(td)
                .append(this.mursVerticaux[l][c].display());
        }
        table.append(tr);

        var trMurs = $("<tr/>");
        for (c = 0; c < this.taille; c++) {
            trMurs.append(this.mursHorizontaux[l][c].display())
                .append($("<td/>").css("width", "10px"));
        }
        table.append(trMurs);
    }
};