import request from "./ajax";
import qs from "./qs";
let base = "/base/web/user/";
// 手机验证码登录
export function captchaLogin(data) {
    let url=base+"captchaLogin";
    return request.post(url,data)
}
// 获取验证码 //1:注册 2.登录（修改密码校验） 3.更换手机号
export function queryCaptcha(data) {
    let url= base + "queryCaptcha";
    return request.post(url,data)
}
// 验证短信验证码
export function checkCaptcha(data) {
  let url=base + "checkCaptcha"  
  return request.post(url,data);
}
// 密码登录
export function passwordLogin(data) {
  let url=base + 'passwordLogin';
    return request.post(url,data)
}
//  忘记密码操作
export function forgetPassword(data){
    let url=base + 'forgetPassword';
    return request.post(url,data)
}
//更换手机
export function optChangePhone(data){
  let url="/api/web/teacher/optChangePhone"
  return request.post(url,data);
}
// 获取轮播图
export function queryBannerListByType(data){
  let url="/base/web/agreement/queryBannerListByType"
  return request.post(url,data);
}

// 获取今日课程
export function queryTodayCourse(data){
  let url="/api/web/index/queryTodayCourse"
  return request.post(url,data);
}

//  查询老师课时数排行
export function queryClassHourRand(data){
  let url="/api/web/index/queryClassHourRand"
  return request.post(url,data);
}
// 获取老师推广人数排行
export function queryExtensionRand(){
  let url="/api/web/index/queryExtensionRand"
  return request.post(url);
}
//获取问答广场列表
export function queryQuestionSquareList(data){
  let url="/api/web/answer/queryQuestionSquareList";
  return request.post(url,data);
}

//获取问题回答列表
export function queryQuestionAnswerList(data){
  let url="/api/web/answer/queryQuestionAnswerList"
  return request.post(url,data);
}
//回答问题操作
export function optAddAnswer(data){
  let url="/api/web/answer/optAddAnswer";
  return request.post(url,data);
}
//删除问题回答操作
export function optDeleteAnswer(data){
  let url="/api/web/answer/optDeleteAnswer";
  return request.post(url,data);
}
// 采纳问题操作
export function optAdoptAnswer(data){
  let url="/api/web/answer/optAdoptAnswer";
  return request.post(url,data);
}
//http://139.9.154.145/teacher/api/app/answer/optAdoptAnswer
// http://139.9.154.145/teacher-server/api/web/answer/optAdoptAnswer?answerId=29&questionId=26
//获取我的问答操作
export function queryMeAnswerList(data){
  let url="/api/web/answer/queryMeAnswerList";
  return request.post(url,data);
}
//获取我的提问操作
export function queryMeQuestionList(data){
  let url="/api/web/answer/queryMeQuestionList";
  return request.post(url,data);
}
//获取我的班级列表
export function queryMyAllClassList(data){
  let url="/api/officeCenter/queryMyAllClassList";
  return request.post(url,data);
}
// 获取我的学生列表
export function queryAllMyStudent(data){
  let url="/api/officeCenter/queryAllMyStudent";
  return request.post(url,data)
}
// 按时间查询课程表
export function queryDaySchedule(data){
  let url="/api/officeCenter/queryDaySchedule";
  return request.post(url,data);
}
// 获取班级每月中排课数量
export function queryTeacherSchedule(data){
  let url="/api/officeCenter/queryTeacherSchedule";
  return request.post(url,data);
}

//获取学生成长记录列表
export function queryEvaluationList(data){
  let url = "/api/officeCenter/queryEvaluationList";
  return request.post(url,data);
}

 //根据学生考试关系id获取考试详情
 export function queryExaminationInfo(data){
   let url = "/api/officeCenter/queryExaminationInfo";
   return request.post(url,data);
 }


// 获取消息列表
export function queryMessageList(data){
  let url = "/api/web/message/queryMessageList";
  return request.post(url,data);
}

//获取课程科目
export function queryAllSubjects(){
  let url = "/api/officeCenter/queryAllSubjects";
  return request.post(url);
}
// 获取所有课程
export function querySubjectList(){
  let url = "/base/web/agreement/querySubjectList";
  return request.post(url);
}
// 申请成为老师
export function optTeacherApply(data) {
    let url = "/base/web/user/optTeacherApply";
    return request.post(url,data);
}

//机构合作
export function optMechanismApply(data){
  let url = "/base/web/user/optMechanismApply";
  return request.post(url,data);
}

//获取省市JSON
export function getCityJson(){
  let url = "/base/web/agreement/getCityJson";
  return request.post(url);
}

//获取个人信息
export function queryPersonalData(){
    let url = "/api/web/teacher/queryPersonalData";
    return request.post(url);
}

//修改我的个人信息
export function optPersonalData(data){
  let url = "/api/web/teacher/optPersonalData"
  return request.post(url,data);
}

//提交问题反馈
export function optFeedback(data){
  let url = "/api/web/teacher/optFeedback";
  return request.post(url,data);
}

// 获取平台客服/推广中心/引导页等
export function querySystemSetByType(data){
  let url = "/base/web/agreement/querySystemSetByType";
  return request.post(url,data)
}

// 获取消息未读列表
export function queryNoReadNumber(data){
  let url = "/api/web/message/queryNoReadNumber";
  return request.post(url,data)
}
// 置为已读操作
export function optSetRead(data){
  let url = "/api/web/message/optSetRead";
  return request.post(url,data)
}
// 验证密码是否正确
export function passwordAuthentication(data){
  return request.post('/api/web/teacher/passwordAuthentication',data)
}

// 绑定验证码
export function updataPhone(data){
  return request.post('/api/web/teacher/updatePhone',data)
}
