let users;

class UsersDAO {
  static async injectDB(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn.db.collection('users');
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  static async getUserById(id) {
    return await users.findOne({_id: ObjectId(id)});
  }
}

module.exports = UsersDAO;
