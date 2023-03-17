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
];
const createPayload = function (data = {}, exclude = [], include = []) {
  if (!Array.isArray(exclude)) {
    exclude = [String(exclude)];
  }
  if (!Array.isArray(include)) {
    include = [String(include)];
  }
  exclude = [...exclude, ...excludeGlobal];

  //   console.dir(data, { depth: 3 });
  if ("toJSON" in data) {
    data = { ...data.toJSON() };
  }

  for (const field of exclude) {
    if (include.includes(field)) continue;
    if (field in data) delete data[field];
  }
  // console.log(data);
  return data;
};

const createPayloadForArray = function (datas = [], exclude = []) {
  let rv = [];

  for (let data of datas) {
    rv.push(createPayload(data, (exclude = [])));
  }
  //   console.log(rv);
  return rv;
};

module.exports = { createPayload, createPayloadForArray };
