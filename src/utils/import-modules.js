/**
 * @description 引入某路径下的全部js文件
 * @author taowt
 * @param requireModules
 * @param type  'object' or 'array' default 'object'
 */
export default function importModules(requireModules, type = 'object') {
  let modulesObj = {};
  let modulesArr = [];
  requireModules.keys().forEach(fileName => {
    let moduleName = fileName.replace(/(\.\/|\.js)/g, '');
    if (type === 'object') {
      modulesObj[moduleName] = requireModules(fileName).default;
    } else {
      modulesArr.push(requireModules(fileName).default);
    }
  });
  return type === 'object' ? modulesObj : modulesArr;
}
