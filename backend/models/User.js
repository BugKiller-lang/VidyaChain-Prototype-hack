// In-Memory mock for User model
const users = [];

class User {
  constructor(data) {
    Object.assign(this, data);
    this.id = this._id || Math.random().toString(36).substring(2, 15);
    this._id = this.id;
  }

  async save() {
    if (!users.find(u => u.id === this.id)) {
      users.push(this);
    }
    return this;
  }

  static async findOne(query) {
    return users.find(u => Object.keys(query).every(key => u[key] === query[key])) || null;
  }

  static findById(id) {
    const user = users.find(u => u.id === id || u._id === id);
    // Return an object that has a select() method that just returns a promise of the user
    // because auth.js does: await User.findById(...).select('-password')
    return {
      select: () => Promise.resolve(user || null),
      then: (resolve) => resolve(user || null)
    };
  }
}

// Expose array so other models can 'populate'
User.users = users;
module.exports = User;
