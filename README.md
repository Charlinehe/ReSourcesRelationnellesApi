# ReSourcesRelationnellesApi

Ce projet contient les web services destinés à être appelés par l'application mobile ReSources Relationnelles.

## Récuperer le projet
Exécuter la commande suivante :  
>git clone https://github.com/Charlinehe/ReSourcesRelationnellesApi

## Installer les dépendances
Exécuter les commandes suivantes :  
>npm install express  
>npm install mysql
>npm install jsonwebtoken --save
>npm install body-parser --save

## Lancer le projet
Exécuter la commande suivante :  
>node index.js

## Les webservices
Les webservices communiquent grâce au format de langage JSON

### Log in

URL
> {server_name}/api/user/login
Méthode : GET
Header : /
Body :
> {
>   "username": "__username__",
>   "password": "__password__"
> }
Exemple de retour :
> {
>   "userId": 57,
>   "username": "bberger",
>   "email": "joseph.philippe@bouygtel.fr",
>   "department": "Haut Rhin",
>   "departmentNumber": "68",
>   "roleId": 1,
>   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.  eyJ1c2VySWQiOjU3LCJpYXQiOjE2MTI4MjMxNjcsImV4cCI6MTYxMjgyNjc2N30.s_X-EaCEEofjaAnuxkgT-Yei6heEE2YdVzSgYGl6O0k"
>}

### Détail d'une ressource

URL 
> {server_name}/api//resource/{resource_id}
Méthode : GET
Body : aucun
Header : Authorisation (optionnelle) : renseigner le token pour les ressources privées
Exemple de retour :
> [
>   {
>       "id": 3,
>       "title": "unde tempora pariatur vel qui omnis sapiente rerum",
>       "description": "voluptatibus et maxime corrupti et autem minima in culpa porro non molestiae similique sed at voluptas voluptatem tenetur facere quaerat",
>       "link": "https://www.martin.fr/fugiat-vel-harum-architecto-eius-beatae-fuga-similique",
>       "date_creation": "2020-07-10T03:57:37.000Z",
>       "image_name": null,
>       "content_name": null,
>       "age_category": "Enfant (0 à 18 ans)",
>       "username": "yphilippe",
>       "relationship_type": "Famille - parents",
>       "resource_type": "Exercice / Atelier",
>       "category": "Vie affective",
>       "public": 1
>   }
> ]