const userSerializer = {
  new: (user) => {
    return ({
      id:           user.id,
      fullName:     user.fullName,
      email:        user.email,
      address:      user.address,
      phone:        user.phone,
      type:         user.type,
      role:         user.role,
      joinArmy:     user.joinArmy,
      unit:         user.unit,
      rank:         user.rank,
      position:     user.position
    })
  }
};

module.exports = userSerializer;
