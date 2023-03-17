
const excludeGlobal = [
  "__v",
  "createdAt",
  "updatedAt",
  "password",
  "deletedAt",
  "deletedBy",
  "isDeleted",
  "isAdmin",
  "isActive",
  "updatedBy",
  "isActive",
]
const createPayload = function (data = {}, exclude = []) {
  exclude = [
    ...exclude,
    ...excludeGlobal
  ];
//   console.dir(data, { depth: 3 });
  if ("toJSON" in data) {
    data = { ...data.toJSON() };
  }

  for (const field of exclude) {
    if (field in data) {
      delete data[field];
    }
  }
  // console.log(data);
  return data;
};

const createPayloadForArray = function (datas = [], exclude = []) {
  let rv = [];

  for (let data of datas) {
    rv.push(createPayload(data,exclude =[]));
  }
  //   console.log(rv);
  return rv;
};

module.exports = { createPayload, createPayloadForArray };
