// Write seed here
module.exports = {
  up: (queryInterface, Sequelize) => {
    const listQuestion = [
      'Mất ngủ không?',
      'Buổi sáng ngủ dậy có mệt mỏi không?',
      'Hay buồn vô cớ không?',
      'Chán ăn và sút cân không?',
      'Hoạt động nói năng chậm hơn bình thường?',
      'Hay cáu gắt vô cớ?',
      'Bi quan quá mức?',
      'Chú ý và trí nhớ kém',
      'Hay nghĩ đến cái chết?',
      'Nghe có tiếng người nói chuyện trong đầu?',
      'Cho rằng có người theo dõi, làm hại mình?',
      'Ngủ quá ít không?',
      'Thấy người rất khỏe mạnh không?',
      'Rất vui vẻ không?',
      'Nói rất nhiều không?',
      'Hoạt động quá nhiều không?',
      'Suy nghĩ rất nhanh không?',
      'Cho rằng mình có nhiều tài năng không?',
      'Tiêu quá nhiều tiền không?',
      'Lo lắng quá mức?',
      'Rất khó thư giãn?',
      'Run tay?',
      'Khó chú ý?',
      'Dễ nổi cáu?',
      'Khó vào giấc ngủ?',
      'Hay đánh trống ngực?',
    ];

    let testPools = listQuestion.map((item) => ({
      question: item,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    return queryInterface.bulkInsert('TestPools', testPools, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TestPools', null, {});
  },
};
