const jsonp = ({ url, params, callBackName }) => {
  const generateParams = () => {
    let string = "";
    for (let key of params) {
      string += `${key}=${params[key]}&`;
    }
    return `${url}?${string}callBack=${callBackName}`;
  };

  return new Promise(resolve => {
    const script = document.createElement("script");
    script.src = generateParams();
    document.body.appendChild(script);
    window[callBackName] = data => {
      resolve(data);
      document.body.removeChild(script);
    };
  });
};
