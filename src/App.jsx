import React, { useState, useEffect } from 'react';
import wordyLogo from './assets/wordy.png';

function App() {
	const [terms, setTerms] = useState([]);
	const [randomTerms, setRandomTerms] = useState([]);
	const [showTranslations, setShowTranslations] = useState(false);
	const [error, setError] = useState(null);
	const [stato, setStato] = useState('showLivello');
	/*
	showLivello
	showDomande
	showRisposte	
	*/

	// URL del file .txt su GitHub
	const fileUrl = "https://raw.githubusercontent.com/giovannigadaleta73/wordy/refs/heads/master/inglese.txt";

	// Funzione per caricare il file all'avvio
	const loadProfile = async () => {
		console.log("Caricamento del file da:", fileUrl);
		try {
			const response = await fetch(fileUrl);
			if (!response.ok) {
				throw new Error(`Errore nel caricamento del file: ${response.status}`);
			}

			const text = await response.text();
			console.log("Contenuto del file ricevuto:", text);

			// Processa il contenuto del file
			const lines = text.split('\n').map(line => {
				const [italian, french] = line.split('::').map(part => part.trim());
				return { italian, french };
			});

			setTerms(lines);
			setError(null);
		} catch (error) {
			console.error("Errore:", error);
			setError('Errore nel caricamento del file. Verifica che il file sia disponibile.');
		}
	};

	// useEffect per eseguire il caricamento del file all'avvio
	useEffect(() => {
		loadProfile();
	}, []); // Il secondo argomento [] assicura che useEffect venga eseguito una sola volta all'avvio

	// Funzione per scegliere 5 termini casuali
	const pick2Terms = () => {
		const shuffled = [...terms].sort(() => 0.5 - Math.random());
		setRandomTerms(shuffled.slice(0, 2));
		setStato("showDomande");
	};

	const pick5Terms = () => {
		const shuffled = [...terms].sort(() => 0.5 - Math.random());
		setRandomTerms(shuffled.slice(0, 5));
		setStato("showDomande");
	};

	const pick10Terms = () => {
		const shuffled = [...terms].sort(() => 0.5 - Math.random());
		setRandomTerms(shuffled.slice(0, 10));
		setStato("showDomande");
	};

	const showRisposteHandler = () => {
		setStato("showRisposte");
	};

	const resetHandler = () => {
		setRandomTerms([]);
		setStato("showLivello");
	};

	return (
		<div className={stato}>
			<img src={wordyLogo} alt="Wordy Logo" />
			<div className='section'>
				<button className='ricomincia' onClick={resetHandler} >
					RICOMINCIA
				</button>

				<button className='facile' onClick={pick2Terms} >
					facile
				</button>

				<button className='difficile' onClick={pick5Terms} >
					difficile
				</button>

				<button className='super' onClick={pick10Terms} >
					boss finale
				</button>

				<button className='mostraTraduzioni' onClick={showRisposteHandler} >
					Soluzione
				</button>


				{error && <p style={{ color: 'red' }}>{error}</p>}

				{randomTerms.length > 0 && (
					<div style={{ marginTop: '20px' }}>
						<ol>
							{randomTerms.map((term, index) => (
								<li key={index} style={{ marginBottom: '10px' }}>
									<div className='domanda'>{term.italian}</div> <div className='risposta'>{term.french}</div>
								</li>
							))}
						</ol>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;

//https://github.com/giovannigadaleta73/lingue.git