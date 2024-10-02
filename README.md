# PictureQuizz

Quizz de reconnaissance d'image déployé via Netlify ici : <a href='https://picture-quizz.thorigne-tt.net/'> Picture Quizz</a>


## Développement

Pour installer les dépendances et commencer à développer en local :

```sh
yarn
yarn start
```

`yarn husky` to set the commit hooks

## Docker

Pour déployer l'application avec docker :

```sh
docker build -t picture-quizz
docker run -p 8080:80 picture-quizz
```