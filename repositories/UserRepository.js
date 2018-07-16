const connection = require("../db/dbconnect");
const Repository = require("./GeneralRepository");
const User = require("../models/user");
const MessageRepository = require("../repositories/MessageRepository");

let UsersArray = [];

function UserRepository() {
  Repository.prototype.constructor.call(this);
  this.model = User;
}

function getSendedMessages(id, callback) {
  let model = this.model;
  let query = MessageRepository.model.distinct('receiverId', { senderId: id }).lean();
  query.exec(callback);
}

function getFriends (data, callback) {
  let model = this.model;
  let query = model.find({ id: { $in: data } });
  query.exec(callback);
}

function create(user) {
  UsersArray.push(user);
}

function save(user, callback) {
      let entity = new User({
        id: user.id,
        name: user.name,
        email: user.email
      });
      
      entity.save((err) => {
        if (!err) {
          return callback(null);
        }
        callback(err);
      });
}

UserRepository.prototype = new Repository();

UserRepository.prototype.create = create;
UserRepository.prototype.save = save;
UserRepository.prototype.getSendedMessages = getSendedMessages;
UserRepository.prototype.getFriends = getFriends;

module.exports = new UserRepository();