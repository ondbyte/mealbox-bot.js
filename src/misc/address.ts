import {regExp} from "../config"

export class Address {
    address: string | null = null
    pin: string | null = null

    constructor(address: string) {
        this.setAddress(address)
    }

    hasPin(): boolean {
        return this.pin != null
    }

    setPin(s: string): boolean {
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
}