const officerTestSerializer = {
  new: (officerTest, test, comments) => {
    return ({
      id: officerTest.id,
      name: officerTest.name,
      dateOfBirth: officerTest.dateOfBirth,
      gender: officerTest.gender,
      militaryCode: officerTest.militaryCode,
      nation: officerTest.nation,
      joinArmy: officerTest.joinArmy,
      unit: officerTest.unit,
      rank: officerTest.rank,
      position: officerTest.position,
      answer: JSON.parse(officerTest.answer),
      otherSymptom: officerTest.otherSymptom,
      otherPeople: officerTest.otherPeople,
      predictShallowFilter: officerTest.predictShallowFilter,
      predictDeepFilter: officerTest.predictDeepFilter,
      testVersion:  !test ? 
                    officerTest.testVersion :
                    {
                      id: test.id,
                      name: test.name,
                      code: test.code,
                      description: test.description,
                      startDate: test.startDate,
                      endDate: test.endDate
                    },
      comments: comments,
    })
  }
};

module.exports = officerTestSerializer;
