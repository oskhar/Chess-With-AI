// Class
export class Send {

    // Cosntructor
    constructor (path, buffer) {
    
        this.path = path;
        this.buffer = buffer;
    
    }

    tensor () {

        xhr.open('POST', this.path, true);
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
            console.log('Data tensor berhasil disimpan dalam BLOB');
            } else {
            console.error('Terjadi kesalahan saat menyimpan data tensor');
            }
        }
        };
        
        // Mengirim data buffer sebagai BLOB ke server
        xhr.send(this.buffer);

    }

}