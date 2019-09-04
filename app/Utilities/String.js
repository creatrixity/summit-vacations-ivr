const pickQueryStringValue = (key, queryString) => {
  const urlString = `http://example.com/q?${queryString}`
  
  return urlString.searchParams.get(key)
}

module.exports = {
  pickQueryStringValue  
}
