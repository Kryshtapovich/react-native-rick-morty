import { startLoadingAction, stopLoadingAction } from "@actions/loading";
import { GetLocationListAction } from "@actions/location";
import Location from "@models/location";
import { ResultList } from "@models/pagination";
import { Dispatch } from "redux";

import requests, { fixDate } from ".";

export function getLocations(page = 1) {
  return function (dispatch: Dispatch) {
    dispatch(startLoadingAction());
    requests
      .get<ResultList<Location>>(`/location?page=${page}`)
      .then(({results}) => {
        setTimeout(() => {
          const locations = results.map(fixDate);
          dispatch(GetLocationListAction(locations, page + 1));
        }, 2000);
        setTimeout(() => dispatch(stopLoadingAction()), 2000);
      });
  };
}
