interface User {
    user: string;
    name: string;
    address: string;
    pin: string;
    asked: string;
    location: Location;
  }
  
  interface Location {
    lat: string;
    lon: string;
  }

  class Address{
    address:string;
    pin:string;

    constructor(address:string,pin:string){
      this.address=address
      this.pin=pin
    }

    hasPin():boolean=>this.pin.length==6;
  }