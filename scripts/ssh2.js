// Description:
//   Perform commands over SSH
//
// Commands:
//   hubot ssh <user> <host> <command> - SSH user, host and command
//
// Dependencies:
//   simple-ssh
//
// Author:
//   willgarcia <garcia.rodriguez.william@gmail.com>

var SSH = require("simple-ssh");

module.exports = function(robot) {
    robot.respond(/ssh (.+?) (.+?) (.+)/i, function(msg) {

        var
            user = msg.match[1],
            host = msg.match[2],
            command = msg.match[3].replace(/['‘“`"]+/g, ''),
            ssh = new SSH({
                user: user,
                host: host,
                agent: process.env.SSH_AUTH_SOCK,
                agentForward: true

            });

        ssh.on('error', function(err) {
            msg.reply(err);
            ssh.end();
        });

        ssh.exec(command, {
            out: function(stdout) {
                msg.reply(stdout);
            },
            exit: function(code) {
                msg.reply('Exit code :' + code);
            },
            err: function(stderr) {
                msg.reply(stderr);
                ssh.end();
            }
        }).start();
    });
};
