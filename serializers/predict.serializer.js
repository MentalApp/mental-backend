const predictSerializer = {
  new: (predict) => {
    return {
      id: predict.id,
      userId: predict.userId,
      nameUser: predict.nameUser,
      officerTestId: predict.officerTestId,
      predict: predict.predict,
      //chuẩn đoán bệnh
      diagnosis: predict.diagnosis,
      conflict: predict.conflict,
      createdAt: predict.createdAt,
      updatedAt: predict.updatedAt,
    };
  },
};

module.exports = predictSerializer;
