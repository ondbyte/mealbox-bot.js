import {isAcknowledge} from "../src/handle/misc/helpers"
import { Address } from "../src/handle/classes/address"

test("parseAddress test", ()=>{
    const a = new Address("bjhadjnj 570001")
    expect(a.address).toBe("bjhadjnj")
    expect(a.hasPin()).toBe(true)
    expect(a.pin).toBe("570001")
    expect(a.setAddress("dhshhsd570002hdh")).toBe(true)
    expect(a.hasPin()).toBe(true)
    expect(a.pin).toBe("570002")
    expect(a.address).toBe("dhshhsdhdh")
    expect(a.setAddress("asbdhbahb")).toBe(false)
    expect(a.hasPin()).toBe(false)
    expect(a.address).toBe("asbdhbahb")
    expect(a.pin).toBe(null)
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