export const get = async () => {

  const result = {
    availableApis: [{
      path: "/api/random-ssn",
      default: "Default behaviour: Returns 1 SSN for a person whose sex is random, whose age is between 0 and 120.",
      params: [{
        name: "age",
        optional: true,
        value: "The exact age of the person in years. This parameter is prioritized over minAge and maxAge."
      }, {
        name: "minAge",
        optional: true,
        value: "The minimum age of the person. Must be used with the maxAge parameter."
      }, {
        name: "maxAge",
        optional: true,
        value: "The maximum age of the person. Must be used with the minAge parameter."
      }, {
        name: "sex",
        optional: true,
        value: "The sex of the person. Accepted values: m, male, f, female. Defaults to random."
      }, {
        name: "count",
        optional: true,
        value: "The number of SSNs to generate. Must be an integer. Defaults to 1."
      }]
    }]
  };

  return {
    body: JSON.stringify(result, null, 4),
    headers: {"Content-Type": "application/json"},
    status: 200,
  };

};