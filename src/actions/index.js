export function addItem(id) {
  return { type: "ADD_ITEM", payload: id }
};

export function removeItem(id) {
  return { type: "REMOVE_ITEM", payload: id }
};

export function changeFilter(cuisine){
  return { type: "CHANGE_FILTER", payload: cuisine }
}
/*
export function changeFilter(cuisine){
  return { type: "CHANGE_FILTER", payload: cuisine }
}*/

