// This is not very efficent, but what are th criteria for usr "offline"?
module.exports = (users) => {
  array = users.map(({ create_time, _id, nickname, username }) => {
    status = setStatusByMinutesDiff(create_time);
    return { create_time, _id, nickname, username, status };
  });
  return array;
};

const setStatusByMinutesDiff = (create_time) => {
  const diff = create_time - Date.now();
  const resultInMinutes = Math.round(diff / 60000);
  return resultInMinutes >= -15 ? "Online" : "Offline";
};
