import { makeAutoObservable } from 'neoi'

class CountStore {
  value = 0

  constructor() {
    makeAutoObservable(this)
  }

  increment = () => {
    this.value += 1
  }

  decrement = () => {
    this.value -= 1
  }
}

export const countStore = new CountStore()
