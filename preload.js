const { contextBridge, ipcRenderer } = require("electron");

const Person = require("./models/person");
const Order = require("./models/order");

contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(...args)),
});

contextBridge.exposeInMainWorld("Person", {
  getAllPerson: async () => {
    return await Person.findAll({
      raw: true,
    });
  },
  findPerson: async (whereClause) => {
    return await Person.findAll({
      where: whereClause,
    });
  },
  addPerson: async (person) => {
    if (typeof person === "object" && person !== null) {
      return await Person.create(person);
    }
    return null;
  },
  updatePerson: async (person, whereClause) => {
    if (
      typeof person === "object" &&
      person !== null &&
      typeof whereClause === "object" &&
      whereClause !== null
    ) {
      return await Person.update(person, {
        where: whereClause,
      });
    }
    return null;
  },
  deletePerson: async (person) => {
    if (typeof person === "object" && person !== null) {
      return await Person.destroy({
        where: person,
      });
    }
    return null;
  },
});
