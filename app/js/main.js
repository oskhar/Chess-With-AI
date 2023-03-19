import { Pion, Benteng, Kuda, Peluncur, Ratu, Raja } from "./bidak/Bidak.js";
const ObjectBidak = {
    'p': Pion,
    'b': Benteng,
    'k': Kuda,
    'g': Peluncur,
    'q': Ratu,
    'r': Raja
}

class Board {

    constructor (area = 110) {

        // Atribute
        this.data = [];
        this.death = {
            "h": [],
            "p": []
        }
        this.area = area;
        this.jalan_putih = true;
        this.king_safe = true;
        this.papan_catur = document.getElementById("papan_catur");
        this.papan_permukaan = document.getElementById("papan_permukaan");
        this.bidak = {
            "h": [
                "5b1", "3k1", "3g1", "9q", "0r", "3g2", "3k2", "5b2",
                "1p1", "1p2", "1p3", "1p4", "1p5", "1p6", "1p7", "1p8"
            ],
            "p": [
                "1p1", "1p2", "1p3", "1p4", "1p5", "1p6", "1p7", "1p8",
                "5b1", "3k1", "3g1", "9q", "0r", "3g2", "3k2", "5b2"
            ]
            
            };

        // Bentuk papan catur
        this.papan_catur.style.height = (this.area * 8) + "px";
        this.papan_catur.style.width = (this.area * 8) + "px";
        this.papan_permukaan.style.height = (this.area * 8) + "px";
        this.papan_permukaan.style.width = (this.area * 8) + "px";

        this.draw_area();
        this.tambah_bidak();
        this.data = this.representasi_board();

    }

    // Method
    resize_board () {

        this.papan_catur.style.height = (this.area * 8) + "px";
        this.papan_catur.style.width = (this.area * 8) + "px";
        this.papan_permukaan.style.height = (this.area * 8) + "px";
        this.papan_permukaan.style.width = (this.area * 8) + "px";

    }

    // Method
    draw_area () {

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {

                let element = document.createElement("div");
                element.id = "area";
                element.style.top = (i*this.area) + "px";
                element.style.left = (j*this.area) + "px";
                element.style.background = (i+j) % 2 == 0 ? "#f0dab5" : "#b48662";
                this.papan_catur.appendChild(element);

            }
        }

    }

    // Method
    tambah_bidak () {

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 8; j++) {

                this.tmp = (i < 2) ? i : i+4;
                this.pihak = (i < 2) ? 'h' : 'p';
                this.index = (i < 2) ? i*8+j : (i-2)*8+j;
                const piece = this.bidak[this.pihak][this.index].substring(1);
                const path = "./assets/images/" + this.pihak + "/" + piece[0] + ".svg";

                this.bidak[this.pihak][piece] = new ObjectBidak[piece[0]](
                    path, j, this.tmp,
                    parseInt(this.bidak[this.pihak][this.index][0]),
                    this.papan_catur,
                    this.area, this.pihak, piece
                );

                this.bidak[this.pihak][piece].element.onclick = this.click_bidak.bind(this, this.pihak, piece);

            }
        }

    }

    // Method
    move (i, j, x, y) {

        this.hapus_permukaan();

        this.bidak[i][j].x = x;
        this.bidak[i][j].y = y;

        this.bidak[i][j].element.style.left = x * this.area + "px";
        this.bidak[i][j].element.style.top = y * this.area + "px";

        if (this.bidak[i][j].first)
            this.bidak[i][j].first = false;

        this.jalan_putih = !this.jalan_putih;

        if (this.data[y][x] != "x") {

            const pihak = this.data[y][x][0];
            const index = this.data[y][x].substring(1);
            this.bidak[pihak][index].death();
            this.death[pihak].push(index);

        }
        if (this.bidak[i][j].nama[0] == "p") {
            if (this.bidak[i][j].y == 7 || this.bidak[i][j].y == 0) {

                const nama = "q"+this.bidak[i][j].nama[1];
                this.bidak[i][j].death();
                this.death[i].push(j);
                this.bidak[i][nama] = new ObjectBidak["q"](
                    "./assets/images/" + this.bidak[i][j].pihak + "/q.svg", this.bidak[i][j].x, this.bidak[i][j].y,
                    9,
                    this.papan_catur,
                    this.area, this.bidak[i][j].pihak, nama
                );
                this.bidak[i].push(nama);
                this.bidak[i][nama].element.onclick = this.click_bidak.bind(this, i, nama);
                console.log(this.bidak[i]);
                
            }
        }

        this.data = this.representasi_board();
        const pihak = this.jalan_putih ? "ph" : "hp";
        this.king_safe = this.is_safe_king(pihak[0], pihak[1]);
        if (!this.king_safe) {
            this.bidak[pihak[0]]["r"].bahaya();
        } else if (this.is_safe_king(pihak[1], pihak[0])) {
            this.bidak[pihak[1]]["r"].hapus_bahaya();
        }
        
    }

    // Method
    representasi_board () {

        const rboard = new Array(8).fill().map(() => new Array(8).fill('x'));
        const allBidak = [...this.bidak['h'], ...this.bidak['p']];
 
        for (let i = 0; i < 2; i++) {
            allBidak.forEach( bd => {

                const ph = i == 0 ? 'h' : 'p';
                if (this.death[ph].indexOf(bd.substring(1)) == -1) {

                    const {y, x, pihak, nama} = this.bidak[ph][bd.substring(1)];
                    rboard[y][x] = pihak + nama;

                }
            });
        }
        return rboard;

    }

    // Method
    is_safe_king (pihak, musuh, unuse = "") {

        let row = this.bidak[pihak]["r"].x;
        let column = this.bidak[pihak]["r"].y;

        const musuh_moves = this.all_legal_move(musuh, unuse);
        for (let i = 0; i < musuh_moves.length; i++) {
            const moves = musuh_moves[i];
            for (let j = 0; j < moves.length; j++) {
                const move = moves[j];
                if (move[0] === row && move[1] === column) {
                    // Raja dalam posisi yang tidak aman
                    return false;
                }
            }
        }

        // Raja aman
        return true;
    }

    // Method
    hapus_permukaan () {
        this.papan_permukaan.innerHTML = "";

    }

    // Method
    check_move (i, j, x, y) {

        let pihak;
        let check = "";
        const tmp_jalan = this.jalan_putih;
        const tmp_x = this.bidak[i][j].x;
        const tmp_y = this.bidak[i][j].y;

        this.bidak[i][j].x = x;
        this.bidak[i][j].y = y;

        if (this.data[y][x] != "x") {
            check = this.data[y][x].substring(1);

        }

        this.data = this.representasi_board();
        pihak = tmp_jalan ? "ph" : "hp";
        let hasil = this.is_safe_king(pihak[0], pihak[1], check);

        this.bidak[i][j].x = tmp_x;
        this.bidak[i][j].y = tmp_y;
        this.data = this.representasi_board();

        return hasil;
        
    }

    // Method
    click_bidak (i, j) {

        // Bersihkan permukaan
        this.hapus_permukaan();

        if (this.jalan_putih && this.bidak[i][j].pihak == "p") {
            this.aksi_click(i, j);

        } else if (!this.jalan_putih && this.bidak[i][j].pihak == "h") {
            this.aksi_click(i, j);

        }
    }

    // Method
    aksi_click (i, j) {

        // Seleksi legal_move
        this.lm = this.bidak[i][j].legal_move(this.data);

        if (j == "r" && this.bidak[i][j].first) {
            const tmp = this.bidak[i][j].special_move(this.data);
            if (tmp != 0 && this.king_safe) {
                if (this.bidak[i]["b"+tmp].first) {
                    this.area_special(i, "b"+tmp);
                }
            }
        }

        for (let x = 0; x < this.lm.length; x++) {
            if (!this.king_safe) {
                if (this.check_move(
                    i, j,
                    this.lm[x][0],
                    this.lm[x][1]
                )) {
                    this.area_gerak(
                        i, j,
                        this.lm[x][0],
                        this.lm[x][1]
                    );    
                }

            } else {
                this.area_gerak(
                    i, j,
                    this.lm[x][0],
                    this.lm[x][1]
                ); 

            }
        }

    }

    // Method
    area_special (i, b) {

        const x = (this.bidak[i]["r"].x + (b[1] == "1" ? -2 : 2));
        const y = this.bidak[i]["r"].y;

        this.lingkaran = document.createElement("div");
        this.lingkaran.id = "lingkaran";
        this.lingkaran.style.left = (x * this.area + (this.area/4)) + "px";
        this.lingkaran.style.top = (y * this.area + (this.area/4)) + "px";
        this.lingkaran.addEventListener("click", this.special_move.bind(this, i, b, x, y, (this.bidak[i]["r"].x + (b[1] == "1" ? -1 : 1))));
        this.papan_permukaan.appendChild(this.lingkaran);

    }

    // Method
    special_move (i, b, x, y, tmp_x) {

        this.hapus_permukaan();

        this.bidak[i][b].x = tmp_x;
        this.bidak[i][b].y = y;
        this.bidak[i][b].element.style.left = tmp_x * this.area + "px";
        this.bidak[i][b].element.style.top = y * this.area + "px";

        this.bidak[i]["r"].x = x;
        this.bidak[i]["r"].y = y;
        this.bidak[i]["r"].element.style.left = x * this.area + "px";
        this.bidak[i]["r"].element.style.top = y * this.area + "px";

        this.bidak[i]["r"].first = false;
        this.bidak[i][b].first = false;

        this.jalan_putih = !this.jalan_putih;

        this.data = this.representasi_board();

    }

    // Method
    area_gerak (i, j, x, y) {

        this.tmp_x = this.area * x;
        this.tmp_y = this.area * y;

        this.lingkaran = document.createElement("div");
        this.lingkaran.id = "lingkaran";
        this.lingkaran.style.left = (this.tmp_x + (this.area/4)) + "px";
        this.lingkaran.style.top = (this.tmp_y + (this.area/4)) + "px";
        this.lingkaran.addEventListener("click", this.move.bind(this, i, j, x, y));
        this.papan_permukaan.appendChild(this.lingkaran);

    }

    // Method
    all_legal_move (pihak, unuse) {

        this.a_lmove = [];
        const bidak = [...this.bidak[pihak]];
        bidak.forEach(bd => {

            const i = bd.substring(1);
            if (i != unuse && this.death[pihak].indexOf(i) == -1) {
                this.lmove = this.bidak[pihak][i].legal_move(this.data);
                if (this.lmove.length > 0) {
                    this.a_lmove.push(this.lmove);
                }
                
            }
            
        });
        return this.a_lmove;

    }

    // Method
    search_bidak (value, arr) {

        // fungsi rekursif tail
        function search(arr, i) {
            if (i >= arr.length) {
                return false;
            }
            const element = arr[i];
            
            if (typeof element === 'string' && element === value) {
                return true;
            }
            
            if (Array.isArray(element)) {
                return search(element, 0) || search(arr, i + 1);
            }
            return search(arr, i + 1);
        }
        
        return search(arr, 0);
    }

} 

const run = new Board(((innerHeight < innerWidth ? innerHeight : innerWidth)-100)/8);
document.body.onresize = function () {
    run.area = ((innerHeight < innerWidth ? innerHeight : innerWidth)-100)/8;
    run.resize_board();
 };