import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { test } from "node:test";
import ts from "typescript";

function loadModule(path) {
  const source = readFileSync(new URL(path, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
  const exports = {};
  runInNewContext(outputText, { exports });
  return exports;
}
const { groupShopProducts } = loadModule("../lib/product-options.ts");
const { normalizeCheckoutItems, makeOrderItem } = loadModule("../lib/checkout-items.ts");
const source = JSON.parse(readFileSync(new URL("../data/content-updates/2026-11.json", import.meta.url), "utf8"));
const products = source.products.map((product, index) => ({
  ...product,
  id: `product-${index}`,
  currency: "EUR",
  stock_status: "in_stock",
  colors: [],
  categorySlugs: [product.category],
  image: product.images[0],
}));

test("numbered mice share one card with six colours and both packaging choices", () => {
  const group = groupShopProducts(products).find(product => product.slug === "grabulis-pelite");
  assert.ok(group);
  assert.equal(group.options.length, 12);
  assert.equal(new Set(group.options.map(option => option.color)).size, 6);
  assert.equal(group.price_cents, 1000);
  for (const color of new Set(group.options.map(option => option.color))) {
    const choices = group.options.filter(option => option.color === color);
    assert.equal(choices.find(option => option.giftBox).price_cents, 1300);
    assert.equal(choices.find(option => !option.giftBox).price_cents, 1000);
    assert.notEqual(choices[0].id, choices[1].id);
  }
  const grey = group.options.find(option => option.color === "pelēka ar fuksiju");
  assert.match(grey.images[0].url, /pelites-pelekas/);
  assert.equal(group.aliases.length, 12);
});

test("snails have one product and preserve unknown prices for all three colours", () => {
  const groups = groupShopProducts(products);
  const snail = groups.find(product => product.slug === "grabulis-gliemezitis");
  assert.equal(groups.filter(product => product.name.startsWith("Grabulītis “Gliemezītis”")).length, 1);
  assert.equal(snail.options.length, 3);
  assert.ok(snail.options.every(option => option.price_cents === null));
  assert.ok(snail.options.some(option => option.color === "dzeltens"));
});

test("the newborn set has a gift-box choice and multipacks become choices on one card", () => {
  const groups = groupShopProducts(products);
  const gift = groups.find(product => product.slug === "davanu-komplekts-kengurs");
  assert.equal(gift.options.length, 2);
  assert.equal(gift.options.find(option => option.giftBox).price_cents, 6300);
  assert.equal(gift.options.find(option => !option.giftBox).price_cents, 6000);
  assert.equal(groups.find(product => product.slug === "engelisi").options.length, 5);
  assert.equal(groups.find(product => product.slug === "dekorativas-senites").options.length, 3);
});

test("legacy colour variations retain their matching photos and aliases", () => {
  const base = products[0];
  const variants = ["rozā", "zils"].map((color, index) => ({ ...base, id: `old-${index}`, slug: `grauzamrinkis-un-grabulitis-kakis-${index}`, name: `Graužamriņķis un grabulītis “Kaķis” — ${color}`, images: [{url: `/photo-${color}.jpg`,alt:color}] }));
  const grouped = groupShopProducts(variants);
  assert.equal(grouped.length, 1);
  assert.equal(grouped[0].options[1].images[0].url, "/photo-zils.jpg");
  assert.ok(grouped[0].aliases.includes(variants[1].slug));
});

test("checkout keeps colours on separate lines and merges only identical selections", () => {
  const items = normalizeCheckoutItems([{id:"one",color:"Rozā",quantity:2},{id:"one",color:"Zils",quantity:1},{id:"one",color:"Rozā",quantity:3}]);
  assert.equal(items.length, 2);
  assert.equal(items.find(item => item.color === "Rozā").quantity, 5);
  assert.equal(items.find(item => item.color === "Zils").quantity, 1);
  assert.equal(normalizeCheckoutItems([{id:"one",quantity:200}])[0].quantity, 99);
});

test("checkout validates colour and charges server prices for boxed and unboxed selections", () => {
  const product = {id:"one",slug:"one",name:"Pelīte",price_cents:1000,currency:"EUR",stock_status:"in_stock",shop_product_colors:[{shop_colors:{name:"Rozā"}}]};
  assert.equal(makeOrderItem(product,{id:"one",quantity:1,color:"Invented"}),null);
  const unboxed = makeOrderItem(product,{id:"one",quantity:2,color:"Rozā",price_cents:1});
  assert.equal(unboxed.line_total_cents,2000);
  assert.equal(unboxed.selected_color,"Rozā");
  assert.match(unboxed.product_name,/Rozā/);
  const boxed = makeOrderItem({...product,id:"box",name:"Pelīte dāvanu kastītē",price_cents:1300},{id:"box",quantity:1});
  assert.equal(boxed.unit_price_cents,1300);
  assert.equal(makeOrderItem({...product,price_cents:null},{id:"one",quantity:1}),null);
  assert.equal(makeOrderItem({...product,stock_status:"sold_out"},{id:"one",quantity:1}),null);
});
