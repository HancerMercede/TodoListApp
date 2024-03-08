import style from './Header.module.css';


export const Header = (props: {name:string, slogan:string}) => {
  return (
    <div className={style.container}>
        <h1>{props.name}</h1>
        <p>{props.slogan}</p>
    </div>
  )
}
