const mongoose = require('mongoose');
// mongoose 객체를 불러옵니다.
// MongoDB 연결 1
// '단' 하나의 데이터베이스 연결 시 유효. 
mongoose.connect(
    "mongodb://localhost:27017/do-name",
     // MongoDB url
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    }
    // options
    // MongoDB 5 버전부터 useNewUrlParser 옵션을 사용해주지 않으면 에러가 뜹니다.
);
// '하나' 이상의 데이터베이스 연결 시 mongoose.createConnection() 메소드를 사용.
const connect1 = mongoose.createConnection("mongodb://localhost:27017:mydb1");
const connect2 = mongoose.createConnection("mongodb://localhost:27017:mydb2");
const db = mongoose.connection;
// mongoose의 connection 메소드를 변수 db에 할당
const handleOpen = () => {
    console.log(`✅ Connected to DB`);
}
const handleError = (error) => {
    console.log(`❌ Error on DB connection: ${error}`);
};
db.once("open", handleOpen);
// db 연결 성공 시 handleOpen 함수 실행.
db.on("erroe", handleError);
// db 연결 실패 시 handleError 함수 실행.