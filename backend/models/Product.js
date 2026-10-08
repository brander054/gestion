class Product {
    #id;
    #name;
    #quantity;
    #price;

    constructor(id, name, quantity, price) {
        this.#id = id;
        this.#name = name;
        this.quantity = quantity;
        this.price = price;
    }

    get id() { return this.#id; }
    get name() { return this.#name; }
    get quantity() { return this.#quantity; }
    get price() { return this.#price; }

    set quantity(value) {
        if (typeof value !== 'number' || value < 0) {
            throw new Error('La cantidad debe ser un número entero >= 0');
        }
        this.#quantity = value;
    }

    set price(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('El precio debe ser mayor a 0');
        }
        this.#price = value;
    }

    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            quantity: this.#quantity,
            price: this.#price
        };
    }
}

module.exports = Product;