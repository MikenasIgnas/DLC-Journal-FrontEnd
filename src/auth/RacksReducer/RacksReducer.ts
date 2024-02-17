import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Premises, Racks } from '../../types/globalTypes'

interface RacksReducer {
    racks:       Racks[]
    checkedList: string[]
    premise:     Premises[]
}

const initialState: RacksReducer = {
  racks:       [],
  checkedList: [],
  premise:     [],
}
const racksSlice = createSlice({
  name:     'racks',
  initialState,
  reducers: {
    setCompanyRacks(state, { payload }: PayloadAction<Racks[]>) {
      state.racks = payload
    },
    addToChecklist(state, { payload }: PayloadAction<string[]>){
      for (let index = 0; index < payload.length; index++) {
        const element = payload[index]
        if(!state.checkedList.includes(element)){
          state.checkedList.push(element)
        }
      }
    },
    removeFromChecklist(state, { payload }: PayloadAction<string[]>){
      const filterUnchecked = state.checkedList.filter((el) => !payload.includes(el))
      state.checkedList = filterUnchecked
    },
    setCheckedList(state, { payload }: PayloadAction<string[]>) {
      state.checkedList = payload
    },
    setPermise(state, { payload }: PayloadAction<Premises[]> ) {
      state.premise = payload
    },
    resetRacksReducer(){
      return initialState
    },
  },
})

export const {
  setCompanyRacks,
  addToChecklist,
  removeFromChecklist,
  setCheckedList,
  setPermise,
  resetRacksReducer,
} = racksSlice.actions

export default racksSlice.reducer