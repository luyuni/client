import { useEffect, useState } from "react"
import { Student } from "../model/Student"
import axios from "axios"
import { Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { R } from "../model/R"

export default function FormDemoAntd()  {
    const [students, setStudents] = useState<Student[]>([])
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      async function getStudents() {
        const resp = await axios.get<R<Student[]>>(
          'http://localhost:8080/api/students'
        )
        setStudents(resp.data.data)
        setLoading(false)
      }
  
      getStudents()
    }, [])
  
    // title: 列标题  dataIndex: 要关联的属性名
    const columns: ColumnsType<Student> = [
      {
        title: '编号',
        dataIndex: 'id',
      },
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '性别',
        dataIndex: 'sex',
      },
      {
        title: '年龄',
        dataIndex: 'age',
      },
    ]
  
    // columns: 列定义
    // dataSource: 数据源，一般是数组包对象
    // rowKey: 作为唯一标识的属性名
    // loading: 显示加载图片
    return (
      <Table
        columns={columns}
        dataSource={students}
        rowKey='id'
        loading={loading}></Table>
    )
}