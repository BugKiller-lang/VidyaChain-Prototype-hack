// In-Memory mock for Certificate model
const User = require('./User');
const certs = [];

class Certificate {
  constructor(data) {
    Object.assign(this, data);
    this.id = this._id || Math.random().toString(36).substring(2, 15);
    this._id = this.id;
    this.createdAt = new Date();
    this.issueDate = new Date();
  }

  async save() {
    if (!certs.find(c => c.id === this.id)) {
      certs.push(this);
    }
    return this;
  }

  static find(query) {
    let results = certs.filter(c => Object.keys(query).every(key => c[key] === query[key]));
    // Return an object that has sort() resolving to a promise
    return {
      sort: () => Promise.resolve([...results].reverse()), 
      then: (resolve) => resolve(results)
    };
  }

  static findOne(query) {
    let result = certs.find(c => Object.keys(query).every(key => c[key] === query[key])) || null;

    // handle populate() chaining for verify route
    return {
      populate: (field, selectCols) => {
        if (result && field === 'issuedBy') {
          const user = User.users.find(u => u.id === result.issuedBy);
          // Return a shallow copy with the populated field
          return Promise.resolve({ ...result, [field]: user || null });
        }
        return Promise.resolve(result);
      },
      then: (resolve) => resolve(result)
    };
  }
}

module.exports = Certificate;
