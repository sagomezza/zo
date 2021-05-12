export const createIdempotency = (uid) => {
  try {
    console.log("called createIdempotency");
    console.log(uid);
    let idempotency = uid + "-" + Date.now().toString();
    return idempotency;
  } catch (err) {
      console.log(err)
  }
};
