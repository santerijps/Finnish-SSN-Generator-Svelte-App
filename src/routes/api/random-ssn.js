import { RandomSSN } from "$lib/ssn";
import { repeat, sexToEnum } from "$lib/util";

export const get = async ({ url }) => {

  let
    result = {ok: true, ssn: []},
    { searchParams } = url,
    age = searchParams.get("age"),
    minAge = searchParams.get("minAge"),
    maxAge = searchParams.get("maxAge"),
    sex = sexToEnum(searchParams.get("sex")),
    count = searchParams.get("count") || 1;

  if (count !== null) {
    count = count / 1;
    if (!Number.isInteger(count)) {
      count = 1;
    }
  }

  if (age !== null) {
    age = age / 1;
    if (Number.isInteger(age)) {
      repeat(count, () => {
        result.ssn.push(RandomSSN.exactly(age, sex));
      });
    }
  }

  else if (minAge !== null && maxAge !== null) {
    minAge = minAge / 1;
    maxAge = maxAge / 1;
    if (Number.isInteger(minAge) && Number.isInteger(maxAge)) {
      repeat(count, () => {
        result.ssn.push(RandomSSN.between(minAge, maxAge, sex));
      });
    }
  }

  else if ((minAge && !maxAge) || (!minAge && maxAge)) {
    result.ok = false;
  }

  else {
    repeat(count, () => {
      result.ssn.push(RandomSSN.between(0, 120, sex));
    });
  }

  return {
    body: JSON.stringify(result, null, 4),
    headers: {"Content-Type": "application/json"},
    status: result.ok ? 200 : 400,
  };

};