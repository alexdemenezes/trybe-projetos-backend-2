import carsRouter from './routes/carsRouter';

import App from './app';

const server = new App();

server.addRouter(carsRouter);

export default server;
