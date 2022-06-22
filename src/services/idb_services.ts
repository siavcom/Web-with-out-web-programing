import { Connection } from "jsstore";
//import { connection } from "./jsstore_con";
import { DATA_TYPE } from "jsstore";

const getWorkerPath = () => {
  // return dev build when env is development
  if (process.env.NODE_ENV === "development") {
    return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.js");
  } else {
    // return prod build when env is production
    return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js");
  }
};

const workerPath = getWorkerPath().default;

//export const connection = new Connection(new Worker(workerPath));

//connection.logStatus = true;

const getDatabase = () => {
  const tblStudent = {
    name: "Students",
    columns: {
      id: {
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        notNull: true,
        dataType: DATA_TYPE.String
      },
      gender: {
        dataType: DATA_TYPE.String,
        default: "male"
      },
      country: {
        notNull: true,
        dataType: DATA_TYPE.String
      },
      city: {
        dataType: DATA_TYPE.String,
        notNull: true
      }
    }
  };
  const dataBase = {
    name: "Vue_Demo",
    tables: [tblStudent]
  };
  return dataBase;
};

export const initJsStore = async () => {
    const dataBase = getDatabase();
    console.log('====== Se obtubo la definicion de la base de datos',dataBase);

    const connection = new Connection(new Worker(workerPath));
    return await connection.initDb(dataBase);
};
