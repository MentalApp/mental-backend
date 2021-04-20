const userSerializer = {
  new: (user) => {
    return {
      id: user.id,
      fullName: user.fullName,
      nameWithoutUtf8: user.nameWithoutUtf8,
      email: user.email,
      address: user.address,
      militaryCode: user.militaryCode,
      isBlock: user.isBlock,
      phone: user.phone,
      type: user.type,
      role: user.role,
      joinArmy: user.joinArmy,
      unit: user.unit,
      rank: user.rank,
      position: user.position,
      createdAt: user.createdAt,
    };
  },
};

module.exports = userSerializer;
