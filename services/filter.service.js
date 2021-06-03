const newAnswer = {
  KHONG_CO: 'Không có',
  THINH_THOANG: 'Thỉnh thoảng',
  THUONG_XUYEN: 'Thường xuyên',
  HAU_NHU_CA_NGAY: 'Hầu như cả ngày',
};

const filterService = {
  shallowFilter: async (officerTest) => {
    const answer_shallow = JSON.parse(officerTest.answer);
    const testMap = [
      [0, 9],
      [9, 11],
      [11, 19],
      [19, 26],
    ];
    const rules = [6, 1, 4, 4];
    let result = 0;
    var BreakException = {};
    try {
      testMap.forEach(function (item, index) {
        if (
          answer_shallow
            .slice(item[0], item[1])
            .filter(
              (i) =>
                i['answer'] === 'Thỉnh thoảng' ||
                i['answer'] === 'Thường xuyên' ||
                i['answer'] === 'Hầu như cả ngày',
            ).length >= rules[index]
        )
          throw BreakException;
      });
    } catch (error) {
      result = 1;
    }

    return result;
  },

  deepFilter: async (officerTest) => {
    const answer_deep = JSON.parse(officerTest.answer);
    let result = 0;
    if (answer_deep[14]['answer'] !== 'Không có') {
      if (answer_deep[16]['answer'] !== 'Không có') {
        if (answer_deep[17]['answer'] !== 'Không có') {
          result = 0;
        } else {
          result = answer_deep[18]['answer'] === 'Không có' ? 1 : 0;
        }
      } else {
        result = answer_deep[2]['answer'] === 'Không có' ? 1 : 0;
      }
    } else {
      if (answer_deep[23]['answer'] !== 'Không có') {
        result = answer_deep[10]['answer'] === 'Không có' ? 1 : 0;
      } else {
        result = 1;
      }
    }

    return result;
  },
};

module.exports = filterService;
