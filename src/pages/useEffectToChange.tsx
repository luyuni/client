// npm install axios
// https://www.axios-http.cn/docs/api_intro
import axios from "axios"
import { Student } from "../model/Student"
import { useEffect, useState } from "react"
import { R } from "../model/R"


// react 中想要函数再次被调用需要两个条件中的一个
// 1、需要props发生改变
// 2、需要state发生改变  函数之外的一组数据
export default function UseAxiosStateChange({id, age} : {id: number, age: number})  {

    /**
     * 参数，数据的初始值
     * 返回值，数组[a, b]
     * a：状态数据
     * b：方法，修改状态数据的
     */
    // state 改变的时候会调用函数，后端返回的时候调用setStudent改变状态数据
    // 这个demo会无限循环触发 updateStudent
    let [student, setStudent] = useState<Student>({name: 'xx', age: 12})

    /**
     * 参数1：箭头函数，在真正渲染html页面前会执行
     * 参数2：
     *  情况1：没有这个参数，表示每次执行函数的时候都会被执行
     *  情况2：[]，代表这个函数只会执行一次
     *  情况3：[依赖项]，代表依赖项变化的时候函数会执行
     */
    useEffect(()=>{
        async function updateStudent() {
            // 参数1 url
            // 参数2 config
            const resp =  await axios.get<R<Student>>(`http://127.0.0.1:8080/api/students/${id}`)
            setStudent(resp.data.data)
            console.log(resp.data.data)
            // 调用方法
            updateStudent()
        }
    }, [id])
    
    return <h3>{student.name}</h3>
}