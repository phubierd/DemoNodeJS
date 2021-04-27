import {Questions} from './question.js';
export class FillingBlank extends Questions {
    constructor(...params){
        super(...params)

    };
    
    renderHTML(){
        console.log("hiển thị UI HTML FillingBlank")
    };

    checkExact(){
        console.log("kiểm tra đáp án UI FillingBlank")
    }
}