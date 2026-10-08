class User {
    #id;
    #username;
    #passwordHash;

    constructor(id, username, passwordHash) {
        this.#id = id;
        this.#username = username;
        this.#passwordHash = passwordHash;
    }

    get id() { return this.#id; }
    get username() { return this.#username; }
    get passwordHash() { return this.#passwordHash; }

    toJSON() {
        return {
            id: this.#id,
            username: this.#username
        };
    }
}

module.exports = User;