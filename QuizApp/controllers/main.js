import { QuestionService } from '../services/questionService.js';

import { MultipleChoice } from '../models/multipleChoice.js';
import { FillingBlank } from '../models/fillingBlank.js';

let quesService = new QuestionService();
let questionList = [];
//quesstionList chứa tập hợp câu hỏi phân loại ra


let renderQuestions = () => {
    quesService.getListQuestions()
        .then((result) => {
            //lấy dữ liệu thành công
            // console.log("result",result)
            console.log("result.data", result.data)

            //duyệt qua từng element trong mảng data từ API
            result.data.map((ques) => {
                //destructuring
                let { id, questionType, content, answers } = ques
                //phân loại câu hỏi từ API 
                switch (questionType) {
                    case 1:
                        //multi
                        //tạo object MltipleChoice
                        let multi = new MultipleChoice(id, questionType, content, answers);

                        //spread operator
                        questionList = [...questionList,multi];
                    case 2:
                        //fillBlank
                        let filling = new FillingBlank(id, questionType, content, answers);

                        questionList = [...questionList,filling]
                    default:
                        console.log("loại question chưa xác định")
                }
            })
        })

        .catch((error) => {
            //lấy data thất bại
            console.log(error)
        })
}
renderQuestions();