<template>
  <h2>Liste des pays et de leurs données</h2>
  <div v-for="pays in listePays" :key="pays.id_pay">
    <p>{{ pays.nom }}</p>
    <p>{{ pays.superficie }}</p>
    <p>{{ pays.nb_hab }}</p>
    <p>{{ pays.langue }}</p>
    <p>{{ pays.id_cap }}</p>
    <p>{{ pays.id_spe }}</p>
    <p>{{ pays.id_pay }}</p>
    <p>{{ pays.img_pay }}</p>
    <div v-if="pays.capitale">
      <p>Capitale: {{ pays.capitale.nom }}</p>
    </div>
    <div v-if="pays.specialite">
      <p>Specialites: {{ pays.specialite.nom }}</p>
      <img style="width: 30%" :src="pays.specialite.img_spe" />
    </div>
    <img style="width: 30%" :src="pays.img_pay" />
    <img style="width: 30%" :src="pays.img_dra" />
    <!-- Affichez les informations de la capitale -->

    <br />
    <br />
  </div>
</template>
<script>
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

export default {
  data: function () {
    return {
      listePays: [],
    };
  },
  mounted() {
    this.getPays();
  },
  methods: {
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

        this.listePays = selectedPays;
      } catch (error) {
        console.error("Erreur lors de la récupération des pays", error);
      }
    },

    getRandomElements(array, numberOfElements) {
      const shuffledArray = array.slice().sort(() => 0.5 - Math.random());
      return shuffledArray.slice(0, numberOfElements);
    },
  },
};
</script>
