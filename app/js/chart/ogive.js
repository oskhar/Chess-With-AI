export function te(dt) {
    const canvas = document.getElementById("grafik");
    const ctx = canvas.getContext("2d");

    // Data
    let data = dt;

    // Mengatur ukuran grafik
    let graphWidth = 400;
    let graphHeight = 300;

    // Mengatur posisi grafik
    let graphX = 50;
    let graphY = 50;

    // Mengatur skala grafik
    let scaleX = graphWidth / (data.length - 1);
    let scaleY = graphHeight / Math.max(...data);

    // Menggambar garis
    ctx.strokeStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(graphX, graphY + graphHeight - data[0] * scaleY);
    for (let i = 1; i < data.length; i++) {
        ctx.lineTo(graphX + i * scaleX, graphY + graphHeight - data[i] * scaleY);
        ctx.strokeRect(graphX + i * scaleX - 1, graphY + graphHeight - data[i] * scaleY - 1,3,3);
    }
    ctx.stroke();

    // Menggambar sumbu x dan y
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(graphX, graphY);
    ctx.lineTo(graphX, graphY + graphHeight);
    ctx.lineTo(graphX + graphWidth, graphY + graphHeight);
    ctx.stroke();

    // Menggambar label sumbu x
    for (let i = 0; i < data.length; i++) {
        ctx.fillText(i, graphX + i * scaleX, graphY + graphHeight + 20);
    }

    // Menggambar label sumbu y
    for (let i = 0; i <= Math.max(...data); i += 10) {
        ctx.fillText(i, graphX - 20, graphY + graphHeight - i * scaleY);
    }
}
export class Garis {
    constructor(canvasId, data) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext("2d");
      this.data = data;
      this.graphWidth = 500;
      this.graphHeight = 300;
      this.graphX = 50;
      this.graphY = 50;
  
      // Pertama kali, gambar grafik dengan data awal
      this.drawGraph();
    }
  
    drawGraph() {

        this.scaleX = this.graphWidth / (this.data.length - 1);
        this.scaleY = this.graphHeight / Math.max(...this.data);

        // Menggambar garis
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.moveTo(
            this.graphX,
            this.graphY + this.graphHeight - this.data[0] * this.scaleY
        );
        for (let i = 1; i < this.data.length; i++) {
            this.ctx.lineTo(
            this.graphX + i * this.scaleX,
            this.graphY + this.graphHeight - this.data[i] * this.scaleY
            );
        }
        this.ctx.strokeStyle = "#ffffff"; // warna garis
        this.ctx.stroke();
    
        // Menggambar titik pada setiap poin data
        this.ctx.fillStyle = "#ffffff"; // warna titik
        for (let i = 0; i < this.data.length; i++) {
            this.ctx.beginPath();
            this.ctx.arc(
            this.graphX + i * this.scaleX,
            this.graphY + this.graphHeight - this.data[i] * this.scaleY,
            5,
            0,
            2 * Math.PI
            );
            this.ctx.fill();
        }
    
        // Menggambar sumbu x dan y
        this.ctx.beginPath();
        this.ctx.moveTo(this.graphX, this.graphY);
        this.ctx.lineTo(this.graphX, this.graphY + this.graphHeight);
        this.ctx.lineTo(this.graphX + this.graphWidth, this.graphY + this.graphHeight);
        this.ctx.stroke();

        // Menggambar label sumbu x
        for (let i = 0; i < this.data.length; i++) {
            this.ctx.fillText(i, this.graphX + i * this.scaleX, this.graphY + this.graphHeight + 20);
        }
    
        // Menggambar label sumbu y
        for (let i = Math.min(...this.data); i <= Math.max(...this.data); i += 10) {
            this.ctx.fillText(i, this.graphX - 20, this.graphY + this.graphHeight - i * this.scaleY);
        }

    }
}