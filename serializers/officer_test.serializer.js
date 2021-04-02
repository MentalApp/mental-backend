const officerTestSerializer = {
  new: (officerTest) => {
    return ({
      id:                   officerTest.id,
      name:                 officerTest.name,
      dateOfBirth:          officerTest.dateOfBirth,
      gender:               officerTest.gender,
      militaryCode:         officerTest.militaryCode,
      nation:               officerTest.nation,
      joinArmy:             officerTest.joinArmy,
      unit:                 officerTest.unit,
      rank:                 officerTest.rank,
      position:             officerTest.position,
      answer:               JSON.parse(officerTest.answer),
      otherSymptom:         officerTest.otherSymptom,
      otherPeople:          officerTest.otherPeople,
      predictShallowFilter: officerTest.predictShallowFilter,
      predictDeepFilter:    officerTest.predictDeepFilter,
    })
  }
};

module.exports = officerTestSerializer;
