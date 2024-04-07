import dotenv from 'dotenv'

dotenv.config()


interface Config {
    port: number;
    mongodbUri: string;
    jwtSecret: string;
}

const config: Config = {
    port: process.env.PORT || 3000,
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp',
    jwtSecret: process.env.JWT_SECRET
};

export default config;
