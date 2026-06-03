export const data = {
  title: "SYNCHRONISER UN SOUS-MARIN EN COOP : CE QUE MIRROR ET UNITY NOUS ONT APPRIS",
  date: "2026-06-03",
  slug: "synchronisation-sous-marin-coop-mirror-unity",
  tags: ["Devlog", "Programmation", "Réseau", "Mirror", "Unity"],
  desc: "Gestion de l'autorité, conflits de NetworkIdentity, saccades de mouvement... Retour sur le défi technique derrière le déplacement physique du Bathyscaphe en multijoueur.",
  sections: [
    {
      title: "LA CONTRAINTE MULTIJOUEUR AU CŒUR DU DESIGN",
      content: "Lorsque nous avons lancé le développement de Towards the Glow — notre jeu d'exploration sous-marine en coopération dans un univers steampunk — nous savions que le multijoueur réseau serait notre plus grand défi. Non pas parce que le netcode est une technologie nouvelle, mais parce que chaque mécanique de gameplay devait être pensée à travers un prisme unique : 'Comment cela fonctionne-t-il lorsque 4 clients doivent être synchronisés en temps réel ?'. Après avoir dompté la synchronisation des mouvements des plongeurs et des interactions physiques, le fait de déplacer un véhicule partagé contenant des joueurs en mouvement a apporté une toute nouvelle couche de verrous techniques et de contraintes d'ingénierie.",
      images: []
    },
    {
      title: "L'INTENTION DE DESIGN : UN HUB EN MOUVEMENT",
      content: "Le Bathyscaphe est le cœur névralgique de notre expérience. Les joueurs y commencent la partie, descendent ensemble dans les abysses et manipulent ses commandes mécaniques pour monter ou descendre. Sur le papier, c'est simple. L'idée créative était de concevoir un espace partagé, une base mobile que les joueurs peuvent quitter pour explorer l'eau et dans laquelle ils doivent retourner, créant une tension organique entre la sécurité de l'habitacle et la vulnérabilité des sorties aquatiques. Le sentiment physique recherché était crucial : le Bathyscaphe doit paraître lourd, collectif et réel. Quand il bouge, tout l'équipage doit ressentir son inertie de manière diégétique.",
      images: ["/img/robin1.png"]
    },
    {
      title: "LE VERROU TECHNIQUE : LA SÉPARATION DES AUTORITÉS",
      content: "C'est ici que les contraintes de Mirror (notre solution réseau sur Unity) deviennent complexes. En multijoueur, chaque objet interactif a besoin d'un composant 'NetworkIdentity'. Or, l'intérieur de notre Bathyscaphe regorge de boutons, de racks d'équipement et d'outils ayant chacun leur propre identité réseau. Problème : Mirror interdit d'imbriquer des 'NetworkIdentity' parents/enfants. Notre premier réflexe a été d'utiliser le système de hiérarchie classique d'Unity en mettant les joueurs enfants du sous-marin pour que le moteur gère le déplacement. Une solution simple, élégante... et totalement fausse. En réseau, les joueurs possédant une autorité client (Client-Authoritative), leur 'NetworkTransform' lutte constamment contre la physique du parent, provoquant des désynchronisations lourdes et des saccades visuelles violentes.",
      images: []
    },
    {
      title: "NOTRE SOLUTION : LE DÉCOUPAGE DU PROBLÈME EN DEUX AXES",
      content: "Pour lever ce verrou, nous avons scindé le problème en deux logiques distinctes. D'une part, le Bathyscaphe possède son propre 'NetworkIdentity' et un 'NetworkTransform' géré exclusivement par le serveur (Server-Authoritative). Il se déplace, et Mirror synchronise sa position sur tous les écrans. Les objets interactifs à bord sont placés au même niveau hiérarchique (et non en enfants) pour éviter le conflit d'imbrication. D'autre part, les passagers sont traités séparément : chaque joueur possède un composant 'BathyscaphePassenger' qui lit localement la vélocité du sous-marin à chaque frame et applique ce delta à sa propre position (`transform.position += _bathyscaphe.Velocity;`). Le serveur déplace la structure, et chaque client déplace son propre avatar en parfaite synchronie, éliminant les saccades pour le joueur local.",
      images: ["/img/robin2.png"]
    },
    {
      title: "BILAN DE PRÉPRODUCTION ET PERSPECTIVES D'ITÉRATION",
      content: "Cette architecture logicielle s'avère amplement suffisante pour notre prototype actuel, mais elle demande encore des ajustements pour la production. Nous faisons face à une limite connue : même avec l'interpolation active, les avatars des autres joueurs connectés subissent des vibrations visuelles (*jitter*) lorsque le Bathyscaphe est en mouvement. C'est un chantier que nous devons résoudre lors du prochain sprint. Ce défi nous rappelle que le code réseau force à réfléchir constamment en termes de propriété de l'information : à qui appartient cet objet ? Qui a l'autorité pour le déplacer ? L'essentiel est que notre intention de design — un véhicule lourd et collectif où l'on peut se déplacer librement pendant sa descente — a survécu aux contraintes techniques. Développé par une équipe de 5 étudiants de Goblins x Enjmin, Towards the Glow continue sa descente. Suivez nos prochains devlogs pour découvrir la suite de nos défis créatifs !"
    }
  ]
};