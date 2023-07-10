const Person = require("../models/person");
const Order = require("../models/order");

class Repositories {

  static syncRepo(){
        Person.sync();   
        Person.hasMany(Order);
        Order.sync({ alter: true });   
    }

}

module.exports = Repositories;
