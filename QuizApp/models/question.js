// Class cha chứa các thuộc tính, phương thức mà mọi loại câu hỏi đều có
export class Questions {
    constructor(id, questionType, content, answers) {
        // https://6065c023b8fbbd001756738a.mockapi.io/question điền biến dựa vào db
        this.id = id;
        this.questionType = questionType;
        this.content = content;
        this.answers = answers;

    }


    renderHTML() {
        console.log("hiển thị HTML của câu hỏi");

    }


    checkExact() {
        console.log("kiểm tra đáp án")
    }
}