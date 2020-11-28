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
    let url=base + 'passwordLogin';
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