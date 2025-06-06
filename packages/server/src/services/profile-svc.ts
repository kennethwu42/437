import db from "./mongo";

export default {
  async read(username: string) {
    return db.collection("profiles").findOne(
      { userid: username },
      {
        projection: {
          _id: 0,
          userid: 1,
          name: 1,
          color: 1,
          avatar: 1
        }
      }
    );
  }
};
