import { useState, useEffect } from "react";
import { RepositoryItem } from "./RepositoryItem";

import '../styles/repositories.scss';

//https://api.github.com/users/joaopedro489/repos

interface Repository {
	name: string;
	description: string;
	html_url: string;
}

export function RepositoryList() {
	const [repositories, setRepositories] = useState<Repository[]>([]);
	useEffect(() => {
		const url = 'https://api.github.com/users/joaopedro489/repos';
		fetch(url)
			.then(response => response.json())
			.then(data => setRepositories(data))
	}, []);
	console.log('render');
	return (
		<section className="repository-list">
			<h1>Lista de repositórios</h1>
			{
				repositories.length === 0 && <p>Carregando...</p>
			}
			<ul>
				{repositories.map(repository => {
					return <RepositoryItem key={repository.name} repository={repository} />
				})}
			</ul>
		</section>
	);
}