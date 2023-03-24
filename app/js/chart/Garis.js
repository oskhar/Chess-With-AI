// Class
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
        for (let i = 0; i <= Math.max(...this.data); i += 10) {
            this.ctx.fillText(i, this.graphX - 20, this.graphY + this.graphHeight - i * this.scaleY);
        }

    }
}