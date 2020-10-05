# Caesar cipher CLI

## [task](https://github.com/rolling-scopes-school/nodejs-course-template/blob/master/TASKS.md#task-1-caesar-cipher-cli-tool)
## [cross-check](https://github.com/rolling-scopes-school/nodejs-course-template/blob/master/CROSSCHECK.md#task-1-caesar-cipher-cli-tool)

### Here some options:
- `-a` or `--action` should equal to `encode` or `decode`, it is a required option;
- `-s` or `--shift` should be integer, it is a required option;
- `-i` or `--input` should be a string. If the file is not found, the message will be shown. If the file option is absent, you will be offered to enter some text in a command line.
- `-o` or `--output` should be a string. If the file is not found, the message will be shown. If the file option is absent, the output will be performed to the command line.

To run the code open command line.

### Examples:

```bash
node cli -s 7 -a encode --input files/in.txt --output files/out.txt
```

```bash
node cli --shift 7 --action decode -i './files/in.txt' -o './files/out.txt'
```

```bash
node cli -s 7 --action encode
```

```bash
node cli --shift 7 -a decode
```