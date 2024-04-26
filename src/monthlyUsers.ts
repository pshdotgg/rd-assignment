import { USERS } from './data'

interface User {
  userId: string
  lastSeenAt: number
  devices: {
    deviceId: string
    logged_in: number
    logged_out: number | null
  }[]
}

const getMonthlyActiveUsers = (users: User[]) => {
  const monthlyActiveUsers = new Set()
  const currentTime = Date.now()
  const thirtyDaysInMs = 1000 * 60 * 60 * 24 * 30

  users.forEach((user) => {
    if (user.lastSeenAt > currentTime - thirtyDaysInMs) {
      monthlyActiveUsers.add(user.userId)
    }
  })
  return monthlyActiveUsers.size
}
const getMonthlyLoggedInUsers = (users: User[]) => {
  const monthlyLoggedInUsers = new Set()
  const currentTime = Date.now()
  const thirtyDaysInMs = 1000 * 60 * 60 * 24 * 30

  users.forEach((user) => {
    user.devices.forEach((device) => {
      const isLoggedIn =
        !device.logged_out || device.logged_out > currentTime - thirtyDaysInMs

      if (isLoggedIn) {
        monthlyLoggedInUsers.add(user.userId)
      }
    })
  })
  return monthlyLoggedInUsers.size
}
console.log('Monthly Active Users:', getMonthlyActiveUsers(USERS))
console.log('Monthly Logged In Users:', getMonthlyLoggedInUsers(USERS))
