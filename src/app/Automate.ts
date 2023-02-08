// Automate de vérification : Classe qui permet de vérifier si un calcul mathématiques est bien écrit. (Sous la forme nb1 operateur nb2 = | ex : 1 + 1 = 2 renvoie true alors que 1 ++ 1 = 2 renverra [3, "numérique attendu"], 3 etant l'index ou l'erreur se trouve, et le string suivant l'erreur en elle même)

export class Automate {
  // On implémente une méthode valideCalcul, cette méthode prend un string en entrée et retour soit true, soit le couple avec l'index et l'erreur.

  static valideCalcul(calcul: string): true | [number, string] {
    // L'index correspond au premier elément qui sera dans le couple en cas d'erreur.
    let index = 0;

    // Fonction estChiffre, elle prend comme seul paramètre, le chiffre (ou bien l'opérateur) que l'on passe (dans les autres fonction on l'appelle via input[index] pour récuperer que le caractère sur lequel on itere) et vérifie si c'est un nombre, renvoie true ou false.

    function estChiffre(chiffre: string): boolean {
      if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(chiffre)) return true;
      return false;
    }

    // L'automate est composé de plusieurs états, chaque états vont vérifier le caractère sur lequel on itere.

    /* 

    Fonction etat a 

    Si le caractère est un chiffre, on va à l'état c
    ______________________ moins, on va à l'état b
    ______________________ point, on va à l'état d
    ______________________ espace, on boucle à nouveau sur l'état a
    Si le caractère n'est aucun de ces caractères, on retourne le couple d'erreur [index, "numérique attendu"]

  */
    function etat_a(input: string, index: number): true | [number, string] {
      if (estChiffre(input[index])) {
        return etat_c(input, index + 1);
      } else if (input[index] === "-") {
        return etat_b(input, index + 1);
      } else if (input[index] === ".") {
        return etat_d(input, index + 1);
      } else if (input[index] === " ") {
        return etat_a(input, index + 1);
      }
      return [index, "numérique attendu"];
    }

    /* 

    Fonction etat b

    Si le caractère est un chiffre, on va à l'état c
    ______________________ point, on va à l'état d
    Si le caractère n'est aucun de ces caractères, on retourne le couple d'erreur [index, "numérique attendu"]
    
  */

    function etat_b(input: string, index: number): true | [number, string] {
      if (estChiffre(input[index])) {
        return etat_c(input, index + 1);
      } else if (input[index] === ".") {
        return etat_d(input, index + 1);
      }
      return [index, "numérique attendu"];
    }

    /* 

    Fonction etat c 

    Si le caractère est un chiffre, on va à l'état c
    ______________________ moins, on va à l'état b
    ______________________ point, on va à l'état d
    ______________________ espace, on boucle à nouveau sur l'état a
    Si le caractère n'est aucun de ces caractères, on retourne le couple d'erreur [index, "numérique ou opérateur attendu"]

  */

    function etat_c(input: string, index: number): true | [number, string] {
      if (estChiffre(input[index])) {
        return etat_c(input, index + 1);
      } else if (
        input[index] === "+" ||
        input[index] === "-" ||
        input[index] === "*" ||
        input[index] === "/"
      ) {
        return etat_a(input, index + 1);
      } else if (input[index] === ".") {
        return etat_e(input, index + 1);
      } else if (input[index] === "=") {
        return true;
      } else if (input[index] === " ") {
        return etat_f(input, index + 1);
      }
      return [index, "numérique ou opérateur attendu"];
    }

    /* 

    Fonction etat d

    Si le caractère est un chiffre, on va à l'état e
    Si le caractère n'est aucun de ces caractères, on retourne le couple d'erreur [index, "numérique attendu"]

  */

    function etat_d(input: string, index: number): true | [number, string] {
      if (estChiffre(input[index])) {
        return etat_e(input, index + 1);
      }
      return [index, "numérique attendu"];
    }

    /* 

    Fonction etat e

    Si le caractère est un chiffre, on boucle sur l'état e
    ______________________ opérateur (+ - / *), on va à l'état a
    ______________________ espace, on va à l'état f
    ______________________ est un égal, on retourne true
    Si le caractère n'est aucun de ces caractères, on retourne le couple d'erreur [index, "numérique ou opérateur attendu"]

  */

    function etat_e(input: string, index: number): true | [number, string] {
      if (estChiffre(input[index])) {
        return etat_e(input, index + 1);
      } else if (
        input[index] === "+" ||
        input[index] === "-" ||
        input[index] === "*" ||
        input[index] === "/"
      ) {
        return etat_a(input, index + 1);
      } else if (input[index] === "=") {
        return true;
      } else if (input[index] === " ") {
        return etat_f(input, index + 1);
      }
      return [index, "numérique ou opérateur attendu"];
    }

    /* 

    Fonction etat f

    Si le caractère est un opérateur, on va à l'état a
    ______________________ égal, on retourne true
    Si le caractère n'est aucun de ces caractères, on retourne le couple d'erreur [index, "espace ou opérateur attendu"]

  */

    function etat_f(input: string, index: number): true | [number, string] {
      if (input[index] === " ") {
        return etat_f(input, index + 1);
      } else if (
        input[index] === "+" ||
        input[index] === "-" ||
        input[index] === "*" ||
        input[index] === "/"
      ) {
        return etat_a(input, index + 1);
      } else if (input[index] === "=") {
        return true;
      }
      return [index, "espace ou opérateur attendu"];
    }

    // La méthode valideCalcul commence par l'état a, avec calcul, etant le string que l'on passe en paramètre, et l'index démarre à 0

    return etat_a(calcul, index);
  }
}

let result = Automate.valideCalcul("1 a+1 a= 2");

console.log(result);
