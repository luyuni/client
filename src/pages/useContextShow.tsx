// npm install axios
// https://www.axios-http.cn/docs/api_intro
import axios from "axios"
import { Student } from "../model/Student"
import { createContext, useContext, useEffect, useState } from "react"
import { R } from "../model/R"

const HiddenContext = createContext(false)

// react 中想要函数再次被调用需要两个条件中的一个
// 1、需要props发生改变
// 2、需要state发生改变  函数之外的一组数据
export default function UseContextShow()  {
    const [students, setStudents] = useState<Student[]>([])
    const [hidden, setHidden] = useState(false)
    useEffect(()=>{
        async function updateStudents() {
            const resp = await axios.get<R<Student[]>>('http://localhost:8080/api/students')
            setStudents(resp.data.data)
        }
        updateStudents()
    })

    function hideOrShow() {
        setHidden((old)=>{
            return !old
        })
    }

    return <HiddenContext.Provider value={hidden}>
        <input type='button' value={hidden ? "显示" : "隐藏"} onClick={hideOrShow}></input>
        <ShowList students={students}></ShowList>
    </HiddenContext.Provider>
}

function ShowList({students} : {students: Student[]}) {
    const list = students.map(s=>{
        return <ShowOne student={s} key={s.id}></ShowOne>
    })
    return <>{list}</>
}

function ShowOne({student} : {student: Student}) {
    const hidden = useContext(HiddenContext)
    const jsx = !hidden && <span>{student.age}</span>
    return <div>{student.name} {jsx}</div>
}