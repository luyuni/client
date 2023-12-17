// npm install axios
// https://www.axios-http.cn/docs/api_intro
import axios from "axios"
import { Student } from "../model/Student"
import { R } from "../model/R"

export default function UseAxios({id} : {id: number})  {
    
    async function updateStudent() {
        // 参数1 url
        // 参数2 config
        const resp =  await axios.get<R<Student>>(`http://127.0.0.1:8080/api/students/${id}`)
        console.log(resp.data.data)
    }

    // 调用方法
    updateStudent()
    
    return <h3></h3>
}