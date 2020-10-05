module.exports = {
    CaesarCipher: function (line, shift, action) {
        shift = action === 'encode' ? +shift : -shift;
        line = line.toString()

        if (shift < 0) shift = shift + 26;
        return line.split('').map(symbol => {
            const code = symbol.charCodeAt();
            if (code >= 65 && code <= 90) {
                symbol = String.fromCharCode(
                    ((code - 65 + shift) % 26) + 65
                );
            } else if (code >= 97 && code <= 122) {
                symbol = String.fromCharCode(
                    ((code - 97 + shift) % 26) + 97
                );
            }
            return symbol
        }).join('')
    }
}