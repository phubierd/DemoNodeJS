import { QuestionService } from '../services/questionService.js';

import { MultipleChoice } from '../models/multipleChoice.js';
import { FillingBlank } from '../models/fillingBlank.js';

let quesService = new QuestionService();
let questionList = [];
//quesstionList chứa tập hợp câu hỏi phân loại ra


//gọi ở dòng .then
let createHTML = () => {
    let contentHTML = "";
    //chứa danh sách HTML của câu hỏi
    let stt = 1;
    let btnQuiz = "";


    questionList.map((ques, index) => {
        //destructuring
        let { id, questionType, content, answers } = ques

        //tạo button next hoặc submit (nếu là câu hỏi cuối cùng => submit)
        if (index < questionList.length - 1) {
            //index dể hiện button NEXT  từ 0 -> 6
            //questionList.length = 8 mà inddexx chạy từ 0-> 7
            btnQuiz = `
            <a href="#quiz-${questionList[index + 1].id}" class="quiz__btn quiz__next">NEXT</a>
            `;
        } else {
            //cau hỏi cuối (nút submit)
            btnQuiz = `
            <a href="#quizResult" class="quiz__btn quiz__next">Submit</a>
            `;

        }

        contentHTML += `
        <div class="quizSection" id="quiz-${id}">
                <div class="quiz__main">
                    <div class="quiz__header">
                        <p>${content}</p>
                    </div>
                    <div class="quiz__body row">
                        ${ques.renderHTML()}
                    
                    </div>
                    <div class="quiz__footer">
                        <p class="quiz__current">Question ${stt} of ${questionList.length}</p>
                        ${btnQuiz}
                    </div>
                </div>
            </div>
        `;

        stt++;
    })

    document.querySelector("#quizList").innerHTML = contentHTML;
}

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
                        questionList = [...questionList, multi];
                        break;
                    case 2:
                        //fillBlank
                        //tạo object FillingBlank
                        let filling = new FillingBlank(id, questionType, content, answers);

                        questionList = [...questionList, filling];
                        break;
                    default:
                        console.log("loại question chưa xác định")
                }
            })
            console.log("phân loại các câu hỏi", questionList);

            createHTML();
        })

        .catch((error) => {
            //lấy data thất bại
            console.log(error)
        })
}
renderQuestions();

// //gọi ở dòng .then
// let createHTML = () => {
//     let contentHTML = "";
//     //chứa danh sách HTML của câu hỏi
//     let stt = 1;
//     let btnQuiz = "";


//     questionList.map((ques, index) => {
//         //destructuring
//         let { id, questionType, content, answers, renderHTML } = ques

//         //tạo button next hoặc submit (nếu là câu hỏi cuối cùng => submit)
//         if (index < questionList.length - 1) {
//             //index dể hiện button NEXT  từ 0 -> 6
//             //questionList.length = 8 mà inddexx chạy từ 0-> 7
//             btnQuiz = `
//             <a href="#quiz-${questionList[index +1].id}" class="quiz__btn quiz__next">NEXT</a>
//             `;
//         } else {
//             //cau hỏi cuối (nút submit)
//             btnQuiz = `
//             <a href="#quizResult" class="quiz__btn quiz__next">Submit</a>
//             `;

//         }

//         contentHTML += `
//         <div class="quizSection" id="quiz-${id}">
//                 <div class="quiz__main">
//                     <div class="quiz__header">
//                         <p>${content}</p>
//                     </div>
//                     <div class="quiz__body row">
//                         ${ques.renderHTML()}

//                     </div>
//                     <div class="quiz__footer">
//                         <p class="quiz__current">Question ${stt} of ${questionList.length}</p>
//                         ${btnQuiz}
//                     </div>
//                 </div>
//             </div>
//         `;

//         stt++;
//     })

//     document.querySelector("quizList").innerHTML=contentHTML;
// }