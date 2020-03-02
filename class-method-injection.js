const classMethods = require("class-methods");

class Parent {
  method() {
    console.log("Running Some Method");
  }
}

class Child extends Parent {
  constructor(...props) {
    super(...props);

    // get parent methods
    const parentMethods = classMethods(this.constructor);

    // create new methods with wrapper
    for (let method of parentMethods) {
      this[method] = (...args) => {
        // run something else before the actual method
        this.before();

        // run actual method from parent
        const result = super[method](...args);

        // run something after the actual method;
        this.after();

        // return result/promise or anything else
        return result;
      };
    }
  }
  before() {
    console.log("\nBefore");
  }
  after() {
    console.log("After");
  }
}

const parentInstance = new Parent();
parentInstance.method();

const childInstance = new Child();
childInstance.method();
