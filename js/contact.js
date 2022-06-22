// Activité : gestion des contacts


// Création d'une classe Contact 

class Contact{
	constructor(lastName,firstName){
		this.nom = lastName;
		this.prenom = firstName;		
	}
	
	//Affichage des paramètres du contact dans la section
	afficheContact(){
		let personne ='<p class="persona">'+`${this.prenom} ${this.nom}`+'</p>'; // utilisation de littéraux de gabarits.
		return personne;
	}

	//Ajout d'un contact au tableau
	ajouteContact(tableau){
		tableau.push(this);
	}
}






