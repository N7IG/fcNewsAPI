class ErrorHandler {
    constructor() {
        if (!ErrorHandler.instance) {
            ErrorHandler.instance = this;
        }

        return ErrorHandler.instance;
    }

    alert(msg) {
        alert("ERROR: " + msg);
    }
}

const instance = new ErrorHandler();
Object.freeze(instance);

export default instance;
