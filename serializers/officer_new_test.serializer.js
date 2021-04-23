const officerNewTestSerializer = {
  new: (officerNewTest, test, comments) => {
    return {
      id: officerNewTest.id,
      name: officerNewTest.name,
      dateOfBirth: officerNewTest.dateOfBirth,
      gender: officerNewTest.gender,
      militaryCode: officerNewTest.militaryCode,
      nation: officerNewTest.nation,
      joinArmy: officerNewTest.joinArmy,
      unit: officerNewTest.unit,
      rank: officerNewTest.rank,
      position: officerNewTest.position,
      answer: JSON.parse(officerNewTest.answer),
      otherSymptom: officerNewTest.otherSymptom,
      otherPeople: officerNewTest.otherPeople,
      predict_id: officerNewTest.predict_id,
      doctorPredict: officerNewTest.doctorPredict,
      doctorPredictDiagnosis: officerNewTest.doctorPredictDiagnosis,
      predictShallowFilter: officerNewTest.predictShallowFilter,
      predictDeepFilter: officerNewTest.predictDeepFilter,
      testVersion: !test
        ? officerNewTest.testVersion
        : {
            id: test.id,
            name: test.name,
            code: test.code,
            description: test.description,
            startDate: test.startDate,
            endDate: test.endDate,
          },
      comments: comments,
    };
  },
};

module.exports = officerNewTestSerializer;
