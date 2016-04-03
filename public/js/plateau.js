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
    this.img = "case.png";
}

Case.prototype.display = function() {
    return $("<img/>")
        .attr("src", "img/" + this.img)
        .css("width", TAILLE_CASE)
        .addClass("shadow");
};

Case.prototype.setImg = function(path) {
    this.img = path;
};


/**
 * Class Mur
 */
function Mur(type, ligne, col) {
    this.type = type;
    this.etat = "vide";
    this.ligne = ligne;
    this.col = col;
    this.shouldDisplay = true;
}

Mur.prototype.enableDisplay = function(bool) {
    this.shouldDisplay = bool;
};

Mur.prototype.display = function() {
    if (! this.shouldDisplay) return null;

    var disp = $("<td/>")
        .click(this.onClick.bind(this));

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

            if (col == taille - 1)
                this.mursVerticaux[ligne][col].enableDisplay(false);
            if (ligne == taille - 1)
                this.mursHorizontaux[ligne][col].enableDisplay(false);
        }
    }
}

Plateau.prototype.placePlayers = function(whitePos, blackPos) {
    this.whitePos = whitePos;
    this.blackPos = blackPos;
};

Plateau.prototype.display = function() {
    var table = $("#plateau").empty();

    for (var l = 0; l < this.taille; l++) {
        var tr = $("<tr/>");
        for (var c = 0; c < this.taille; c++) {

            if (l == this.whitePos.y && c == this.whitePos.x) {
                this.cases[l][c].setImg("white.png");
            }
            else if (l == this.blackPos.y && c == this.blackPos.x) {
                this.cases[l][c].setImg("black.png");
            }

            var td = $("<td/>");
            td.append(this.cases[l][c].display());

            tr.append(td)
                .append(this.mursVerticaux[l][c].display());
        }
        table.append(tr);

        var trMurs = $("<tr/>");
        for (c = 0; c < this.taille; c++) {
            var td = $("<td/>")
                .css("width", "10px");

            trMurs.append(this.mursHorizontaux[l][c].display());

            if (c < this.taille - 1)
                trMurs.append(td);
        }
        table.append(trMurs);
    }
};