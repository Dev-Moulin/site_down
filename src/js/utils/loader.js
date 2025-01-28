
const createLoader = () => {
    if (!document.getElementById('loader')) {
      const loader = document.createElement('div');
      loader.id = 'loader';
      loader.className = 'pac-man';
      document.body.appendChild(loader);
    }
  };
  
  const showLoader = () => {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'flex';
  };
  
  const hideLoader = () => {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
  };
  
  export { createLoader, showLoader, hideLoader };
  