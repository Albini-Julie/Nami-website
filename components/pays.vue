<!--Intégration du pays-->
<template>
  <!--Intégration des pays aléatoires dans la liste listePays-->
  <div v-for="(pays, index) in listePays" :key="pays.id_pay">
    <!--Intégration avec primaryColor-->
    <div v-if="index % 2 === 0">
      <CardPays
        :heure="pays.heure"
        :nom="pays.nom"
        :latitude="pays.capitale.latitude"
        :longitude="pays.capitale.longitude"
        :color="primaryColor"
        :colorText="primaryColorText"
        :img_spe="pays.specialite.img_spe"
        :img_dra="pays.img_dra"
        :img_pay="pays.img_pay"
        :pop="pays.nb_hab"
        :superficie="pays.superficie"
        :capitale="pays.capitale.nom"
        :specialite="pays.specialite.nom"
        :langue="pays.langue"
        :chemin="pays.news"
      />
    </div>
    <!--Intégration avec secondaryColor-->
    <div v-else>
      <CardPays
        :heure="pays.heure"
        :nom="pays.nom"
        :latitude="pays.capitale.latitude"
        :longitude="pays.capitale.longitude"
        :color="secondaryColor"
        :colorText="secondaryColorText"
        :img_spe="pays.specialite.img_spe"
        :img_dra="pays.img_dra"
        :img_pay="pays.img_pay"
        :pop="pays.nb_hab"
        :superficie="pays.superficie"
        :capitale="pays.capitale.nom"
        :specialite="pays.specialite.nom"
        :langue="pays.langue"
        :chemin="pays.news"
      />
    </div>
  </div>
</template>
<script>
// import des outils utiles
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import {
  where,
  query,
  collection,
  getFirestore,
  getDocs,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

// Import des variables globales
// latitude1 contient la latitude de la première capitale
// longitude1 contient la longitude de la première capitale
// latitude2 contient la latitude de la seconde capitale
// longitude2 contient la longitude de la seconde capitale
// latitude3 contient la latitude de la troisième capitale
// longitude3 contient la longitude de la troisième capitale
// capitale1 contient le nom de la première captiale
// capitale2 contient le nom de la seconde captiale
// capitale3 contient le nom de la troisième captiale
import {
  latitude1,
  latitude2,
  latitude3,
  longitude1,
  longitude2,
  longitude3,
  capitale1,
  capitale2,
  capitale3,
} from "@/config.js";

// Création des props
// primaryColor contient le code hexadécimal de la première couleur à utiliser pour le contenu
// secondaryColor contient le code hexadécimal de la seconde couleur à utiliser pour le contenu
// primaryColorText contient le code hexadécimal de la couleur à utiliser pour le texte du contenu utilisant primaryColor
// secondaryColorText contient le code hexadécimal de la couleur à utiliser pour le texte du contenu utilisant secondaryColor
export default {
  props: {
    primaryColor: String,
    primaryColorText: String,
    secondaryColor: String,
    secondaryColorText: String,
  },
  // Création de la liste contenant les pays et leurs informations
  data: function () {
    return {
      listePays: [],
    };
  },
  //Au montage du composant on appelle la fonction getPays()
  mounted() {
    this.getPays();
  },
  methods: {
    // getPays récupère les données de chaque pays depuis la base de données et les stocke dans listePays
    async getPays() {
      const { firestore } = useFirebase();
      console.log(firestore);
      const storage = getStorage();
      const dbPays = collection(firestore, "Pays");
      const q = query(dbPays, "id_pay");

      try {
        const snapshot = await getDocs(q);
        const paysDocs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sélectionner trois pays aléatoires
        const selectedPays = this.getRandomElements(paysDocs, 3);

        for (const pays of selectedPays) {
          const spaceRef = ref(storage, "ImgPays/" + pays.img_pay);
          const spaceRefDrapeau = ref(storage, "ImgDrapeaux/" + pays.img_dra);

          try {
            const url = await getDownloadURL(spaceRef);
            pays.img_pay = url;
            const urlDrapeau = await getDownloadURL(spaceRefDrapeau);
            pays.img_dra = urlDrapeau;

            // Récupérer les informations de la capitale
            const capitaleQuery = query(
              collection(firestore, "Capitales"),
              where("id_cap", "==", pays.id_cap)
            );
            const capitaleSnapshot = await getDocs(capitaleQuery);

            if (!capitaleSnapshot.empty) {
              const capitaleDoc = capitaleSnapshot.docs[0];
              pays.capitale = capitaleDoc.data();
            } else {
              console.error("Aucune capitale trouvée pour l'ID:", pays.id_cap);
            }

            // Récupérer les informations de la spécialité
            const specialiteQuery = query(
              collection(firestore, "Specialites"),
              where("id_spe", "==", pays.id_spe)
            );
            const specialiteSnapshot = await getDocs(specialiteQuery);

            if (!specialiteSnapshot.empty) {
              const specialiteDoc = specialiteSnapshot.docs[0];
              pays.specialite = specialiteDoc.data();

              // Obtenez l'URL de téléchargement pour l'image de la spécialité
              const spaceRefSpecialite = ref(
                storage,
                "ImgSpecialite/" + pays.specialite.img_spe
              );
              const urlSpecialite = await getDownloadURL(spaceRefSpecialite);
              pays.specialite.img_spe = urlSpecialite;
            } else {
              console.error(
                "Aucune specialite trouvée pour l'ID:",
                pays.id_spe
              );
            }
          } catch (error) {
            console.error(
              "Erreur lors de la récupération des infos complémentaires",
              error
            );
          }
        }

        // On range dans listePays les trois pays alétoires et leurs données
        this.listePays = selectedPays;

        //récupération des latitudes et longitudes des trois capitales des pays pour la carte
        latitude1.value = this.listePays[0].capitale.latitude;
        longitude1.value = this.listePays[0].capitale.longitude;
        capitale1.value = this.listePays[0].capitale.nom;

        latitude2.value = this.listePays[1].capitale.latitude;
        longitude2.value = this.listePays[1].capitale.longitude;
        capitale2.value = this.listePays[1].capitale.nom;

        latitude3.value = this.listePays[2].capitale.latitude;
        longitude3.value = this.listePays[2].capitale.longitude;
        capitale3.value = this.listePays[2].capitale.nom;
      } catch (error) {
        console.error("Erreur lors de la récupération des pays", error);
      }
    },

    // Fonction qui s'occupe de sélectionner les trois pays aléatoires
    getRandomElements(array, numberOfElements) {
      const shuffledArray = array.slice().sort(() => 0.5 - Math.random());
      return shuffledArray.slice(0, numberOfElements);
    },
  },
};
</script>
