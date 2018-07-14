const connection = require("../db/dbconnect");
const Repository = require("./GeneralRepository");
const User = require("../models/user");

UserRepository.prototype = new Repository();
UserRepository.prototype.create = create;
UserRepository.prototype.save = save;
UserRepository.prototype.searchUserContact = searchUserContact;

let UsersArray = [];

function UserRepository() {
  Repository.prototype.constructor.call(this);
  this.model = User;
}

function searchUserContact(id, callback) {
  let model = this.model;
  let query = model.aggregate([{
    $lookup: {
      from: "messages",
      localField: "id",
      foreignField: 'senderId',
      as: 'sended'
    }
  },
  {
    $lookup: {
      from: "messages",
      localField: "id",
      foreignField: 'receiverId',
      as: 'received'
    }
  },
  {
    $match: {
      $or: [
        { "sended.receiverId": id },
        { "received.senderId": id }
      ]
    }
  }, {
    $project: {
      _id: 0,
      sended: 0,
      received: 0
    }
  }]);
  query.exec(callback);
}

function create(user) {
  UsersArray.push(user);
}

function save(callback) {
  let toInsert = UsersArray;
  UsersArray = [];

  this.getTotalId((err, totalId) => {
    if (err)
      return callback(err);

    for (let item of toInsert) {
      item.id = totalId + 1;
      totalId++;
      let entity = new User(item);
      entity.save((err) => {
        if (!err) {
          return callback(null, item);
        }

        callback(err);
      });
    }
  });
}

module.exports = new UserRepository();
