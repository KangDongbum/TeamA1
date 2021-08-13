/* 사이트 초기화 미들웨어 */
const member = require("../models/member");
const fs = require("fs").promises;
const path = require("path");

module.exports = async (req,res,next) => {
  // 로그인이 되어있는 경우 -> 회원 데이터 전역 유지, 로그인 여부 값도 true
  if (req.session.memId) {
    const info = await member.get(req.session.memId);
    if (info) { // 회원 데이터가 있는 경우
      req.isLogin = res.isLogin = res.locals.isLogin = true;
      req.member = res.member = res.locals.member = info;
    }
  }
  
  let dday;
  try {
    const ddayPath = path.join(__dirname, "../data/date/dday.json");
    dday = await fs.readFile(ddayPath);
    dday = JSON.parse(dday.toString());
  } catch (err) {
    if (err.code == "ENOENT") {
      // dday.json파일이 없는경우
      /*
      필요하면 dday.json파일 생성 추가
      */
      dday = null;
    }
  }

  res.locals.dday = dday;

  next();
};