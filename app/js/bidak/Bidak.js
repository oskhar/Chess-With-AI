// Lib
import { ClassBidak } from "./ClassBidak.js";

// Class
export class Pion extends ClassBidak {

    // Constructor
    constructor (gambar, x, y, poin, papan_catur, area, pihak, nama, i) {

        // Jalankan construct parent
        super(gambar, x, y, poin, papan_catur, area, pihak, nama, i);

        // Atribute
        this.first = true;

    }

    // Method
    legal_move(data) {

        const moves = [];
        const tmp_y = this.pihak == 'p' ? -1 : 1;
    
        // cek apakah langkah ke depan bisa diambil
        const nextRow = data[this.y + tmp_y];
        if (nextRow && nextRow[this.x] == 'x') {
            moves.push([this.x + 0, tmp_y + this.y]);
    
            // cek apakah pion belum pernah bergerak dan bisa jalan 2 langkah ke depan
            if (this.first && data[this.y + 2 * tmp_y][this.x] == 'x') {
                moves.push([this.x + 0, 2 * tmp_y + this.y]);
            }
        }
    
        // cek apakah bisa makan bidak diagonal ke kiri
        const leftRow = data[this.y + tmp_y];
        if (leftRow) {
            if (leftRow[this.x - 1] && leftRow[this.x - 1][0] == this.lawan) {
                moves.push([this.x + -1, tmp_y + this.y]);
            }
        }
    
        // cek apakah bisa makan bidak diagonal ke kanan
        const rightRow = data[this.y + tmp_y];
        if (rightRow) {
            if (rightRow[this.x + 1] && rightRow[this.x + 1][0] == this.lawan) {
                moves.push([this.x + 1, tmp_y + this.y]);
            }
        }
    
        return moves;

    }
    

}

// Class
export class Benteng extends ClassBidak {

    // Constructor
    constructor (gambar, x, y, poin, papan_catur, area, pihak, nama, i) {

        // Jalankan construct parent
        super(gambar, x, y, poin, papan_catur, area, pihak, nama, i);

        // Atribute
        this.first = true;

    }

    // Method
    legal_move (data) {

        this.lmove = [];
        this.arah = [true, true, true, true];
        for (let i = 1; i < 8; i++) {
            if (this.y-i > -1 && this.arah[0]) {
                if (data[this.y-i][this.x] == "x") {
                    this.lmove.push([this.x + 0, -i + this.y]);
                } else if (data[this.y-i][this.x][0] == this.lawan) {
                    this.lmove.push([this.x + 0, -i + this.y]);
                    this.arah[0] = false;
                } else {
                    this.arah[0] = false;
                }
            }
            if (this.y+i < 8 && this.arah[1]) {
                if (data[this.y+i][this.x] == "x") {
                    this.lmove.push([this.x + 0, i + this.y]);
                } else if (data[this.y+i][this.x][0] == this.lawan) {
                    this.lmove.push([this.x + 0, i + this.y]);
                    this.arah[1] = false;
                } else {
                    this.arah[1] = false;
                }
            }
            if (this.x-i > -1 && this.arah[2]) {
                if (data[this.y][this.x-i] == "x") {
                    this.lmove.push([this.x + -i, 0 + this.y]);
                } else if (data[this.y][this.x-i][0] == this.lawan) {
                    this.lmove.push([this.x + -i, 0 + this.y]);
                    this.arah[2] = false;
                } else {
                    this.arah[2] = false;
                }
            }
            if (this.x+i < 8 && this.arah[3]) {
                if (data[this.y][this.x+i] == "x") {
                    this.lmove.push([this.x + i, 0 + this.y]);
                } else if (data[this.y][this.x+i][0] == this.lawan) {
                    this.lmove.push([this.x + i, 0 + this.y]);
                    this.arah[3] = false;
                } else {
                    this.arah[3] = false;
                }
            }
        }

        return this.lmove;

    }

}

// Class
export class Kuda extends ClassBidak {

    // Constructor
    constructor (gambar, x, y, poin, papan_catur, area, pihak, nama, i) {

        // Jalankan construct parent
        super(gambar, x, y, poin, papan_catur, area, pihak, nama, i);

        // Atribute
        this.first = true;

    }

    // Method
    legal_move (data) {

        this.lmove = [];
        if (this.y-2 > -1) {
            if (this.x-1 > -1) {
                if (data[this.y-2][this.x-1][0] != this.pihak) {
                    this.lmove.push([this.x + -1, -2 + this.y]);
                }
            }
            if (this.x+1 < 8) {
                if (data[this.y-2][this.x+1][0] != this.pihak) {
                    this.lmove.push([this.x + 1, -2 + this.y]);
                }
            }
        }
        if (this.y+2 < 8) {
            if (this.x-1 > -1) {
                if (data[this.y+2][this.x-1][0] != this.pihak) {
                    this.lmove.push([this.x + -1, 2 + this.y]);
                }
            }
            if (this.x+1 < 8) {
                if (data[this.y+2][this.x+1][0] != this.pihak) {
                    this.lmove.push([this.x + 1, 2 + this.y]);
                }
            }
        }
        if (this.x-2 > -1) {
            if (this.y-1 > -1) {
                if (data[this.y-1][this.x-2][0] != this.pihak) {
                    this.lmove.push([this.x + -2, -1 + this.y]);
                }
            }
            if (this.y+1 < 8) {
                if (data[this.y+1][this.x-2][0] != this.pihak) {
                    this.lmove.push([this.x + -2, 1 + this.y]);
                }
            }
        }
        if (this.x+2 < 8) {
            if (this.y-1 > -1) {
                if (data[this.y-1][this.x+2][0] != this.pihak) {
                    this.lmove.push([this.x + 2, -1 + this.y]);
                }
            }
            if (this.y+1 < 8) {
                if (data[this.y+1][this.x+2][0] != this.pihak) {
                    this.lmove.push([this.x + 2, 1 + this.y]);
                }
            }
        }

        return this.lmove;

    }

}

// Class
export class Peluncur extends ClassBidak {

    // Constructor
    constructor (gambar, x, y, poin, papan_catur, area, pihak, nama, i) {

        // Jalankan construct parent
        super(gambar, x, y, poin, papan_catur, area, pihak, nama, i);

        // Atribute
        this.first = true;

    }

    // Method
    legal_move (data) {

        this.lmove = [];
        this.arah = [true, true, true, true];
        for (let i = 1; i < 8; i++) {
            if (this.y-i > -1 && this.x-i > -1 && this.arah[0]) {
                if (data[this.y-i][this.x-i] == "x") {
                    this.lmove.push([this.x + -i, -i + this.y]);
                } else if (data[this.y-i][this.x-i][0] == this.lawan) {
                    this.lmove.push([this.x + -i, -i + this.y]);
                    this.arah[0] = false;
                } else {
                    this.arah[0] = false;
                }
            }
            if (this.y+i < 8 && this.x-i > -1 && this.arah[1]) {
                if (data[this.y+i][this.x-i] == "x") {
                    this.lmove.push([this.x + -i, i + this.y]);
                } else if (data[this.y+i][this.x-i][0] == this.lawan) {
                    this.lmove.push([this.x + -i, i + this.y]);
                    this.arah[1] = false;
                } else {
                    this.arah[1] = false;
                }
            }
            if (this.y-i > -1 && this.x+i < 8 && this.arah[2]) {
                if (data[this.y-i][this.x+i] == "x") {
                    this.lmove.push([this.x + i, -i + this.y]);
                } else if (data[this.y-i][this.x+i][0] == this.lawan) {
                    this.lmove.push([this.x + i, -i + this.y]);
                    this.arah[2] = false;
                } else {
                    this.arah[2] = false;
                }
            }
            if (this.y+i < 8 && this.x+i < 8 && this.arah[3]) {
                if (data[this.y+i][this.x+i] == "x") {
                    this.lmove.push([this.x + i, i + this.y]);
                } else if (data[this.y+i][this.x+i][0] == this.lawan) {
                    this.lmove.push([this.x + i, i + this.y]);
                    this.arah[3] = false;
                } else {
                    this.arah[3] = false;
                }
            }
        }

        return this.lmove;

    }

}

// Class
export class Ratu extends ClassBidak {

    // Constructor
    constructor (gambar, x, y, poin, papan_catur, area, pihak, nama, i) {

        // Jalankan construct parent
        super(gambar, x, y, poin, papan_catur, area, pihak, nama, i);

        // Atribute
        this.first = true;

    }

    // Method
    legal_move (data) {

        this.lmove = [];
        this.arah = [true, true, true, true, true, true, true, true];
        for (let i = 1; i < 8; i++) {
            if (this.y-i > -1 && this.x-i > -1 && this.arah[0]) {
                if (data[this.y-i][this.x-i] == "x") {
                    this.lmove.push([this.x + -i, -i + this.y]);
                } else if (data[this.y-i][this.x-i][0] == this.lawan) {
                    this.lmove.push([this.x + -i, -i + this.y]);
                    this.arah[0] = false;
                } else {
                    this.arah[0] = false;
                }
            }
            if (this.y+i < 8 && this.x-i > -1 && this.arah[1]) {
                if (data[this.y+i][this.x-i] == "x") {
                    this.lmove.push([this.x + -i, i + this.y]);
                } else if (data[this.y+i][this.x-i][0] == this.lawan) {
                    this.lmove.push([this.x + -i, i + this.y]);
                    this.arah[1] = false;
                } else {
                    this.arah[1] = false;
                }
            }
            if (this.y-i > -1 && this.x+i < 8 && this.arah[2]) {
                if (data[this.y-i][this.x+i] == "x") {
                    this.lmove.push([this.x + i, -i + this.y]);
                } else if (data[this.y-i][this.x+i][0] == this.lawan) {
                    this.lmove.push([this.x + i, -i + this.y]);
                    this.arah[2] = false;
                } else {
                    this.arah[2] = false;
                }
            }
            if (this.y+i < 8 && this.x+i < 8 && this.arah[3]) {
                if (data[this.y+i][this.x+i] == "x") {
                    this.lmove.push([this.x + i, i + this.y]);
                } else if (data[this.y+i][this.x+i][0] == this.lawan) {
                    this.lmove.push([this.x + i, i + this.y]);
                    this.arah[3] = false;
                } else {
                    this.arah[3] = false;
                }
            }
            if (this.y-i > -1 && this.arah[4]) {
                if (data[this.y-i][this.x] == "x") {
                    this.lmove.push([this.x + 0, -i + this.y]);
                } else if (data[this.y-i][this.x][0] == this.lawan) {
                    this.lmove.push([this.x + 0, -i + this.y]);
                    this.arah[4] = false;
                } else {
                    this.arah[4] = false;
                }
            }
            if (this.y+i < 8 && this.arah[5]) {
                if (data[this.y+i][this.x] == "x") {
                    this.lmove.push([this.x + 0, i + this.y]);
                } else if (data[this.y+i][this.x][0] == this.lawan) {
                    this.lmove.push([this.x + 0, i + this.y]);
                    this.arah[5] = false;
                } else {
                    this.arah[5] = false;
                }
            }
            if (this.x-i > -1 && this.arah[6]) {
                if (data[this.y][this.x-i] == "x") {
                    this.lmove.push([this.x + -i, 0 + this.y]);
                } else if (data[this.y][this.x-i][0] == this.lawan) {
                    this.lmove.push([this.x + -i, 0 + this.y]);
                    this.arah[6] = false;
                } else {
                    this.arah[6] = false;
                }
            }
            if (this.x+i < 8 && this.arah[7]) {
                if (data[this.y][this.x+i] == "x") {
                    this.lmove.push([this.x + i, 0 + this.y]);
                } else if (data[this.y][this.x+i][0] == this.lawan) {
                    this.lmove.push([this.x + i, 0 + this.y]);
                    this.arah[7] = false;
                } else {
                    this.arah[7] = false;
                }
            }
        }

        return this.lmove;

    }

}

// Class
export class Raja extends ClassBidak {

    // Constructor
    constructor (gambar, x, y, poin, papan_catur, area, pihak, nama) {

        // Jalankan construct parent
        super(gambar, x, y, poin, papan_catur, area, pihak, nama);

        // Atribute
        this.first = true;

    }

    // Method
    bahaya (x, y) {
        
        this.not = document.createElement("div");
        this.not.id = "not";
        this.not.style.left = this.x * this.area + "px";
        this.not.style.top = this.y * this.area + "px";
        this.papan_catur.appendChild(this.not);

    }

    // Method
    hapus_bahaya () {
        if (this.not !== undefined)
            this.not.remove();

    }

    // Method
    special_move (data) {

        this.lmove = [];
        if (data[this.y][this.x-1] == "x") {
            if (data[this.y][this.x-2] == "x") {
                if (data[this.y][this.x-3] == "x") {
                    return 1;
                }
            }
        }
        if (data[this.y][this.x+1] == "x") {
            if (data[this.y][this.x+2] == "x") {
                return 2;
            }
        }

        return 0;

    }

    // Method
    legal_move (data) {

        this.lmove = [];
        if (this.y-1 > -1) {

            if (data[this.y-1][this.x] == "x" || data[this.y-1][this.x][0] == this.lawan)
                this.lmove.push([this.x + 0, -1 + this.y]);

            if (this.x-1 > -1)
                if (data[this.y-1][this.x-1] == "x" || data[this.y-1][this.x-1][0] == this.lawan)
                    this.lmove.push([this.x + -1, -1 + this.y]);

            if (this.x+1 < 8)
                if (data[this.y-1][this.x+1] == "x" || data[this.y-1][this.x+1][0] == this.lawan)
                    this.lmove.push([this.x + 1, -1 + this.y]);

        }
        if (this.y+1 < 8) {

            if (data[this.y+1][this.x] == "x" || data[this.y+1][this.x][0] == this.lawan)
                this.lmove.push([this.x + 0, 1 + this.y]);

            if (this.x-1 > -1)
                if (data[this.y+1][this.x-1] == "x" || data[this.y+1][this.x-1][0] == this.lawan)
                    this.lmove.push([this.x + -1, 1 + this.y]);

            if (this.x+1 < 8)
                if (data[this.y+1][this.x+1] == "x" || data[this.y+1][this.x+1][0] == this.lawan)
                    this.lmove.push([this.x + 1, 1 + this.y]);

        }
        if (this.x+1 < 8)
            if (data[this.y][this.x+1] == "x" || data[this.y][this.x+1][0] == this.lawan)
                this.lmove.push([this.x + 1, 0 + this.y]);

        if (this.x-1 < 8)
            if (data[this.y][this.x-1] == "x" || data[this.y][this.x-1][0] == this.lawan)
                this.lmove.push([this.x + -1, 0 + this.y]);

        return this.lmove;

    }

}