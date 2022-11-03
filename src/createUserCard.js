"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.createUserCard = void 0;
var db_1 = require("./db");
var createUserCard = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, formatedTime, mainProject, projects, tasks;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, getUserInfo(userId)];
            case 1:
                _a = _b.sent(), formatedTime = _a.formatedTime, mainProject = _a.mainProject, projects = _a.projects, tasks = _a.tasks;
                return [2 /*return*/, "\n  <head>\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n  <link href=\"https://fonts.googleapis.com/css2?family=Roboto:wght@500;900&display=swap\" rel=\"stylesheet\">\n</head>\n<body style=\"font-family: Roboto, sans-serif; color: #70a5fd; margin: 0; background: transparent\">\n  <div id='card'\n    style=\"display: flex; flex-direction: column; background-color: #0d1117; width: 460px; height: 180px; align-items: center; justify-content: center;\">\n    <div style=\"display: flex; align-items: center;\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon icon-tabler icon-tabler-brand-tabler\" width=\"44\" height=\"44\"\n        viewBox=\"0 0 24 24\" stroke-width=\"3\" stroke=\"#3164cc\" fill=\"none\" stroke-linecap=\"round\"\n        stroke-linejoin=\"round\">\n        <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" />\n        <path d=\"M8 9l3 3l-3 3\" />\n        <line x1=\"13\" y1=\"15\" x2=\"16\" y2=\"15\" />\n        <rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" rx=\"4\" />\n      </svg>\n      <h1 style=\"color: #3164cc\"; margin: 0;\">DevTime</h1>\n    </div>\n    <div style=\"display: flex; gap: 2rem;\">\n      <div>\n      <p><span style=\"color: #bf91f3;\">Main project:</span> ".concat(mainProject.length > 20
                        ? mainProject.substring(0, 17) + '...'
                        : mainProject || '', "</p>\n      <p><span style=\"color: #bf91f3;\">Tasks:</span> ").concat(tasks, "</p>\n      </div>\n      <div>\n        <p><span style=\"color: #bf91f3;\">Working time:</span> ").concat(formatedTime, "</p>\n        <p><span style=\"color: #bf91f3;\">Projects:</span> ").concat(projects, "</p>\n      </div>\n    </div>\n  </div>\n</body>")];
        }
    });
}); };
exports.createUserCard = createUserCard;
function getUserInfo(userId) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var user, groupedTasks, tasks, projects, mainProjectId, mainProject, workingTimeInSeconds, numberOfCompletedTasks, numberOfProjects, formatedTime;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, db_1["default"].user.findUnique({
                        where: {
                            id: userId
                        }
                    })];
                case 1:
                    user = _e.sent();
                    if (!user) {
                        throw new Error('User not found');
                    }
                    return [4 /*yield*/, db_1["default"].task.groupBy({
                            where: {
                                userId: user.id
                            },
                            by: ['projectId'],
                            _sum: {
                                durationInSeconds: true
                            }
                        })];
                case 2:
                    groupedTasks = _e.sent();
                    return [4 /*yield*/, db_1["default"].task.aggregate({
                            where: {
                                userId: user.id
                            },
                            _count: {
                                _all: true
                            },
                            _sum: {
                                durationInSeconds: true
                            }
                        })];
                case 3:
                    tasks = _e.sent();
                    return [4 /*yield*/, db_1["default"].usersOnProjects.findMany({
                            where: {
                                userId: user.id
                            },
                            include: {
                                project: {
                                    select: {
                                        title: true
                                    }
                                }
                            }
                        })];
                case 4:
                    projects = _e.sent();
                    mainProjectId = '';
                    mainProject = '';
                    workingTimeInSeconds = (_a = tasks === null || tasks === void 0 ? void 0 : tasks._sum.durationInSeconds) !== null && _a !== void 0 ? _a : 0;
                    numberOfCompletedTasks = tasks === null || tasks === void 0 ? void 0 : tasks._count._all;
                    numberOfProjects = projects === null || projects === void 0 ? void 0 : projects.length;
                    if (groupedTasks && projects) {
                        mainProjectId =
                            (_b = groupedTasks.reduce(function (prev, curr) {
                                var _a, _b;
                                return ((_a = prev._sum.durationInSeconds) !== null && _a !== void 0 ? _a : 0) > ((_b = curr._sum.durationInSeconds) !== null && _b !== void 0 ? _b : 0)
                                    ? prev
                                    : curr;
                            }).projectId) !== null && _b !== void 0 ? _b : '';
                        if (mainProjectId) {
                        }
                        mainProject =
                            (_d = (_c = projects.find(function (project) { return project.projectId === mainProjectId; })) === null || _c === void 0 ? void 0 : _c.project.title) !== null && _d !== void 0 ? _d : '';
                    }
                    formatedTime = workingTimeInSeconds
                        ? Math.floor(workingTimeInSeconds / 3600)
                            ? "".concat(Math.floor(workingTimeInSeconds / 3600), " h")
                            : Math.floor(workingTimeInSeconds / 60)
                                ? "".concat(Math.floor(workingTimeInSeconds / 60))
                                : '0 min'
                        : '0 min';
                    return [2 /*return*/, {
                            mainProject: mainProject,
                            projects: numberOfProjects,
                            tasks: numberOfCompletedTasks,
                            formatedTime: formatedTime
                        }];
            }
        });
    });
}
