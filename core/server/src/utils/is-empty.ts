import { isNil, isEmpty as _isEmpty } from "lodash";

const isEmpty = (data: any): boolean => {
  return !data || isNil(data) || _isEmpty(data);
};

export default Object.freeze({
  isEmpty,
});

export { isEmpty };
