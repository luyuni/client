// npm install axios
// https://www.axios-http.cn/docs/api_intro
import axios from "axios"
import { Student } from "../model/Student"
import { useState } from "react"

interface R<T> {
    code: number,
    data: T, // 泛型
    message?: string // 可选属性
}
// react 中想要函数再次被调用需要两个条件中的一个
// 1、需要props发生改变
// 2、需要state发生改变  函数之外的一组数据
export default function UseAxiosNoState({id} : {id: number})  {
    
    async function updateStudent() {
        // 参数1 url
        // 参数2 config
        const resp =  await axios.get<R<Student>>(`http://127.0.0.1:8080/api/students/${id}`)
        console.log(resp.data.data)
    }

    // 调用方法
    updateStudent()

    /**
     * 参数，数据的初始值
     */
    useState({name: 'xx'})
    
    return <h3></h3>
}