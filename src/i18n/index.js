import en from './en.json';
import ru from './ru.json';

export const translate = (key, language) => {
  let langData = {};

  if(language === 'EN') {
    langData = en;
  }else if(language === 'RU') {
    langData = ru;
  }
  return langData[key];
}