
console.log("wikipedia reader extension in use");


const elementsToHide = [
    '#mw-panel',           
    '#p-navigation',       
    '.vector-header-container', 
    '#footer'              
];

elementsToHide.forEach((m)=>{
  let doc = document.querySelector(m);
  if(doc){
    doc.style.display = 'none';
  }


})
const content = document.querySelector('#content');

if (content) {
    const isMobile = window.innerWidth < 600;

    content.style.boxSizing = 'border-box';
    content.style.margin = '0 auto';
    content.style.maxWidth = '1000px';
    content.style.width = '100%';
    
    // Dynamic padding based on device type
    content.style.padding = isMobile ? '20px' : '50px';
}