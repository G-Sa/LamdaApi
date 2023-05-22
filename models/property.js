export default class Property {
    owner = "";
    address = "";
    city = "";
    state = "";
    zip_code = "";
    constructor(owner, address, city, state, zip_code) {
        this.owner = owner;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip_code = zip_code;
    }
}
