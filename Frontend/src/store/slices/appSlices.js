import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  hasUser: false,
  gym: [],
  gymAdmin: [],
  gymId: null,
  users: [],
  rate: [],
  activeClass: "",
  rateUsers: [],
  rateId: { rateId: "", userName: "", fullName: "", userId: "" },
  rateHistory: [],
  paymentHistory: [],
  report: [],
};

export const appSlices = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, actions) => {
      state.user = actions.payload;
    },
    setGymAdmin: (state, actions) => {
      state.gymAdmin = actions.payload;
    },
    setGym: (state, actions) => {
      state.gym = actions.payload;
    },
    setGymId: (state, actions) => {
      state.gymId = actions.payload;
    },
    setUsers: (state, actions) => {
      state.users = actions.payload;
    },
    setRate: (state, actions) => {
      state.rate = actions.payload;
    },
    setActiveClass: (state, actions) => {
      state.activeClass = actions.payload;
    },
    setRateUsers: (state, actions) => {
      state.rateUsers = actions.payload;
    },
    setRateId: (state, actions) => {
      state.rateId = actions.payload;
    },
    setRateHistory: (state, actions) => {
      state.rateHistory = actions.payload;
    },
    setPaymentHistory: (state, actions) => {
      state.paymentHistory = actions.payload;
    },
    setReport: (state, actions) => {
      state.report = actions.payload;
    },

    setRegionStat: (state, actions) => {
      const regionStat = actions.payload;

      const totalcount = regionStat.reduce(
        (sum, reg) => sum + reg.entityCount,
        0
      );
      const totalInactiveEntityCount = regionStat.reduce(
        (sum, reg) => sum + reg.inactiveEntityCount,
        0
      );
      const totalRegion = {
        regionName: "jami",
        entityCount: totalcount,
        inactiveEntityCount: totalInactiveEntityCount,
      };

      const updateRegionState = [...regionStat, totalRegion];
      state.regionStat = updateRegionState;
    },
  },
});

export const {
  setActiveClass,
  setUsers,
  setGymAdmin,
  setUser,
  setGym,
  setGymId,
  setRate,
  setRateUsers,
  setRateId,
  setRateHistory,
  setPaymentHistory,
  setReport,
} = appSlices.actions;

export default appSlices.reducer;
