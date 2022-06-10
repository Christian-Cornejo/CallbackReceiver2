import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const amqp_url = process.env.CLOUDAMQP_URL || 'amqps://NuggetUser:nugg3tU$3r2022!@b-a96b6a82-5f31-40ad-a8be-1eeb38bc3800.mq.ap-south-1.amazonaws.com:5671';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const RABBITMQSERVER = {
    url: amqp_url
};

const config = {
    rabbitMQ: RABBITMQSERVER,
    server: SERVER
};

export default config;
