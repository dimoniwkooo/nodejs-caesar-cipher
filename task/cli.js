const { program } = require('commander');
const { CaesarCipher } = require('./js/function.js');
const { pipeline, Transform } = require('stream');
const fs = require('fs');

const startAction = (options) => {
    if (isNaN(options.shift)) {
        console.error('Shift must be integer');
        process.exit(1);
    }

    if (!((options.action === 'encode') || (opions.action === 'decode'))) {
        console.error('Action must be "encode"/"decode"');
        process.exit(1);
    }

    if (options.input) {
        const ts = new Transform({
            transform(chunk, encoding, callback) {
                this.push(CaesarCipher(chunk.toString(), options.shift, options.action));
            }
        });

        fs.stat(options.input, function (err) {
            if (!err) {
                if (options.output) {
                    fs.stat(options.output, function (err) {
                        if (!err) {
                            pipeline(
                                fs.createReadStream(options.input),
                                ts,
                                fs.createWriteStream(options.output, {
                                    flags: 'a'
                                }),
                                (err) => {

                                }
                            );
                        }
                        else if (err.code === 'ENOENT') {
                            console.error(`'${options.output}' is a wrong path to output file`);
                            process.exit(1);
                        }
                    });
                } else {
                    let rs = fs.createReadStream(options.input);
                    rs.on('data', data => console.log(CaesarCipher(data.toString(), options.shift, options.action)));
                }
            }
            else if (err.code === 'ENOENT') {
                console.error(`'${options.input}' is a wrong path to input file`);
                process.exit(1);
            }
        });
    }
    else {
        console.log(`Enter text for ${options.action} or Ctrl+C for exit:`);
        process.stdin.on('readable', () => {
            const text = process.stdin.read();
            if (text && (text == 'Ctrl+C')) {
                process.stdin.end();
            } else {
                console.log(CaesarCipher(text, options.shift, options.action));
                process.stdin.resume();
                console.log(`Enter text for ${options.action} or Ctrl+C for exit:`);
            }
        })
    }
};

program
    .storeOptionsAsProperties(false)
    .passCommandToAction(false)
    .option('-s, --shift <number>', 'a shift')
    .option('-i, --input <input>', 'an input file')
    .option('-o, --output <output>', 'an output file')
    .option('-a, --action <action>', 'an action encode/decode')
    .action(options => startAction(options))
    .parse(process.argv);
