import {parseAddress} from "../src/handle/handler"

test("parseAddress test", ()=>{
    expect(parseAddress("bjhadjnj 570001")[1]).toBe("570001")
    expect(parseAddress("bjhadjnj5700010")[1]).toBe(undefined)
    expect(parseAddress("bjhadjnj570001dad")[1]).toBe("570001")
})