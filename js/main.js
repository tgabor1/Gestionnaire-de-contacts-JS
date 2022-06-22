/* Gestionnaire de Contact */

//Variables, contacts et tableau les contenant
// Les options du programme
let choix = document.getElementById('selection')
let btnChoix = document.getElementById('valider')
// L'ajout des contacts
let formulaire = document.getElementById('ajoutContact')
let formPrenom = document.getElementById('firstName')
let formNom = document.getElementById('lastName')
let formBtn = document.getElementById('tdButton')
// La suppression d'un contact
let listeSuppression = document.getElementById('suppressionContact')
let supprBtn = document.getElementById('supprimer')
// l'affichage d'un contact
let affichageDesContacts = document.querySelector('#contacts')

//Instanciation des objets Contact
const contact1 = new Contact('Lévisse', 'Carole')
const contact2 = new Contact('Nelsonne', 'Mélodie')
const contact3 = new Contact('Vallot', 'Christophe')
// tableau d'objets Contact
const contacts = [contact1, contact2]
contacts.push(contact3)

// Ajout d'un écouteur sur le bouton de choix
btnChoix.addEventListener('click', executerChoix)

function executerChoix () {
  let valeur = choix.value // Je récupère la valeur de l'option active sur le select

  switch (valeur) {
    case '0':
      if (window.confirm('Êtes-vous sûr de vouloir quitter ?')) {
        window.close()
      }
      break
    case '1':
      masquer(formulaire)
      masquer(listeSuppression)
      masquer(supprBtn)
      afficher(affichageDesContacts)
      afficherContact()
      break
    case '2':
      afficher(formulaire)
      masquer(affichageDesContacts)
      masquer(listeSuppression)
      masquer(supprBtn)
      formBtn.addEventListener('click', ajouterContact)
      break
    case '3':
      afficher(listeSuppression)
      afficher(supprBtn)
      masquer(affichageDesContacts)
      masquer(formulaire)
      // Boucle permettant d'écrire les contacts sous forme d'options dans le select
      listerContact()
      supprBtn.addEventListener('click', supprimerContact)
      // passage d'un booléen en paramètre pour rendre "vrai" l'option
      renommerSupprBtn(true)
      break
    case '4':
      afficher(listeSuppression)
      afficher(supprBtn)
      masquer(affichageDesContacts)
      masquer(formulaire)
      // Boucle permettant d'écrire les contacts sous forme d'options dans le select
      listerContact()
      supprBtn.addEventListener('click', modifierContact)
      //On renomme le bouton
      renommerSupprBtn()
      break
  }
}
// Masque un élément en modifiant son style
function masquer (element) {
  element.style.display = 'none'
}

// Affiche un élément en modifiant son style
function afficher (element) {
  element.style.display = 'block'
}

function ajouterContact () {
  let nom = formNom.value
  let prenom = formPrenom.value
  if (nom === '' || prenom === '') {
    // vérification du contenu des champs
    alert("Au moins un des champs n'a pas été renseigné")
  } else {
    const nouveauContact = new Contact(nom, prenom)
    nouveauContact.ajouteContact(contacts)
    alert('le contact ' + prenom + ' ' + nom + ' a été ajouté')
  }
}

function afficherContact () {
  affichageDesContacts.innerHTML =
    '<h2>Voici la liste de tous les contacts :</h2>'
  // boucle d'affichage des contacts
  contacts.forEach(function (contact) {
    // Appel de la méthode d'affichage du contact pour chaque objet Contact
    affichageDesContacts.innerHTML += contact.afficheContact()
  })
}

/* deux boucles différentes : for ou forEach */
function listerContact () {
  listeSuppression.innerHTML = '' // efface la liste des contacts
  // for (let i = 0; i < contacts.length; i++) {
  //   // Appel de la méthode d'affichage du contact pour chaque objet Contact
  //   listeSuppression.innerHTML +=
  //     '<option value=' + i + '>' + contacts[i].afficheContact() + '</option>'
  // }
  //}
  let indice = 0
  contacts.forEach(function (contact) {
    listeSuppression.innerHTML +=
    '<option value=' + indice + '>' + contact.afficheContact() + '</option>'
    indice++
  })
}

function supprimerContact () {
  let indexContact = listeSuppression.value
  // Supprime la ligne du tableau en passant en paramètres son index et le nombre de lignes à supprimer
  contacts.splice(indexContact, 1)
  alert('Le contact a été supprimé')
  masquer(listeSuppression)
  masquer(supprBtn)
}

function modifierContact () {
  masquer(listeSuppression)
  masquer(supprBtn)
  afficher(formulaire)
  let indexContact = listeSuppression.value
  console.log(indexContact)
  formNom.value = contacts[indexContact].nom
  formPrenom.value = contacts[indexContact].prenom
  formBtn.addEventListener('click', validerModifierContact)
}
// Utilisation d'une ternaire pour renommer le bouton de suppression au besoin
function renommerSupprBtn(option) {
  option ? supprBtn.textContent = "Supprimer un contact" : supprBtn.textContent = "Modifier le contact"
}

function validerModifierContact(){
  let nom = formNom.value
  let prenom = formPrenom.value
  let indexContact = listeSuppression.value
  if (nom === '' || prenom === '') {
    // vérification du contenu des champs
    alert("Au moins un des champs est vide")
  } else {
   contacts[indexContact].nom = nom
   contacts[indexContact].prenom = prenom
    alert('le contact ' + prenom + ' ' + nom + ' a été modifié')
    masquer(formulaire)
  }
}
