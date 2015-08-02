# hubot-ssh2

A bot to perform commands over SSH.

## Installing

Add dependency to `package.json`:

```console
$ npm install --save hubot-ssh2
```

Include package in Hubot's `external-scripts.json`:

```json
["hubot-ssh2"]
```

## Commands

    hubot <user> <host> <command> # Execute a SSH command with its exit code
