import { Connection } from "jsstore";
//  Multi thread
/*const getWorkerPath = () => {
    // return dev build when env is development
    if (process.env.NODE_ENV === 'development') {
    //debug    return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.js");
    return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js");
    }
    else { // return prod build when env is production
        return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js");
    }
};

const WorkerPath = getWorkerPath();  // .default  se quito porque da errores en vue 3.2
export const oldLocalDb = new Connection(new Worker(WorkerPath));

oldLocalDb.logStatus = true;
*/

//  Un solo hilo
import workerInjector from "jsstore/dist/worker_injector";
export const oldLocalDb = new Connection();

oldLocalDb.addPlugin(workerInjector);


