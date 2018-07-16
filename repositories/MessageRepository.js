const connection = require("../db/dbconnect");
const Repository = require("./GeneralRepository");
const Message = require("../models/message");

var UsersArray  = [];

function MessageRepository() {
  Repository.prototype.constructor.call(this);
  this.model = Message;
}

function create(user) {
  UsersArray .push(user);
}

function save(message, callback) {
  let entity = new Message({
    id: message.id,
    senderId: message.senderId,
    receiverId: message.receiverId,
    text: message.text
  }); 
  entity.save(function (err) {
    err && callback(err);
  });
}

MessageRepository.prototype = new Repository();
MessageRepository.prototype.create = create;
MessageRepository.prototype.save = save;

module.exports = new MessageRepository();