const { down } = require("./test_pool.seed");

// Write seed here
module.exports = {
  up: (queryInterface, Sequelize) => {
    const listQuestion = [
      'Giảm hứng thú hoặc sở thích với hầu hết mọi thứ?',
      'Mất ngủ hoặc ngủ quá nhiều không?',
      'Mệt mỏi hoặc mất năng lượng không?',
      'Tự ti, cho rằng mình là người thất bại, là gánh nặng cho gia đình?',
      'Chán ăn và sút cân không?',
      'Hoạt động nói năng chậm hơn bình thường?',
      'Cảm thấy chán nản, bi quan hoặc tuyệt vọng? ',
      'Chú ý và trí nhớ kém,khó tập trung vào mọi việc?',
      'Hay nghĩ đến cái chết hoặc muốn tự sát?',
      'Nghe có tiếng người nói bên tai khen chê, xui khiến hay ra lệnh không?',
      'Cho rằng có người điều khiển, chi phối, theo dõi, làm hại mình?',
      'Giảm nhu cầu ngủ không?',
      'Thấy người rất khỏe mạnh không?',
      'Vui vẻ quá mức không?',
      'Nói quá nhiều không?',
      'Hoạt động quá nhiều không?',
      'Suy nghĩ rất nhanh không?',
      'Cho rằng mình có nhiều tài năng hơn người?',
      'Tiêu quá nhiều tiền không?',
      'Cảm thấy hồi hộp lo lắng hoặc căng thẳng?',
      'Không thể dừng lại hoặc kiểm soát được lo lắng?',
      'Lo lắng quá nhiều về những điều khác nhau?',
      'Rất khó thư giãn?',
      'Bồn chồn đến mức đứng ngồi không yên?',
      'Dễ cáu gắt hoặc trở nên khó chịu?',
      'Cảm thấy sợ hãi như thể điều gì đó khủng khiếp sắp xảy ra?',
      'Hay đánh trống ngực, run tay không?',
    ];

    let testPools = listQuestion.map((item) => ({
      question: item,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    return queryInterface.bulkInsert('TestPools', testPools, {});
  }
};
  