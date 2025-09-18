import { colorMap } from "./colors.js";

export const getColorRGB = (colorName) => {
  return colorMap[colorName.toLowerCase()] || "#000000";
};

export const mapProduct = (product) => {
  if (!product) return null;

  // agrupamos variantes por color
  const colorMapTemp = {};
  product.variants.forEach((v) => {
    if (!colorMapTemp[v.color]) colorMapTemp[v.color] = [];
    colorMapTemp[v.color].push({ name: v.size, stock: v.stock });
  });

  const colors = Object.keys(colorMapTemp).map((colorName) => ({
    name: colorName,
    rgb: getColorRGB(colorName),
    sizes: colorMapTemp[colorName],
  }));

  return {
    _id: product._id,
    category: product.category,
    brand: product.brand,
    title: product.title,
    description: product.description,
    price: product.price,
    thumbnails: product.thumbnails,
    colors,
  };
};
