import Link from "next/link";
import * as  Icon from "phosphor-react";
import CardGroup from "../CardGroup";
//import { Link } from "react-router-dom";
import CardCategory from "../CardGroup";

const CardGroups = () => {
	return (
		<>
			<div className="bg-white-ice w-auto h-auto py-4 px-4 rounded-lg shadow-card box-border">
				<h4 className="text-4xl mb-8 font-bold">Grupos</h4>
				<div className="grid grid-cols-2">
						<CardGroup
							link="/servicebook"
							Name={ "Biblioteca" }
							Icon={ <Icon.BookOpen size={ 27 } /> } idGroup={ "" }	/>
					<div className="hover:cursor-pointer hover:text-blue-ufal-hover">
						<Link href="/servicebook/myservices">Meus Serviços</Link>
					</div>
					<div className="gap-3 grid grid-cols-2">
						{/*<Link to="/">Dashboard</Link>*/}
						{/*<Link to="/service/letter">Carta de Serviço</Link>*/}
						{/*<Link to="/service/create">Criar Serviço</Link>*/}
						{/*<Link to="/users/list">Tabela</Link>
						<Link to="/login">Login</Link>
						<Link to="/signup">Cadastro</Link>

						<Link to="/service/list">Lista de Serviços</Link>
						<Link to="/user/info">Informações do usuário</Link>
						<Link to="/user/create">Adicionar Usuário</Link>
						<Link to="/test/card"> Card Teste</Link>
						<Link to="/test">Teste </Link>
						<Link to="/servicebook/category">Categorias</Link>
						<Link to="/servicebook/subcategory">Subcategorias</Link>
						<Link to="/servicebook/category/create">Add Category </Link>
						<Link to="/servicebook/subcategory/create"> Add Subcategory</Link>
						<Link to="/servicebook/service"> Serviços por category</Link>*/}


					</div>
				</div>
			</div>
		</>
	);
};

export default CardGroups;