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
            <a href="#quizResult" class="quiz__btn quiz__next" onclick='showScore()'>Submit</a>
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
    //AXIOS
/*     quesService.getListQuestions()
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

        }) alt+shift+a */ 


        //fetch API (có sẵn của es6 nên k cần cài , học thêm cho biet chứ xài axios)
        //fetch cũng như axios đều sử dụng promise
        fetch('https://6065c023b8fbbd001756738a.mockapi.io/question')
        .then((response)=>{
            return response.json();

        }).then((data) =>{
            //then thứ 2 này mới lấy data (mảng dữ liệu mà ta lấy dc)
            console.log(data);

             //duyệt qua từng element trong mảng data từ API
             data.map((ques) => {
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
        .catch((error)=>{
            console.log(error)
        })
}
renderQuestions();


//[buổi1]
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

//gọi dòng 33 (button submit)
let showScore = () => {
    let soCauDung = 0;
    let soCauSai = 0;
    let diem = 0;
    console.log(questionList);
    questionList.map((ques) => {
        // ques.checkExact() == true;
        if (ques.checkExact()) {
            //nếu đúng thì tăng số lượng lên 1
            soCauDung = soCauDung + 1;
        } else {
            soCauSai = soCauSai + 1;
        }
    });

    diem = soCauDung * 100 / questionList.length;

    console.log("Câu đúng: " + soCauDung)
    console.log("Câu sai: " + soCauSai)


    document.getElementById("score").innerHTML = diem + "%"
    document.getElementById("correct").innerHTML = soCauDung;
    document.getElementById("incorrect").innerHTML = soCauSai;
}
window.showScore = showScore;




//demo POST của fetch
//gọi bên html đầu trang
let addQuestion = () =>{
    let questionData = {
    //   id: 9,
      questionType:2,
      content:"testing post fetch",
      answers:[]   
    };

    fetch('https://6065c023b8fbbd001756738a.mockapi.io/question',{
        method: "POST",
        headers:{
            
         'Content-Type': 'application/json',
              
        },   // header phải phụ thuộc bên backend
        body: JSON.stringify(questionData)
    })

    .then(response => response.json())
    .then((data)=>{
        console.log("thêm thành công");
        console.log(data);
    })
    .catch((error)=>{
        console.log(error)
    })
}
window.addQuestion=addQuestion



// //demo delete của fetch
// //gọi ở html đầu trang
// let deleteQuestion =() =>{
//     fetch('https://6065c023b8fbbd001756738a.mockapi.io/question/9',{
//         method: 'Delete',

//     })
//     .then(response => response.json())
//     .then((data)=>{
//         console.log(data);
//     })
//     .catch((error)=>{
//         console.log(error)
//     })
// }
// window.deleteQuestion=deleteQuestion;


//demo PUT của fetch
//gọi bên html đầu trang
let updateQuestion = () =>{
    let questionData = {
    //   id: 9,
      questionType:2,
      content:"update post fetch  1231231232312",
      answers:[]   
    };

    fetch('https://6065c023b8fbbd001756738a.mockapi.io/question/10',{
        method: "put",
        headers:{
            
         'Content-Type': 'application/json',
              
        },   // header phải phụ thuộc bên backend
        body: JSON.stringify(questionData)
    })

    .then(response => response.json())
    .then((data)=>{
        console.log("update thành công");
        console.log(data);
    })
    .catch((error)=>{
        console.log(error)
    })
}
window.updateQuestion=updateQuestion





//demo delete của async/await (của es6)
//gọi ở html đầu trang
//await xử lý bất đồng bộ, trình duyệt sẽ chờ ở dòng thực thi có khai báo await
//await chỉ khai báo bên trong hàm async
// => thay thế cơ chế của promise(then,catch)
let deleteQuestion = async () =>{
    // fetch('https://6065c023b8fbbd001756738a.mockapi.io/question/9',{
    //     method: 'Delete',

    // })
    // .then(response => response.json())
    // .then((data)=>{
    //     console.log(data);
    // })
    // .catch((error)=>{
    //     console.log(error)
    // })

    try{
        //xử lý thành công
        let response = await fetch('https://6065c023b8fbbd001756738a.mockapi.io/question/11',{
            method:'delete'
        });
        let data = await response.json();
        console.log(data)

    }
    catch{
        // xử lý khi thất bại
        console.log(error)
    }
}
window.deleteQuestion=deleteQuestion;