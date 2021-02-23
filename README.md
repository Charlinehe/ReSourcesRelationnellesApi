# ReSourcesRelationnellesApi

Ce projet contient les web services destinés à être appelés par l'application mobile ReSources Relationnelles.

## Récuperer le projet
Exécuter la commande suivante : 
```
git clone https://github.com/Charlinehe/ReSourcesRelationnellesApi
```

## Installer les dépendances
Exécuter la commande suivante : 
``` 
npm install
```

## Lancer le projet
Exécuter la commande suivante : 
```
node index.js
```

## Les webservices
Les webservices communiquent grâce au format de langage JSON

### Log in
URL
```
{server_name}/api/user/login
```
Méthode : GET  
Header : /  
Body :  
```json
 {
   "username": "__username__",
   "password": "__password__"
 }
```
Exemple de retour :
```json
 {
   "userId": 57,
   "username": "bberger",
   "email": "joseph.philippe@bouygtel.fr",
   "department": "Haut Rhin",
   "departmentNumber": "68",
   "roleId": 1,
   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.  eyJ1c2VySWQiOjU3LCJpYXQiOjE2MTI4MjMxNjcsImV4cCI6MTYxMjgyNjc2N30.s_X-EaCEEofjaAnuxkgT-Yei6heEE2YdVzSgYGl6O0k"
}
```

### Inscription
URL
```
{server_name}/api/user/inscription
```
Méthode : POST  
Body :
```json
{
    "username": "__username__",
    "firstname": "__firstname__",
    "lastname": "__lastname__",
    "email": "__email__",
    "password": "__password__",
    "departmentId": 1,
    "ageCategoryId": 1,
    "roleId": 1
}
```
Header : \  
Exemple de retour :
```json
{
    "userId": 214
}
```

### Détail d'une ressource
URL 
```
{server_name}/api/resource/{resource_id}
```
Méthode : GET  
Body : aucun  
Header : 
* Authorisation (optionnelle) : renseigner le token pour les ressources privées  

Exemple de retour :
```json
[
    {
        "id": 3,
        "title": "unde tempora pariatur vel qui omnis sapiente rerum",
        "description": "voluptatibus et maxime corrupti et autem minima in culpa porro non molestiae similique sed at voluptas voluptatem tenetur facere quaerat",
        "link": "https://www.martin.fr/fugiat-vel-harum-architecto-eius-beatae-fuga-similique",
        "date_creation": "2020-07-10T03:57:37.000Z",
        "image_name": null,
        "content_name": null,
        "age_category": "Enfant (0 à 18 ans)",
        "username": "yphilippe",
        "relationship_type": "Famille - parents",
        "resource_type": "Exercice / Atelier",
        "category": "Vie affective",
        "public": 1
    }
]
```

### Liste de ressources
Les ressources retournées sont ordonnées de la plus récente à la plus ancienne  
URL
```
{server_name}/api/resource/public
```
Méthode : GET  
Body : aucun  
Header :
* limit : nombre maximal de ressources à retour (par défaut à 100)
* page : numéro de page à retourner (par défaut à 1)
* search (optionnelle) : renseigner les critères de recherches

Exemple : Pour limit = 10 et page = 3, on obtiendra les ressources 20 à 30

Exemple de retour :
```json
[
    {
        "id": 434,
        "title": "autem nesciunt maxime sint ducimus et ratione praesentium",
        "description": "nobis commodi qui porro ipsa perferendis voluptates sit ipsa quaerat cumque totam necessitatibus quia impedit eaque illum dolor dolorem et",
        "link": "http://lesage.fr/ut-tempore-voluptas-ducimus-consectetur",
        "date_creation": "2021-01-20T03:47:40.000Z",
        "image_name": null,
        "content_name": null,
        "age_category": "Jeune adulte (19 à 35 ans)",
        "username": "paul73",
        "relationship_type": "Famille - fratrie",
        "resource_type": "Vidéo",
        "category": "Monde professionnel"
    },
    {
        "id": 275,
        "title": "sequi tenetur minima quia molestias numquam fugiat laudantium",
        "description": "ea quidem doloribus ipsam enim unde quisquam doloribus nemo eius qui saepe illum rerum sed quae autem dolores nihil ab",
        "link": "http://www.garcia.net/velit-adipisci-odio-repellat-officia-dolorem-consectetur-doloribus-dolorem",
        "date_creation": "2021-01-18T02:55:20.000Z",
        "image_name": null,
        "content_name": null,
        "age_category": "Senior (à partir de 56 ans)",
        "username": "klenoir",
        "relationship_type": "Famille - parents",
        "resource_type": "Cours au format PDF",
        "category": "Santé psychique"
    },
    {
        "id": 147,
        "title": "similique necessitatibus quas qui natus impedit repellendus et",
        "description": "ducimus illo reprehenderit tempore neque magni ab et praesentium et in natus quia aut esse ut labore quo iure doloremque",
        "link": "http://www.lopez.com/vero-dolor-sed-consequatur-sed.html",
        "date_creation": "2021-01-14T16:56:49.000Z",
        "image_name": null,
        "content_name": null,
        "age_category": "Jeune adulte (19 à 35 ans)",
        "username": "xbertrand",
        "relationship_type": "Professionnel - collaborateurs",
        "resource_type": "Vidéo",
        "category": "Loisirs"
    }
]
```

### Evaluation d'une ressource
URL
```
{server_name}/api/resource/valuation/{resource_id}
```
Méthode : GET  
Body : aucun  
Header : /  
Exemple de retour :
```json
[
    {
        "valuation": 3.4
    }
]
```

### Action sur une ressource
URL
```
{server_name}/api/resource/action/{resource_id}
```
Méthode : POST  
Body : aucun  
Header : 
* Authorisation : renseigner le token
* actionTypeId : Type d'action sur la ressource 
  * 1 : Création
  * 2 : Consultation
  * 3 : Validation
  * 4 : Suspension
  * 5 : Modification
  * 6 : Suppression
Exemple de retour :
```json
{
    "id": 827
}
```

### Liste des commentaires d'une ressource
Les commentaires sont ordonnées par date de publication (du plus récent au plus ancien)
URL
```
{server_name}/api/comment/{resource_id}
```
Méthode : GET  
Body : aucun  
Header : /  
Exemple de retour :
```json
[
    {
        "id": 1,
        "content": "Cum facere repellendus quo et. Ex ut commodi accusamus.",
        "comment_date": "2020-03-22T11:26:47.000Z",
        "username": "maillot.sebastien"
    }
]
```

### Liste des réponses à un commentaire
Les réponses sont ordonnées par date de publication (de la plus récente à la plus ancienne)  
URL
```
{server_name}/api/comment/answer/{comment_id}
```
Méthode : GET  
Body : aucun  
Header : /  
Exemple de retour :
```json
[
    {
        "id": 1,
        "content": "Est illum soluta non quia.",
        "answer_date": "2019-12-17T12:21:51.000Z",
        "username": "veronique99"
    },
    {
        "id": 45,
        "content": "Rerum qui iste quia quis quo maxime ut.",
        "answer_date": "2019-10-13T21:13:08.000Z",
        "username": "thibaut.hamel"
    }
]
```

### Poster un commentaire
URL
```
{server_name}/api/resource/{resource_id}/comment
```
Méthode : POST  
Body :
```json
{
    "content": "__contenu_du_commentaire__"
}
```
Header : 
* Authorisation : renseigner le token  
Exemple de retour :
```json
{
    "id": 2002
}
```

### Liste des départements
URL
```
{server_name}/api/resource/departments
```
Méthode : GET  
Body : aucun  
Header : /  
Exemple de retour :
```json
[
    {
        "id": 1,
        "label": "Ain",
        "number": "01"
    },
    {
        "id": 2,
        "label": "Aisne",
        "number": "02"
    },
    {
        "id": 3,
        "label": "Allier",
        "number": "03"
    },
    { ... }
]
```

### Liste des catégories d'âge
URL
```
{server_name}/api/resource/age_categories
```
Méthode : GET  
Body : aucun  
Header : /  
Exemple de retour :
```json
[
    {
        "id": 1,
        "label": "Enfant (0 à 18 ans)"
    },
    {
        "id": 2,
        "label": "Jeune adulte (19 à 35 ans)"
    },
    {
        "id": 3,
        "label": "Adulte (36 à 55 ans)"
    },
    {
        "id": 4,
        "label": "Senior (à partir de 56 ans)"
    }
]
```