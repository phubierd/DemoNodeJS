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
    }
}