export const config = {
    redisServerPath:"r607/src/redis-server",
    redisHost:"127.0.0.1",
    redisPort: 6379,
    redisPassword: undefined
}

export const business = {
    name:"Business name",
    minimum_order:"200",
    about:"demo description demo description demo description demo description"
}

export const ask = {
    name:"Please tell me your full name",
    addrress:"Please send me your address",
    pin:"Please send me your PIN-code",
    location:"Send me your location for easier delivery",
    number:"send other numbers (separated by a space) who wish to order from us, for every first order they place you'll receive ₹50 credit to order from us"
}

export const regExp = {
    pin:/(?<!\d)\d{6}(?!\d)/
}