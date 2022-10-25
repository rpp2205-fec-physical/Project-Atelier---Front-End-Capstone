module.exports = function clickAnalytics(id) {
  if (document.getElementById(id) !== null) {
    let eventMaker = (e) => {
      console.log(e)
      let stringifyObj = (object, depth=0, max_depth=2) => {
        if (depth > max_depth)
            return 'Object';
        const obj = {};
        for (let key in object) {
            let value = object[key];
            if (value instanceof Node)
                value = {id: value.id};
            else if (value instanceof Window)
                value = 'Window';
            else if (value instanceof Object)
                value = stringifyObj(value, depth+1, max_depth);

            obj[key] = value;
        }
        return depth ? obj : JSON.stringify(obj);
      }
      let date = new Date();
      let element = stringifyObj(e.target, 2).outerHTML;
      let currentEvent = {element: element, widget: id, time: date};
      console.log('click analytics obj', currentEvent);
      // this.props.post('/interactions', currentEvent);
    }
    document.getElementById(id).addEventListener("click", eventMaker);
    document.getElementById(id).removeEventListener("click", eventMaker);
  }
}