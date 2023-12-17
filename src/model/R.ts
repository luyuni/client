export interface R<T> {
    code: number,
    data: T, // 泛型
    message?: string // 可选属性
}