// Class
export class AI {

    // Cosntructor
    constructor (tf, pieces) {
    
        this.tf = tf;
        this.pieces = pieces;
        this.x = [];
        this.y = [];


        // const board = [
        //     ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        //     ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        //     [ 0,   0,   0,   0,   0,   0,   0,   0 ],
        //     [ 0,   0,   0,   0,   0,   0,   0,   0 ],
        //     [ 0,   0,   0,   0,   0,   0,   0,   0 ],
        //     [ 0,   0,   0,   0,   0,   0,   0,   0 ],
        //     ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        //     ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        // ];
    
    }

    // Fungsi untuk mengonversi representasi papan catur menjadi format yang dapat diproses oleh TensorFlow.js
    boardToTensor(board) {

        // const tensor = tf.tensor(board.map(row => row.map(p => this.pieces.indexOf(p[0]+p[1]))), [8, 8]);
        let tensor = [];
        for (let i = 0; i < 8; i++) {
        
            let data_8_12 = [];
            for (let j = 0; j < 8; j++) {
                const piece = board[j][i];
                const index = this.pieces.indexOf(piece[0]+piece[1]);
                let data_12 = Array(12).fill(0);
                if (index >= 0) {
                    data_12[index] = 1;
                }
                data_8_12.push(data_12);
            }
            tensor.push(data_8_12);

        }

        return this.tf.tensor(tensor);
    }

    // Method
    moveStringToIndex(move) {
        const fromSquare = (parseInt(move[0]) - 1) * 8 + ('abcdefgh'.indexOf(move[1]));
        const toSquare = (parseInt(move[2]) - 1) * 8 + ('abcdefgh'.indexOf(move[3]));
        return parseInt(fromSquare+""+toSquare);
      }
    
    // Mengambil data dari permainan
    create_dataset (board, move) {

        const tensor = this.boardToTensor(board);
        this.x.push(tensor);
        this.y.push(this.move_to_predict(move));

    }

    // Buat model
    create_model () {

        this.model = tf.sequential();
        this.model.add(tf.layers.conv2d({ inputShape: [8, 8, 12], filters: 64, kernelSize: 3, activation: 'relu' }));
        this.model.add(tf.layers.conv2d({ filters: 128, kernelSize: 3, activation: 'relu' }));
        this.model.add(tf.layers.flatten());
        this.model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
        this.model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
        this.model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

    }

    // Latih model
    model_training () {

        console.log(this.x.length + " " + this.y.length);
        this.x = this.tf.stack(this.x);
        this.y = this.tf.tensor(this.y);
        console.log(this.x + " " + this.y);
        this.model.fit(this.x, this.y, { epochs: 50 }).then(() => {
            console.log('Model trained successfully!');
        });

    }

    // Mengkonfersi hasil prediksi
    predict_to_move (predictedMove) {

        const move = {
            "from": String.fromCharCode(97 + (predictedMove & 7)) + (8 - (predictedMove >> 3 & 7)),
            "to": String.fromCharCode(97 + (predictedMove >> 6 & 7)) + (8 - (predictedMove >> 9 & 7))
        };
        return move;

    }

    move_to_predict (move) {

        const fromCol = parseInt(move.from[0]);
        const fromRow = 8 - parseInt(move.from.charAt(1));
        const toCol = parseInt(move.to[0]);
        const toRow = 8 - parseInt(move.to.charAt(1));
        const hasil = (fromCol + (fromRow << 3) + (toCol << 6) + (toRow << 9));
        console.log(move);
        console.log(this.predict_to_move(hasil));
        return hasil;
        
    }
      

    // Save model
    save_model(url) {
        this.model.save('localstorage://my-model');
        const savedModel = tf.loadLayersModel('localstorage://my-model');
        const modelJSON = savedModel.toJSON();
        const response = fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(modelJSON)
        });
        if (response.ok) {
            console.log('Model saved to server!');
        } else {
            console.error('Error saving model to server:', response.status, response.statusText);
        }
    }

    // Method
    create_prediction (board) {

        const tensor = this.boardToTensor(board);
        const prediction = this.model.predict(this.tf.expandDims(tensor, 0));
        const predictedMove = Math.floor(prediction.dataSync()[0] * 4096);
        return this.predict_to_move(predictedMove);
        
    }

    // Method
    tensor_to_txt () {

        const array_1 = JSON.stringify(this.x.arraySync());
        const array_2 = JSON.stringify(this.y.arraySync());
        const isiFile = array_1 + "\n\n" +array_2;
        const hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/plain,' + encodeURIComponent(isiFile);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'data.txt';
        hiddenElement.click();
        hiddenElement.remove();

    }

}