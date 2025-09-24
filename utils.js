function generateTokens(count) {
  return Array.from({ length: count }, (_, i) => `tok${i + 1}`).join(" ");
}


export { generateTokens }