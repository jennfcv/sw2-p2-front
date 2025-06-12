export const getRoles = () => {
  try {
    return JSON.parse(localStorage.getItem('roles')) || []
  } catch {
    return []
  }
}

export const hasRole = (role) => {
  const roles = getRoles()
  return roles.includes(role)
}
