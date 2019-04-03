/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('work', {
    id: {
         type: DataTypes.INTEGER(11),
        primaryKey: true
      },
    eva_tea_id : {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      eva_stu_id : {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      eva_tea_content: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      eva_work_content: {
        type: DataTypes.TEXT,
        allowNull: true
      },
  }, {
    tableName: 'work'
  });
};
