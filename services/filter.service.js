const filterService = {
  shallowFilter: async (officerTest) => {
    const answer = officerTest.answer;
    const testMap = [[0, 9], [9, 11], [11, 19], [19, 26]];
    const rules = [6, 1, 4, 4]
    let result = 0;
    var BreakException = {};
    try {
      testMap.forEach(function(item, index){
        if (answer.slice(item[0], item[1]).filter(answer => answer["answer"] == "Có").length >= rules[index]) throw BreakException;
      });
    } catch (error) {
      result = 1;
    }

    return result;
  },

  deepFilter: async (officerTest) => {
    const answer = officerTest.answer;
    let result = 0;
    let predict
    if (answer[14].answer == "Không") {
      if (answer[16].answer == "Không") {
        if (answer[17] == "Không") {
          predict = 0
        } else {
          predict = answer[18].answer == "Có" ? 1 : 0
        }
      } else {
        predict = answer[2].answer == "Có" ? 1 : 0
      }
    } else {
      if (answer[23].answer == "Không") {
        predict = answer[10].answer == "Có" ? 1 : 0
      } else {
        predict = 1
      }
    }

    if (predict != (answer[26].answer == "Có" ? 1 : 0)) {
      result = 1
    }

    return result;
  }
}

module.exports = filterService;