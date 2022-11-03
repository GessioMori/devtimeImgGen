"use strict";
exports.__esModule = true;
var client_1 = require("@prisma/client");
if (!global.prisma) {
    global.prisma = new client_1.PrismaClient();
}
exports["default"] = global.prisma;
