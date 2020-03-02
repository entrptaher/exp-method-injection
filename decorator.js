function decorator(target, name, descriptor) {
  const original = descriptor.value;
  if (typeof original === "function") {
    descriptor.value = function(...args) {
      let start = Date.now();

      const result = original.apply(this, args);

      let duration = Date.now() - start;
      console.log(name + " - duration - " + duration);
      return result;
    };
  }
  return descriptor;
}

class Parent {
  @decorator
  method() {
    console.log("Running Some Method");
  }
}

const parentInstance = new Parent();
parentInstance.method();
