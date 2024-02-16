import { configureStore } from "@reduxjs/toolkit";

import connectFunction from "./feature";

export default configureStore({
  reducer: {
    user: connectFunction,
  },
});
