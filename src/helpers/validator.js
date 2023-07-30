class validator {
    static validateTaskInfo(taskInfo, taskData) {
      if(taskInfo.hasOwnProperty("taskId") &&
        taskInfo.hasOwnProperty("title") &&
        taskInfo.hasOwnProperty("description") &&
        taskInfo.hasOwnProperty("isCompleted") &&this.validateUniqueTaskId(taskInfo, taskData)) {
          return {
            "status": true,
            "message": "Task has been added"
          };
        }
        if(!this.validateUniqueTaskId(taskInfo, taskData)){
          return {
            "status": false,
            "message": "Task id has to be unique"
          };
        }
        return {
          "status": false,
          "message": "Task Info is malformed please provide all the properties"
        }
    }
  
    static validateUniqueTaskId(taskInfo, taskData) {
      let valueFound = taskData.tasks.some(ele => ele.taskId === taskInfo.taskId);
      if(valueFound) return false;
      return true;
    }
  }
  
  module.exports = validator;