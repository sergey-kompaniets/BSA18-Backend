Repository.prototype.getAll = getAll;
Repository.prototype.getById = getById;
Repository.prototype.getTotalId = getTotalId;
Repository.prototype.delete = removeObj;
Repository.prototype.update = update;

function getAll(callback) {
  let model = this.model;
  let query = model.find({}, { _id: 0 });
  query.exec(callback);
}

function getById(id, callback) {
  let model = this.model;
  let query = model.findOne({
    id: id
  }, { _id: 0 });
  query.exec((err, data) => {
    if (err) {
      return callback(err);
    }

    delete data._id;

    callback(null, data);
  });
}

function removeObj(id, callback) {
  let model = this.model;
  model.deleteOne({ id: id }, function (err, data) {
    if (err) {
      callback(err);
    }

    callback();
  });
}

function getTotalId(callback) {
  let query = this.model.find().sort({ id: -1 }).limit(1);

  query.exec(function (err, data) {
    if (err)
      console.log(err);
    

    let totalId = 0;
    if (data.length != 0) {
      totalId = data[0].id || 0;
    }

    callback(err, totalId);
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

module.exports = Repository;
