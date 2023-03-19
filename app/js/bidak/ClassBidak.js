// Class
export class ClassBidak {

    // Constructor
    constructor (gambar, x, y, poin, papan_catur, area, pihak, nama) {

        // Atribute
        this.x = x;
        this.y = y;
        this.poin = poin;
        this.nama = nama;
        this.pihak = pihak;
        this.lawan = pihak == "p" ? "h" : "p";
        this.papan_catur = papan_catur;
        this.papan_permukaan = papan_permukaan;
        this.area = area;

        // Bentuk bidak
        this.element = document.createElement("div");
        this.element.id = "bidak";
        this.element.style.left = this.x * this.area + "px";
        this.element.style.top = this.y * this.area + "px";
        this.element.style.background = "url('" + gambar + "')";
        this.element.style.backgroundSize = "100%";
        this.element.style.backgroundPosition = "center";
        this.element.style.backgroundRepeat = "no-repeat";
        this.papan_catur.appendChild(this.element);

    }

    // Method
    death () {
        this.element.remove();

    }

    // Method
    position_str () {
        return String.fromCharCode(97+this.x) + this.y;

    }

}