import { useState } from "react"
import { Student } from "../model/Student"
import axios from "axios"

export default function FormDemo()  {

    const[student, setStudent] = useState<Student>({name:'', sex: '男', age: 18})
    const options = ['男', '女']
    const jsx = options.map(item=><option key={item}>{item}</option>)

    function onChange(e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        console.log(e.target.name + '=' + e.target.value)
        setStudent((old)=>{
            // 后面的覆盖前面的值
            // 属性名是变量要用中括号包裹
            const ret = {...old, [e.target.name] : e.target.value}
            return ret
        })
    }

    async function onClink() {
        const resp = await axios.post('http://localhost:8080/api/students', student)
        console.log(resp.data.data)
    }

    return (
        <form>
            <div>
                <label>姓名</label>
                <input name="name" value={student.name} onChange={onChange}></input>
            </div>
            <div>
                <label>性别</label>
                <select name="sex" id="sex" value={student.sex} onChange={onChange}>
                    {jsx}
                </select>
            </div>
            <div>
                <label>年龄</label>
                <input name="age" value={student.age} onChange={onChange}></input>
            </div>
            <div>
                <input type="button" value="新增" onClick={onClink}></input>
            </div>
        </form>
    )
}