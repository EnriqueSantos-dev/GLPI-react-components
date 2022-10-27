
import { CardLogin } from '../../components/CardLogin'


function Login() {
  return (
		<>
			<div className="bg-gradiente w-screen h-screen relative bg:fixed ">
				<div className="bg-backgroundUfal w-auto opacity-30 h-[108.625rem] lg:bg-cover bg-[length:1159.36px] left-[-33rem] absolute top-[-17rem] right-0 bg-no-repeat lg:w-full lg:h-[200.625%] lg:left-[-33rem] lg:fixed lg:top-[-42.83%] lg:right-[21.39%]"></div>

				<div className="w-full h-full absolute flex ">
					<CardLogin />
				</div>
			</div>
		</>
	);
}

export default Login

