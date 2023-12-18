import { useEffect, useState } from "react"
import { Student } from "../model/Student"
import axios from "axios"
import { Form, Input, Select, Table } from "antd"
import { ColumnsType, TablePaginationConfig } from "antd/es/table"
import { R } from "../model/R"
import { PageResp } from "../model/PageResp"
import { StudentQueryForm } from "../model/StudentQueryForm"

export default function FormDemoAntd()  {
    const [students, setStudents] = useState<Student[]>([])
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState<TablePaginationConfig>(
        {
            current: 1,
            pageSize: 3,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 15, 20]
        }
    )
    const [studentQueryForm, setStudentQueryFrom] = useState<StudentQueryForm>({})

    // 分页条件改变时的处理函数
    function onChange(newPagination: TablePaginationConfig) {
        setPagination(newPagination)
    }

    // name 条件改变时处理函数
  function onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setStudentQueryFrom((old)=>{
      return {...old, name: e.target.value}
    })
  }

  // sex 条件改变时处理函数
  function onSexChange(value: string) {
    setStudentQueryFrom((old)=>{
      return {...old, sex: value}
    })
  }

  // age 条件改变时处理函数
  function onAgeChange(value: string) {
    setStudentQueryFrom((old)=>{
      return {...old, age: value}
    })
  }
  
    useEffect(() => {
      async function getStudents() {
        const resp = await axios.get<R<PageResp<Student>>>(
          'http://localhost:8080/api/students/q', {
            params: {
                page: pagination.current,
                size: pagination.pageSize,
                ...studentQueryForm // 补充查询参数
            }
          }
        )
        setStudents(resp.data.data.list)
        setPagination((old)=>{
            return {...old, total: resp.data.data.total}
        })
        setLoading(false)
      }
  
      getStudents()
    }, [pagination.current, pagination.pageSize, studentQueryForm.name, studentQueryForm.sex, studentQueryForm.age])
  
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
      <div>
        <div>
            <Input style={{width: 120}} placeholder="请输入姓名" value={studentQueryForm.name} onChange={onNameChange}></Input>
            <Select style={{width: 120}} placeholder="请选择性别" allowClear={true} value={studentQueryForm.sex} onChange={onSexChange}>
                <Select.Option value="男">男</Select.Option>
                <Select.Option value="女">女</Select.Option>
            </Select>
            <Select style={{width: 120}} placeholder="请选择年龄" allowClear={true} value={studentQueryForm.age} onChange={onAgeChange}>
                <Select.Option value="0,19">20以下</Select.Option>
                <Select.Option value="20,29">20左右</Select.Option>
                <Select.Option value="30,39">30左右</Select.Option>
                <Select.Option value="40,9999">40以上</Select.Option>
            </Select>
        </div>
        <Table
            columns={columns}
            dataSource={students}
            rowKey='id'
            loading={loading}
            pagination={pagination}
            onChange={onChange}>

        </Table>
      </div>
    )
}