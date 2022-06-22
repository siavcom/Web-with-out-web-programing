import { Connection } from "jsstore";
//  Multi thread
/*
export const getWorkerPath = () => {
    console.log('Antes de entrar a obtener la conexion')
  // return dev build when env is development
  if (process.env.NODE_ENV === "development") {
    return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js");
    // debug    return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.js");
  } else {
    // return prod build when env is production
    return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js");
  }
};

const workerPath = getWorkerPath(); // .default  se quito porque da errores en vue 3.2
console.log('Worker path ',workerPath)
export const newLocalDb = new Connection(new Worker(workerPath));
//export const newLocalDb = new Connection(new Worker(require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.js")));
newLocalDb.logStatus = true;
*/



// Single thread
import workerInjector from "jsstore/dist/worker_injector";
export const newLocalDb = new Connection();

newLocalDb.addPlugin(workerInjector);
