import { Questions } from './question.js'

export class MultipleChoice extends Questions {
    constructor(...params) {
        super(...params);
        //chưa biết class con sau này có thêm phần tử nữa ko nên ghi vậy (...param của super tượng trưng cho backup của thằng cha)
    }

    renderHTML() {
        console.log("hiển thị UI MultipleCHoice")

        let contentHTML = "";
        this.answers.map((ans) => {
            contentHTML += `
            <div class="col-6">
                <div class="custom-control custom-radio">
                
                    <input type="radio" id="multi${this.id}-mulAnswer${ans.id}" name="multi-${this.id}" class="custom-control-input" value="${ans.content}">
                    <label class="custom-control-label" for="multi${this.id}-mulAnswer${ans.id}">${ans.content}</label>
                </div>
            </div>
            
            `;
        })
        //.answer, .content lấy từ questions.json folder data
        //.map duyệt từng câu trả lời
        
        return contentHTML;
    }

    checkExact() {
        console.log("kiểm tra đáp án MultipleChoice")
        //lấy câu trả lời từ user
        let listAns = document.querySelectorAll(`input[name="multi-${[this.id]}"]`)
        let valRadio="";
       
        //kiểm tra radio nào được chọn
        for (let ans of listAns){
            //ans.checked == true
            if(ans.checked){
                //nếu radio đc chọn thì lấy giá trị của radio đó
                valRadio = ans.value;
            }
        }

        //lấy đáp án từ data
        let valExact ="";
        for (let ansData of this.answers){
            //ansData.exact == true
            if (ansData.exact){
                valExact= ansData.content;
            }
        }

        //so sánh đáp án
        if (valRadio == valExact){
            //đúng
            return true;
        }else{
            //sai
            return false;
        }
    }
}