
function loadLocalStore(key, defaultValue) {
  try {
    const serializedValue = localStorage.getItem(key)
    if (serializedValue === null) {
      return defaultValue
    }
    return JSON.parse(serializedValue)
  } catch (err) {
    return defaultValue
  }
}

function saveLocalStore(key, value) {
  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (err) {
    console.warn( `Failed to save to localStorage ${key}: ${value}` )
  }
}

export {
  loadLocalStore,
  saveLocalStore,
}
