// Class
export class AI {

    // Cosntructor
    constructor (run) {
    
        this.tf = require('@tensorflow/tfjs');
        this.fs = require('fs');
    
    }


    // Fungsi untuk mengonversi representasi papan catur menjadi format yang dapat diproses oleh TensorFlow.js
    boardToTensor(board) {
    const tensor = this.tf.zeros([8, 8, 12]);
    const pieces = ['p', 'n', 'b', 'r', 'q', 'k', 'P', 'N', 'B', 'R', 'Q', 'K'];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
        const piece = board[i][j];
        if (piece) {
            const index = pieces.indexOf(piece);
            tensor[i][j][index].assign(1);
        }
        }
    }
    return tensor;
    }

    
    // Baca dataset dari file CSV
    read_dataset () {

        const dataset = this.fs.readFileSync('chess_data.csv', 'utf-8').split('\n');
        this.x = [];
        this.y = [];
        for (const row of dataset) {
            const [fen, move] = row.split(',');
            const board = fenToBoard(fen);
            const tensor = boardToTensor(board);
            const moveIndex = parseInt(move);
            this.x.push(tensor);
            this.y.push(moveIndex);
        }

    }

    // Buat model
    create_model () {

        this.model = this.tf.sequential();
        this.model.add(this.tf.layers.conv2d({ inputShape: [8, 8, 12], filters: 64, kernelSize: 3, activation: 'relu' }));
        this.model.add(this.tf.layers.conv2d({ filters: 128, kernelSize: 3, activation: 'relu' }));
        this.model.add(this.tf.layers.flatten());
        this.model.add(this.tf.layers.dense({ units: 64, activation: 'relu' }));
        this.model.add(this.tf.layers.dense({ units: 1, activation: 'sigmoid' }));
        this.model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

    }

    // Latih model
    model_training () {

        model.fit(this.tf.stack(X), this.tf.tensor(y), { epochs: 10 }).then(() => {
            console.log('Model trained successfully!');
        });

    }

    // Uji model dengan masukkan papan catur dan prediksi langkah selanjutnya
        const board = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        ];
        const tensor = boardToTensor(board);
        const prediction = model.predict(this.tf.expandDims(tensor, 0));
        const predictedMove = Math.floor(prediction.dataSync()[0] * 4096);


}