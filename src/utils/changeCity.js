import i18n from "./i18n";

export const changeCity = (city) => {
  localStorage.setItem("city", city);

  i18n.setDefaultNamespace(city);
  i18n.changeLanguage(i18n.language);
  const currentCity = localStorage.getItem("city");
  console.log("current", i18n);
};
