import {regExp} from "../misc/regex"
import {Location} from "../interfaces/interfaces" 

export class Address {
    address: string | null = null
    pin: string | null = null
    location: Location | null = null

    constructor(address: string) {
        this.setAddress(address)
    }

    hasPin(): boolean {
        return this.pin != null
    }

    setPin(s: string): boolean {
        this.pin = null
        var matchs = s.match(regExp.pin)
        if(matchs!=null){
            this.pin = matchs[0]
            return true
        } else {
            return false
        }
    }

    setAddress(s: string): boolean {
        if(this.setPin(s)){
            this.address = s.replace(this.pin as string,"").trim()
            return true
        } else {
            this.address = s
            return false
        }
    }

    setLocation(s:string): boolean {
        var tmp = s.split(" ")
        if(tmp.length!==2){
            return false
        }
        this.location = {lat:tmp[0],lon:tmp[1]}
        return true
    }
}