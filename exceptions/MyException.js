class MyException extends Error {
    constructor(message, status) {
      super(message);
      this.name = this.constructor.name;
      this.status = status || 500;
    }
  
    toJson() {
      return {
        message: this.message,
        status: this.status,
        stack: this.stack
      };
    }
  }
  
  module.exports = MyException;