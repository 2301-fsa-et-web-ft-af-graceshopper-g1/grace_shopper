const createGuestUser = () => {
  const guestUser = {
    userId: Math.floor(Math.random() * 100000000), //
    orderId: Math.floor(Math.random() * 100000000),
  };

  localStorage.setItem("guestUser", JSON.stringify(guestUser));
};

export default createGuestUser;
