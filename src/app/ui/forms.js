export function Input ({ id, type, title }) {
  return <>
    <label htmlFor={id}>{title}</label>
    <input id={id} type={type} />
    </>
}