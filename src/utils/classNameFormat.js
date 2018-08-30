export default function(classObj) {
  const classes = [];
  
  Object.keys(classObj).forEach(key => {
    if (classObj[key]) {
      classes.push(key);
    }
  });

  return classes.join(' ');
}