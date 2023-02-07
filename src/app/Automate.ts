export class Automate {
  static valideCalcul(calcul: string): true | [number, string] {
    function estChiffre(chiffre: string): boolean {
      if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(chiffre)) return true;
      return false;
    }
    let index = 0;

    function etat_a(input: string, index: number): true | [number, string] {
      if (estChiffre(input[index])) {
        return etat_c(input, index + 1);
      } else if (input[index] === "-") {
        return etat_b(input, index + 1);
      } else if (input[index] === ".") {
        return etat_d(input, index + 1);
      }
      return [index, "numérique attendu"];
    }

    function etat_b(input: string, index: number): true | [number, string] {
      if (estChiffre(input[index])) {
        return etat_c(input, index + 1);
      } else if (input[index] === ".") {
        return etat_d(input, index + 1);
      }
      return [index, "numérique attendu"];
    }

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
      }
      return [index, "numérique ou opérateur attendu"];
    }

    function etat_d(input: string, index: number): true | [number, string] {
      if (estChiffre(input[index])) {
        return etat_e(input, index + 1);
      }
      return [index, "numérique attendu"];
    }

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
      }
      return [index, "numérique ou opérateur attendu"];
    }

    return etat_a(calcul, index);
  }
}

let result = Automate.valideCalcul("1+1=2");

console.log(result);

// rajout des espaces
