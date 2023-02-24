
const trancateCharacter = (text) => {
  if (typeof text === 'string' && text && !/\$\$/.test(text)) {
    return text.split('$').join('$$') || text;
  }
  return text;
};
export function render(template, object) {
  let cloneTemplate = template;
  if (cloneTemplate && object) {
    Object.keys(object).forEach((key) => {
      cloneTemplate = cloneTemplate.replace(new RegExp(`{{${key}}}`, 'g'), trancateCharacter(object[key]));
    });
  }
  return cloneTemplate || '';
}
