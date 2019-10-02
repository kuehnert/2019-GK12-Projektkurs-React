const charCodeA = "A".charCodeAt(0) // => 65

// Stelle im Alphabet, A==0, B==1, ....
function ordinal(charCode) {
  return charCode - charCodeA
}

// 2 ("C"), 5 => 7 => "H"
// 25 ("Z"), 3 => 2 => "C"
function shiftLetter(letter, shift) {
  const code = charCodeA + ((ordinal(letter) + shift) % 26)
  return String.fromCharCode(code)
}

export function clean(input) {
  return input
    .toUpperCase()
    .replace(/Ö/g, "OE")
}

export function caesar(input, shift) {
  const cleaned = clean(input);
  let out = ""

  for (let i = 0; i < cleaned.length; i++) {
    const code = cleaned.charCodeAt(i)
    out += shiftLetter(code, shift)
  }

  return out
}
