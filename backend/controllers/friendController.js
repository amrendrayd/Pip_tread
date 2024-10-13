const User = require("../models/User");

// Send Friend Request
const sendFriendRequest = async (req, res) => {
  const { userId } = req.params;
  const sender = await User.findById(req.user.id);
  const receiver = await User.findById(userId);

  if (
    !receiver ||
    sender.friends.includes(userId) ||
    sender.friendRequestsSent.includes(userId)
  ) {
    return res.status(400).json({ message: "Cannot send friend request" });
  }

  receiver.friendRequestsReceived.push(sender.id);
  sender.friendRequestsSent.push(receiver.id);

  await receiver.save();
  await sender.save();
  res.status(200).json({ message: "Friend request sent!" });
};

// Accept Friend Request
const acceptFriendRequest = async (req, res) => {
  const { userId } = req.params;
  const receiver = await User.findById(req.user.id);
  const sender = await User.findById(userId);

  if (!receiver.friendRequestsReceived.includes(sender.id)) {
    return res.status(400).json({ message: "No friend request to accept" });
  }

  receiver.friends.push(sender.id);
  sender.friends.push(receiver.id);

  receiver.friendRequestsReceived = receiver.friendRequestsReceived.filter(
    (id) => id.toString() !== sender.id
  );
  sender.friendRequestsSent = sender.friendRequestsSent.filter(
    (id) => id.toString() !== receiver.id
  );

  await receiver.save();
  await sender.save();
  res.status(200).json({ message: "Friend request accepted!" });
};

// Reject Friend Request
const rejectFriendRequest = async (req, res) => {
  const { userId } = req.params;
  const receiver = await User.findById(req.user.id);
  const sender = await User.findById(userId);

  if (!receiver.friendRequestsReceived.includes(sender.id)) {
    return res.status(400).json({ message: "No friend request to reject" });
  }

  receiver.friendRequestsReceived = receiver.friendRequestsReceived.filter(
    (id) => id.toString() !== sender.id
  );
  sender.friendRequestsSent = sender.friendRequestsSent.filter(
    (id) => id.toString() !== receiver.id
  );

  await receiver.save();
  await sender.save();
  res.status(200).json({ message: "Friend request rejected" });
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
};
