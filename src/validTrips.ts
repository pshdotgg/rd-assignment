interface Shipment {
  pickups: string[]
  dropoffs: string[]
}

interface Trip {
  pickups: string[]
  dropoffs: string[]
  via?: string
}

const shipment = {
  pickups: ['A', 'B', 'E'],
  dropoffs: ['C', 'D'],
}
const trips = [
  { pickups: ['A'], dropoffs: ['C'], via: 'W' },
  { pickups: ['B'], dropoffs: ['D'], via: 'W2' },
  { pickups: ['W'], dropoffs: ['C'] },
  { pickups: ['W2'], dropoffs: ['D'] },
]
const shipment2 = {
  pickups: ['A', 'B', 'E'],
  dropoffs: ['C', 'D'],
}
const trips2 = [
  { pickups: ['A'], dropoffs: ['C'], via: 'W1' },
  { pickups: ['B'], dropoffs: ['D'], via: 'W2' },
  { pickups: ['W3'], dropoffs: ['C'] },
  { pickups: ['W4'], dropoffs: ['D'] },
]

interface ValidTrip {
  [key: string]: string[]
}

const isValidTrips = (shipment: Shipment, trips: Trip[]) => {
  const validDropoffs: ValidTrip = {}

  for (const dropoff of shipment.dropoffs) {
    validDropoffs[dropoff] = [...shipment.pickups]
  }

  // add valid via points to validPickups and validDropoffs
  for (const trip of trips) {
    if (trip.via) {
      for (const dropoff of trip.dropoffs) {
        validDropoffs[dropoff].push(trip.via)
      }
    }
  }

  // check if all pickups and dropoffs are valid
  for (const trip of trips) {
    if (
      !trip.dropoffs.every((dropoff) =>
        trip.pickups.every((pickup) => validDropoffs[dropoff].includes(pickup))
      )
    )
      return false
  }

  return true
}

console.log('valid example:', isValidTrips(shipment, trips))
console.log('invalid example:', isValidTrips(shipment2, trips2))
