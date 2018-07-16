function Repository() { }

Repository.prototype.getAll = getAll;
Repository.prototype.getById = getById;
Repository.prototype.delete = deleteEntity;
Repository.prototype.update = update;

function getAll(callback) {
  var model = this.model;
  var query = model.find({}, { _id: 0});
  query.exec(callback);
}

function getById(id, callback) {
  var model = this.model;
  var query = model.findOne({
    id: id
  }, { _id: 0});
  query.exec((err, data) => {
    if (err) {
      return callback(err);
    }
    delete data._id;
    callback(null, data);
  });
}

function update(id, entity, callback) {
  let model = this.model;
  model.update({ id: id }, entity, { multi: false }, function (err, data) {
    if (err)
      console.log(err);

    callback && callback(err, data);
  });
}

function deleteEntity(id, callback) {
  let model = this.model;
  model.deleteOne({ id: id }, function (err, data) {
    if (err) {
      callback(err);
    }

    callback();
  });
}

module.exports = Repository;