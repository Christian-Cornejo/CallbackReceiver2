import { application, NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import amqp from "amqp-connection-manager";
import config from '../config/config';
import MessageInterface from '../interface/Message';

const NAMESPACE = 'Callback';
const callbackReceiver = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Receive Callback');
    
    var message : MessageInterface = {
        transactionId: parseInt(String(req.query.transactionId)),
        transaction: String(req.query.transaction),
        status: String(req.query.status),
        transactionAmount: parseFloat(String(req.query.transactionAmount)),
    }
    
    var connection = amqp.connect(config.rabbitMQ.url);

    var channelWrapper = connection.createChannel({
    json: true,
    setup: function (channel) {
        return channel.assertQueue('callbackQueue', { durable: true });
    },
    });
    
    channelWrapper
    .sendToQueue('callbackQueue', message, {contentType: "application/json"})
    .then(function () {
        logging.info(NAMESPACE, "Sent");
        return res.status(200).json({
            message: "Successfully Received."
        });
    })
    .catch(function (err) {
        logging.info(NAMESPACE, "Error");
        return res.status(200).json({
            message: err,
            err
        });
    });
};

export default { callbackReceiver };
