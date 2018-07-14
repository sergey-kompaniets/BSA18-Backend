const connection = require("../db/dbconnect");
const Repository = require("./GeneralRepository");
const Message = require("../models/message");

MessageRepository.prototype = new Repository();
MessageRepository.prototype.create = create;
MessageRepository.prototype.save = save;

let MessArray = [];

function MessageRepository() {
  Repository.prototype.constructor.call(this);
  this.model = Message;
}

function create(user) {
  MessArray.push(user);
}

function save(callback) {
  let toInsert = MessArray;
  MessArray = [];

  this.getTotalId((err, maxId) => {
    if (err)
      return callback(err);

    for (let item of toInsert) {
      item.id = maxId + 1;
      maxId++;
      let entity = new Message(item);
      entity.save(function (err) {
        err && callback(err);
      });

    }
  });
}

module.exports = new MessageRepository();