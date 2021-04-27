import { Questions } from './question.js';
export class FillingBlank extends Questions {
    constructor(...params) {
        super(...params)

    };

    renderHTML() {
        console.log("hiển thị UI HTML FillingBlank")
        // let contentHTML="";
        let contentHTML = `
        <div class="col-12">
            <textarea class="form-control" id="fill${this.id}-fillAnswer${this.answers[0].id}" rows="3"></textarea>
        </div>
        
        `;
        //this.id, this.answers dựa trên file questions.json (folder data)

        return contentHTML;
    };

    checkExact() {
        console.log("kiểm tra đáp án UI FillingBlank")
    }
}