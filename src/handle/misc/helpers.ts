
export function isAcknowledge(s: string) {
    if (s.localeCompare("") == 0) {
        return false
    }
    var options = ["ok", "okay", "sure", "yes"]
    if (options.some(e => s.localeCompare(e) >= 0)) {
        return true
    }
    return false
}