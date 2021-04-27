//chứa các phương thức lấy từ api
export class QuestionService {
    getListQuestions() {
        let promise = axios({
            method: 'get',
            url: 'https://6065c023b8fbbd001756738a.mockapi.io/question',
           
          });
          return promise;
    }
}