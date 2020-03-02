class Parent {
  method() {
    console.log("Running Some Method");
  }
}

class Child extends Parent {
  constructor(...props) {
    super(...props);
    return new Proxy(this, {
      get: function(target, name) {
        if (typeof target[name] === "function") {
          return async function(...args) {
            await target.before();

            const res = await target[name](...args);

            await target.after();
            return res;
          };
        }
        return target[name];
      }
    });
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
