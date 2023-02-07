import { Automate } from "../app/Automate";

// Tests d'opérations valides

//Test des 4 opérations basiques

test("1+1=2", () => {
  expect(Automate.valideCalcul("1+1=2")).toBe(true);
});

test("1-1=0", () => {
  expect(Automate.valideCalcul("1-1=0")).toBe(true);
});

test("1*1=1", () => {
  expect(Automate.valideCalcul("1*1=1")).toBe(true);
});

test("1/1=1", () => {
  expect(Automate.valideCalcul("1/1=1")).toBe(true);
});

//Test des 4 opérations basiques avec chiffre flotants

test(".1+.1=.2", () => {
  expect(Automate.valideCalcul(".1+.1=.2")).toBe(true);
});

test(".1-.1=0", () => {
  expect(Automate.valideCalcul(".1-.1=0")).toBe(true);
});

test(".1*.1=.01", () => {
  expect(Automate.valideCalcul(".1*.1=.01")).toBe(true);
});

test(".1/.1=1", () => {
  expect(Automate.valideCalcul(".1/.1=1")).toBe(true);
});

//Test avec nombre flottants

test("11.11+1=12.11", () => {
  expect(Automate.valideCalcul("11.11+1=12.11")).toBe(true);
});

//Test des 4 opérations basiques avec chiffre négatif

test("-1+-1=-2", () => {
  expect(Automate.valideCalcul("-1+-1=2")).toBe(true);
});

test("-1--1=0", () => {
  expect(Automate.valideCalcul("-1--1=0")).toBe(true);
});

test("-1*-1=1", () => {
  expect(Automate.valideCalcul("-1*-1=0")).toBe(true);
});

test("1/1=1", () => {
  expect(Automate.valideCalcul("-1/-1=1")).toBe(true);
});

//Test des 4 opérations basiques avec chiffre négatif et chiffre flottant

test("-.1+-.1=-.2", () => {
  expect(Automate.valideCalcul("-.1+-.1=-.2")).toBe(true);
});

test("-.1--.1=0", () => {
  expect(Automate.valideCalcul("-.1--.1=0")).toBe(true);
});

test("-.1*-.1=.01", () => {
  expect(Automate.valideCalcul("-.1*-.1=.01")).toBe(true);
});

test("-.1/-.1=1", () => {
  expect(Automate.valideCalcul("-.1/-.1=1")).toBe(true);
});

//Test des 4 opérations basiques avec un NOMBRE

test("10+10=20", () => {
  expect(Automate.valideCalcul("10+10=20")).toBe(true);
});

test("10-10=0", () => {
  expect(Automate.valideCalcul("10-10=0")).toBe(true);
});

test("10*10=100", () => {
  expect(Automate.valideCalcul("10*10=100")).toBe(true);
});

test("10/10=1", () => {
  expect(Automate.valideCalcul("10/10=1")).toBe(true);
});

// Test avec des erreurs

test("a+1=1 | état a, index 0", () => {
  expect(Automate.valideCalcul("a+1=1")).toStrictEqual([0, "numérique attendu"]);
});

test("--1+1=1 | état b, index 1", () => {
  expect(Automate.valideCalcul("--1+1=1")).toStrictEqual([1, "numérique attendu"]);
});

test("1111a | état c, index 4", () => {
  expect(Automate.valideCalcul("1111a")).toStrictEqual([4, "numérique ou opérateur attendu"]);
});

test(".- | état d, index 1", () => {
  expect(Automate.valideCalcul(".-")).toStrictEqual([1, "numérique attendu"]);
});

test(".1a | état e, index 2", () => {
  expect(Automate.valideCalcul(".1a")).toStrictEqual([2, "numérique ou opérateur attendu"]);
});

// Tests avec des espaces

test("1 +1 = 2", () => {
  expect(Automate.valideCalcul("1 +1 = 2")).toBe(true);
});

test(" 1 + 1 = 2", () => {
  expect(Automate.valideCalcul(" 1 + 1 = 2")).toBe(true);
});

test(" .1 + .1 = 2", () => {
  expect(Automate.valideCalcul(" .1 + .1 = 2")).toBe(true);
});

test("1  +1  = 2", () => {
  expect(Automate.valideCalcul("1  +1  = 2")).toBe(true);
});

test("1 a+1 a= 2", () => {
  expect(Automate.valideCalcul("1 a+1 a= 2")).toStrictEqual([2, "espace ou opérateur attendu"]);
});
