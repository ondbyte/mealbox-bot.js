import {isAcknowledge} from "../src/handle/handler"
import { Address } from "../src/misc/address"

test("parseAddress test", ()=>{
    const a = new Address("")
    expect(parseAddress("bjhadjnj 570001")).toBe({address:"bjhadjnj",pin:"570001"})
    expect(parseAddress("bjhadjnj5700010")).toBe({address:"bjhadjnj",pin:""})
    expect(parseAddress("bjhadjnj570001dad")).toBe({address:"bjhadjnjdad",pin:"570001"})
})

test("isAcknowledge test",()=>{
    expect(isAcknowledge("yes")).toBe(true)
    expect(isAcknowledge("ok")).toBe(true)
    expect(isAcknowledge("okay")).toBe(true)
    expect(isAcknowledge("sure okay")).toBe(true)
    expect(isAcknowledge("yes sure")).toBe(true)
    expect(isAcknowledge("no")).toBe(false)
    expect(isAcknowledge("nope")).toBe(false)
    expect(isAcknowledge("not")).toBe(false)
    expect(isAcknowledge("not okay")).toBe(false)
    expect(isAcknowledge("")).toBe(false)
})