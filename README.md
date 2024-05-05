# wizeTodoList

## Description

L'application wizeTodoList est une application de gestion des tâches conçue pour gérer une liste d'actions à effectuer. Elle permet aux utilisateurs de créer, modifier et supprimer des tâches, chacune pouvant être attribuée à une personne spécifique.

## Fonctionnalités

- Créer, modifier et supprimer des tâches
- Attribuer des tâches à des individus
- Afficher les détails des tâches
- Filtrer les tâches selon des critères spécifiques
- Implémenter la pagination pour la liste des tâches
- Gestion des données simulées côté frontend

## Technologies Utilisées

- **React.js**: Framework frontend pour la construction d'interfaces utilisateur
- **Vite**: Outil frontend de nouvelle génération pour le développement web moderne
- **TypeScript**: Superset syntaxique strict de JavaScript ajoutant un typage statique optionnel
- **Axios**: Client HTTP basé sur des promesses pour effectuer des requêtes API
- **axios-mock-adapter**: Adaptateur de simulation pour Axios pour simuler les réponses API
- **Material-UI**: Composants React pour un développement web plus rapide et plus facile

## Modèles

### Todo

- **titre**: Titre de la tâche (string)
- **assignee**: Personne assignée à la tâche (Assignee)
- **startDate**: Date de début de la tâche (Date)
- **endDate**: Date de fin de la tâche (Date)
- **priority**: Niveau de priorité de la tâche (Enum)
- **labels**: Étiquettes associées à la tâche (Enum[])
- **description**: Description de la tâche (string)

### Assignee

- **name**: Nom de la personne (string)
- **email**: Adresse e-mail de la personne (string)
- **phone**: Numéro de téléphone de la personne (string)

### Priority

- **LOW**: Basse
- **MEDIUM**: Moyenne
- **HIGH**: Haute

### Label

- **HTML**: HTML (rouge)
- **CSS**: CSS (bleu)
- **JQUERY**: jQuery (vert)
- **NODEJS**: Node.js (#333)

## Utilisation
1. Installer pnpm en utilisant npm :
    ```bash
    npm install -g pnpm
    ```

2. Cloner le dépôt :

    ```bash
    git clone https://github.com/niedjo/wizeTodoList.git
    ```

3. Installer les dépendances :

    ```bash
    pnpm install
    ```

4. Lancer l'application :

    ```bash
    pnpm run dev
    ```
