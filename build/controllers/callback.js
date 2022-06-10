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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../config/logging"));
const amqp_connection_manager_1 = __importDefault(require("amqp-connection-manager"));
const config_1 = __importDefault(require("../config/config"));
const NAMESPACE = 'Callback';
const callbackReceiver = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Receive Callback');
    var message = {
        transactionId: parseInt(String(req.query.transactionId)),
        transaction: String(req.query.transaction),
        status: String(req.query.status),
        transactionAmount: parseFloat(String(req.query.transactionAmount)),
    };
    var connection = amqp_connection_manager_1.default.connect(config_1.default.rabbitMQ.url);
    var channelWrapper = connection.createChannel({
        json: true,
        setup: function (channel) {
            return channel.assertQueue('callbackQueue', { durable: true });
        },
    });
    channelWrapper
        .sendToQueue('callbackQueue', message, { contentType: "application/json" })
        .then(function () {
        logging_1.default.info(NAMESPACE, "Sent");
        return res.status(200).json({
            message: "Successfully Received."
        });
    })
        .catch(function (err) {
        logging_1.default.info(NAMESPACE, "Error");
        return res.status(200).json({
            message: err,
            err
        });
    });
});
exports.default = { callbackReceiver };
