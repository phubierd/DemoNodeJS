import {Questions} from './question.js'

export class MultipleChoice extends Questions{
    constructor(...params){
        super(...params);
        //chưa biết class con sau này có thêm phần tử nữa ko nên ghi vậy (...param của super tượng trưng cho backup của thằng cha)
    }

    renderHTML(){
        console.log("hiển thị UI MultipleCHoice")
    }

    checkExact(){
        console.log("kiểm tra đáp án MultipleChoice")
    }
}