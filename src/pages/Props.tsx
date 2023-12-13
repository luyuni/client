// ? 表示可选属性
export default function Props(props: {msg : string, age?: number})  {
    return <h3>{props.msg} 我的年龄是 {props.age}</h3>
}