var canvas = document.getElementById("grafik");
var ctx = canvas.getContext("2d");

// Data
var data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

// Mengatur ukuran grafik
var graphWidth = 400;
var graphHeight = 300;

// Mengatur posisi grafik
var graphX = 50;
var graphY = 50;

// Mengatur skala grafik
var scaleX = graphWidth / (data.length - 1);
var scaleY = graphHeight / Math.max(...data);

// Menggambar garis
ctx.beginPath();
ctx.moveTo(graphX, graphY + graphHeight - data[0] * scaleY);
for (var i = 1; i < data.length; i++) {
    ctx.lineTo(graphX + i * scaleX, graphY + graphHeight - data[i] * scaleY);
}
ctx.stroke();

// Menggambar sumbu x dan y
ctx.beginPath();
ctx.moveTo(graphX, graphY);
ctx.lineTo(graphX, graphY + graphHeight);
ctx.lineTo(graphX + graphWidth, graphY + graphHeight);
ctx.stroke();

// Menggambar label sumbu x
for (var i = 0; i < data.length; i++) {
    ctx.fillText(i, graphX + i * scaleX, graphY + graphHeight + 20);
}

// Menggambar label sumbu y
for (var i = 0; i <= Math.max(...data); i += 10) {
    ctx.fillText(i, graphX - 20, graphY + graphHeight - i * scaleY);
}