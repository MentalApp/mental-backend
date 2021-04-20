const filterService = {
  shallowFilter: async (officerTest) => {
    const answer_shallow = JSON.parse(officerTest.answer);
    const testMap = [[0, 9], [9, 11], [11, 19], [19, 26]];
    const rules = [6, 1, 4, 4]
    let result = 0;
    var BreakException = {};
    try {
      testMap.forEach(function (item, index) {
        if (answer_shallow.slice(item[0], item[1]).filter(i => i["answer"] == "Có").length >= rules[index]) throw BreakException;
      });
    } catch (error) {
      result = 1;
    }

    return result;
  },

  deepFilter: async (officerTest) => {
    const answer_deep = JSON.parse(officerTest.answer);
    let result = 0;
    if (answer_deep[14]["answer"] == "Không") {
      if (answer_deep[16]["answer"] == "Không") {
        if (answer_deep[17]["answer"] == "Không") {
          result = 0
        } else {
          result = answer_deep[18]["answer"] == "Có" ? 1 : 0
        }
      } else {
        result = answer_deep[2]["answer"] == "Có" ? 1 : 0
      }
    } else {
      if (answer_deep[23]["answer"] == "Không") {
        result = answer_deep[10]["answer"] == "Có" ? 1 : 0
      } else {
        result = 1
      }
    }

    return result;
  }
}

module.exports = filterService;
