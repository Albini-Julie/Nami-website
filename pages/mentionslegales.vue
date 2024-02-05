<template>
  <!--Bloc contenant toute la page mentions légales-->
  <div class="mentionslegales">
    <!--Titre-->
    <h1 class="mentionslegales__title">Mentions legales</h1>
    <!--Bloc contenus-->
    <div class="mentionslegales__content">
      <!--Première colonne-->
      <div class="mentionslegales__colonne">
        <!--Appel du composant bloc-legal avec les différentes données-->
        <bloc-legal
          :content="['Nami', 'nami.albini.fr']"
          titre="Identification du site"
        />
        <bloc-legal
          :content="[
            'Julie Albini',
            '4 Pl. Lucien Tharradin, 25200',
            'Montbéliard - Département MMI',
            'Montbéliard',
            '07 60 38 72 51',
            'julie-albini@orange.fr',
          ]"
          titre="Propriétaire du site / Responsable publication"
        />
        <bloc-legal
          :content="[
            'Infomaniak',
            'Rue Eugène-Marziano 25, 1227 Genève',
            'Suisse',
            '+41 22 820 35 40',
          ]"
          titre="Hébergeur du site"
        />
        <bloc-legal
          :content="[
            'L’ensemble du contenu de ce site web, y compris les textes, les graphiques, les logos, les images, les clips audio et vidéo hors API, est la propriété du département MMI Montbéliard et est protégé par les lois sur la propriété intellectuelle. Toute reproduction, distribution, ou utilisation non autorisée de ce contenu est strictement interdite.',
          ]"
          titre="Propriété intellectuelle"
        />
      </div>
      <!--Deuxième colonne-->
      <div class="mentionslegales__colonne">
        <bloc-legal
          :content="[
            'Aucune donnée sur l’utilisateur n’est enregistrée ou conservée. Toutes les éventuelles données demandées comme la localisation ne serve qu’au design du site et ne sont ni conservées ni vendues.',
          ]"
          titre="Collecte et traitement des données personnelles"
        />
        <bloc-legal
          :content="[
            'L’utilisateur peut librement naviguer sur le site et intéragir avec. Il a la possibilité de fournir sa localisation. Donner ou non cette information n’influencera en rien la qualité de son utilisation.',
          ]"
          titre="Conditions générales d'utilisation"
        />
        <bloc-legal
          :content="[
            'L’utilisateur peut s’il le souhaite ne pas donner sa localisation. Ne pas donner cette information n’influencera en rien la qualité de l’utilisation du site web.',
          ]"
          titre="Droits de l’utilisateur"
        />
        <bloc-legal
          :content="[
            'Bien que nous nous efforçons de fournir des informations précises et à jour, nous ne garantissons pas l’exactitude ni l’exhaustivité du contenu de ce site web. Nous déclinons toute responsabilité vis-à-vis des contenus apporter par les API externes et pour tout dommage résultant de l’utilisation de ce site web.',
          ]"
          titre="Limitation de responsabilité"
        />
      </div>
    </div>
  </div>
  <!--Importation du composant Footer-->
  <Footer titre="Page d'accueil" lien="/" message />
</template>

<style lang="scss" scoped>
// Styles du bloc général
.mentionslegales {
  margin: 0;
  padding: rem(30) rem(20);
  height: fit-content;
  overflow: hidden;
  position: relative;

  background-image: url("/ciel-degage.jpg");
  background-repeat: no-repeat;
  background-size: cover;

  // Styles du titre
  &__title {
    color: $secondary-color;
    font-family: $tertiary-font-family;
    font-size: rem(65);
    margin: 0px;
    margin-bottom: rem(30);
    @include medium-up {
      text-align: center;
      font-size: rem(80);
      display: flex;
      justify-content: center;
    }
    @include large-up {
      font-size: rem(100);
    }
    @include x-large-up {
      font-size: rem(120);
    }
  }

  // Styles des colonnes
  &__colonne {
    display: flex;
    flex-direction: column;
    gap: rem(20);
    @include large-up {
      display: flex;
      flex-direction: column;
      width: 50%;
    }
  }

  // Styles du bloc contenant les contenus
  &__content {
    display: flex;
    flex-direction: column;
    gap: rem(20);
    @include medium-up {
      margin: auto;
    }
    @include large-up {
      gap: rem(0);
      flex-direction: row;
      justify-content: space-around;
    }
    @include x-large-up {
    }
  }
}
</style>
