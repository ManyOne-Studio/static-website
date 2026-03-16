export const data = {
  title: "STRUCTURE DU SHADER",
  date: "2026-03-10",
  slug: "structure-du-shader",
  tags: ["Threejs", "GLSL"],
  desc: "Exploration des techniques de rendu pour l'herbe et gestion des instances massives.",
  video: "/videos/test.mp4", // Doit être dans le dossier public/videos/
  sections: [
    {
      title: "L'APPROCHE TECHNIQUE",
      content: "Pour obtenir un rendu fluide avec des milliers de brins d'herbe, nous utilisons l'InstancedMesh de Three.js. Cela permet d'envoyer une seule géométrie à la carte graphique et de répéter les instances avec des matrices de transformation uniques.",
      images: ["/img/test1.jpg", "/img/test2.jpg"] // Doit être dans public/img/
    },
    {
      title: "OPTIMISATION",
      content: "Le gain de performance est de 30% grâce au GLSL. En déportant le calcul du vent directement dans le Vertex Shader, on libère le CPU de calculs lourds de transformation de coordonnées à chaque frame.",
      images: ["/img/test3.jpg"]
    }
  ]
};