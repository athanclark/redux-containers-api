import Api from 'redux-apis'
import R from 'ramda'


export class ListApi extends Api {
  static INITIAL_STATE = [];

  constructor(initState = ListApi.INITIAL_STATE) {
    super(initState)

    // We only need actions for mutative methods
    this.setHandler('PUSH', (state, action) => R.append(action.payload, state))
    this.setHandler('POP', (state, action) => R.dropLast(state))
    this.setHandler('UNSHIFT', (state, action) => R.prepend(action.payload, state))
    this.setHandler('SHIFT', (state, action) => R.drop(1, state))

    this.setHandler('DROP', (state, action) => R.drop(action.payload, state))
    this.setHandler('INSERT', (state, action) => R.insert(action.payload.idx, action.payload.value, state))

    this.setHandler('MAP', (state, action) => state.map(action.payload))
    this.setHandler('OVER', (state, action) => state.map((x,i) => R.contains(i,action.payload.in)
                                                                    ? action.payload.func(x)
                                                                    : x))
  }

  push(x) {
    this.dispatch(this.createAction('PUSH')(x))
  }

  pop() {
    this.dispatch(this.createAction('POP'))
  }

  unshift(x) {
    this.dispatch(this.createAction('UNSHIFT')(x))
  }

  shift() {
    this.dispatch(this.createAction('SHIFT'))
  }

  drop(i) {
    this.dispatch(this.createAction('DROP')(i))
  }

  insert(i, x) {
    this.dispatch(this.createAction('INSERT')({ idx: i, value: x }))
  }

  map(f) {
    this.dispatch(this.createAction('MAP')(f))
  }

  over(is, f) {
    this.dispatch(this.createAction('OVER')({ in: is, func: f }))
  }

  // Read-only
  lookup (i) {
    i >= 0 && i < this.getState().length
      ? this.getState()[i]
      : null
  }
}
