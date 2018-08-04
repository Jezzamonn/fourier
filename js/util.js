export function easeInOut(t, amt=2) {
    let tPow = Math.pow(t, amt);
    return tPow / (tPow + Math.pow(1 - t, amt));
}

export function sinEaseInOut(t) {
	return 0.5 - 0.5 * Math.cos(Math.PI * t);
}

export function smallEaseInOut(t, a, b) {
    // maximum slope, during the constant part
    let m = 1 / (1 - a - b);
    
    // f0
    if (t < a) {
        return 0;
    }

    // f1
    if (t < b) {
        return ((m / 2) / (b - a)) * (t - a) * (t - a);
    }
    
    // f2
    if (t < 1 - b) {
        return m * (t - b) + // constant line part
        (m / 2) * (b - a); // maximum value of f1
    }
    
    // use symmetry powers
    return 1 - smallEaseInOut(1 - t, a, b)
}

export function slurp(val1, val2, amt) {
    return (val2 - val1) * amt + val1;
}

export function experp(val1, val2, amt) {
    return Math.exp(
        slurp(
            Math.log(val1),
            Math.log(val2),
            amt
        )
    )
}

export function clampedSlurp(val1, val2, amt) {
    if (amt < 0) {
        return val1;
    }
    if (amt > 1) {
        return val2;
    }
    return slurp(val1, val2, amt);
}

export function clamp(amt, val1, val2) {
    if (amt < 0) {
        return val1;
    }
    if (amt > 1) {
        return val2;
    }
    return amt;
}