import { useEffect, useState } from "react"
import { Student } from "../model/Student"
import axios from "axios"
import { Table } from "antd"
import { ColumnsType, TablePaginationConfig } from "antd/es/table"
import { R } from "../model/R"
import { PageResp } from "../model/PageResp"

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

    function onChange(newPagination: TablePaginationConfig) {
        setPagination(newPagination)
    }
  
    useEffect(() => {
      async function getStudents() {
        const resp = await axios.get<R<PageResp<Student>>>(
          'http://localhost:8080/api/students/q', {
            params: {
                page: pagination.current,
                size: pagination.pageSize
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
    }, [pagination.current, pagination.pageSize])
  
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
        loading={loading}
        pagination={pagination}
        onChange={onChange}>

        </Table>
    )
}